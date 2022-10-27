import useRxPlayer from '../../hooks/useRxPlayer'
import Scene from '../../types/Scene'
import Video from '../../types/Video'
import VideoControls from '../VideoControls/VideoControls'

interface VideoPlayerProp {
  video: Video
  currentScene?: Scene
  onPositionUpdate: (timeCode: number) => void
}

const VideoPlayer = ({ video, currentScene, onPositionUpdate }: VideoPlayerProp) => {
  const { videoElement, isPlaying, progress, togglePlay, handleVideoProgress } = useRxPlayer(
    video.url,
    onPositionUpdate,
    currentScene,
  )

  return (
    <div>
      <video width={1000} ref={videoElement} poster={video.poster}></video>
      <VideoControls
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        progress={progress}
        onVideoProgressChange={handleVideoProgress}
      />
    </div>
  )
}

export default VideoPlayer
