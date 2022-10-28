import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import Crew from '../types/Crew'
import Scene from '../types/Scene'

const useVideoAPI = () => {
  const [currentSceneData, setCurrentSceneData] = useState<Scene | undefined>(undefined)
  const [sceneListData, setSceneListData] = useState<Scene[]>([])
  const [crewData, setCrewData] = useState<Crew[]>([])
  const cachedScenesRef = useRef<Scene[]>([])
  const currentSceneRef = useRef<Scene | undefined>(currentSceneData)
  const pendingCall = useRef<boolean>(false)

  const setCurrentSceneDataAndRef = (scene: Scene, manual = false) => {
    const sceneData = {
      ...scene,
      manualChange: manual,
    }
    currentSceneRef.current = sceneData
    setCurrentSceneData(sceneData)
  }

  const getScene = async (timeCode: number) => {
    const response = await axios.get<Scene>(
      `https://oneplayer-tech-test.herokuapp.com/scene/${timeCode}`,
    )
    if (response.data) {
      cachedScenesRef.current = [...cachedScenesRef.current, response.data]
      setCurrentSceneDataAndRef(response.data)
    }
  }

  const getCrew = async () => {
    const response = await axios.get<Crew[]>('https://oneplayer-tech-test.herokuapp.com/crew')
    if (response.data) {
      setCrewData(response.data)
    }
  }

  const getAllScene = async () => {
    const response = await axios.get<Scene[]>('https://oneplayer-tech-test.herokuapp.com/scenes')
    if (response.data) setSceneListData(response.data)
  }

  useEffect(() => {
    getAllScene()
    getCrew()
  }, [])

  const getSceneByTimecode = async (timeCode: number) => {
    const isBetweenCurrentScene =
      currentSceneRef.current &&
      currentSceneRef.current.beginTimecode <= timeCode &&
      currentSceneRef.current.endTimecode >= timeCode

    if (pendingCall.current || isBetweenCurrentScene) return

    const cachedScene =
      cachedScenesRef.current &&
      cachedScenesRef.current.find((e) => e.beginTimecode <= timeCode && e.endTimecode >= timeCode)
    if (cachedScene) {
      setCurrentSceneDataAndRef(cachedScene)
    } else {
      pendingCall.current = true
      await getScene(timeCode)
      pendingCall.current = false
    }
  }

  return {
    currentSceneData,
    sceneListData,
    crewData,
    getSceneByTimecode,
    setCurrentSceneData: setCurrentSceneDataAndRef,
  }
}

export default useVideoAPI
