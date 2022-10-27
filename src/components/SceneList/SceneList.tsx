import React from 'react'
import Scene from '../../types/Scene'
import { secondsToTime } from '../../utils/TimeUtils'

interface SceneListProp {
  sceneList: Scene[]
  currentSceneId?: number
  onSceneChange: (scene: Scene) => void
}
const SceneList = ({ sceneList = [], currentSceneId, onSceneChange }: SceneListProp) => {
  return (
    <ul className='text-white px-5 whitespace-nowrap w-[500px] h-[100vh] font-semibold'>
      {sceneList.map((scene) => (
        <li
          key={scene.id}
          onClick={() => onSceneChange(scene)}
          className={`p-3 m-1 border-2 cursor-pointer ${
            scene.id === currentSceneId ? 'border-white' : 'border-rose-600'
          }  text-ellipsis overflow-hidden duration-75 hover:brightness-50`}
        >
          <span
            className={`${
              scene.id !== currentSceneId ? 'bg-rose-600  text-white' : ' '
            } inline-block rounded-md w-[125px] mr-3 text-center p-1`}
          >
            {secondsToTime(scene.beginTimecode)} - {secondsToTime(scene.endTimecode)}
          </span>
          {scene.title}
        </li>
      ))}
    </ul>
  )
}

export default SceneList
