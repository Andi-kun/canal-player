import { useEffect, useRef, useState } from 'react'
import RxPlayer from 'rx-player'
import { PlayerStateEnum } from '../types/PlayerStateEnum'
import Scene from '../types/Scene'

const useRxPlayer = (
  videoUrl: string,
  onPositionUpdate: (position: number) => void,
  currentScene?: Scene,
) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentTimeCode, setCurrentTimeCode] = useState<number>(0)
  const videoElement = useRef<HTMLVideoElement>(null)
  const player = useRef<RxPlayer | null>(null)

  const togglePlay = () => {
    if (!player.current) return
    if (isPlaying) player.current.pause()
    else player.current.play()
    setIsPlaying((current) => !current)
  }

  const canSeek = () =>
    player.current &&
    player.current.getPlayerState() !== PlayerStateEnum.STOPPED &&
    player.current.getPlayerState() !== PlayerStateEnum.LOADING &&
    player.current.getPlayerState() !== PlayerStateEnum.RELOADING

  const initPlayer = async () => {
    if (!videoElement.current) return
    player.current = new RxPlayer({ videoElement: videoElement.current })

    player.current.loadVideo({
      url: videoUrl,
      transport: 'directfile',
      autoPlay: true,
    })

    player.current.addEventListener('positionUpdate', (position) => {
      setCurrentTimeCode(position.position)
      onPositionUpdate(Math.round(position.position))
    })
  }

  useEffect(() => {
    const currentTimeCode = player.current?.getPosition() || 0
    const isNotBetweenCurrentScene =
      currentScene &&
      (currentScene.beginTimecode > currentTimeCode || currentScene.endTimecode < currentTimeCode)
    if (canSeek() && isNotBetweenCurrentScene) {
      player.current?.seekTo(currentScene.beginTimecode)
    }
  }, [currentScene])

  const handleVideoProgress = (percentage: number) => {
    const timeCode = ((player.current?.getVideoDuration() || 0) / 100) * percentage
    if (canSeek()) {
      player.current?.seekTo(timeCode)
    }
  }

  useEffect(() => {
    initPlayer()
  }, [videoUrl])

  return {
    videoElement,
    isPlaying,
    togglePlay,
    progress: (currentTimeCode / (player.current?.getVideoDuration() || 0)) * 100,
    handleVideoProgress,
  }
}

export default useRxPlayer
