import React, { useRef, useEffect } from 'react'
import RxPlayer from 'rx-player'
import Video from '../../types/Video'

const initPlayer = async (videoElement: HTMLMediaElement, videoUrl: string) => {
  const player = new RxPlayer({ videoElement: videoElement })

  player.loadVideo({
    url: videoUrl,
    transport: 'directfile',
    autoPlay: true,
  })

  player.addEventListener('playerStateChange', (state) => {
    if (state === 'LOADED') {
      console.log('the content is loaded')
      videoElement.onclick = function () {
        if (player.getPlayerState() === 'PLAYING') {
          player.pause()
        } else {
          player.play()
        }
      }
    }
  })
}

interface VideoPlayerProp {
  video: Video
}

const VideoPlayer = ({ video }: VideoPlayerProp) => {
  const videoElement = useRef(null)

  useEffect(() => {
    if (videoElement.current) initPlayer(videoElement.current, video.url)
  }, [video])
  return (
    <div className='mx-5'>
      <video width={865} ref={videoElement} controls poster={video.poster}></video>
    </div>
  )
}

export default VideoPlayer
