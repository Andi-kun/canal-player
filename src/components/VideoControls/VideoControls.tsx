import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

import './VideoControls.css'

export interface VideoControlsProp {
  isPlaying: boolean
  onTogglePlay: () => void
  onVideoProgressChange: (percentage: number) => void
  progress: number
}
const VideoControls = ({
  isPlaying,
  onTogglePlay,
  progress = 0,
  onVideoProgressChange,
}: VideoControlsProp) => {
  return (
    <div className='w-full p-3 flex items-center'>
      <div className='actions mr-2'>
        <button onClick={onTogglePlay}>
          {isPlaying ? (
            <FontAwesomeIcon icon={faPause} className='text-rose-600' size='lg' />
          ) : (
            <FontAwesomeIcon icon={faPlay} className='text-rose-600' size='lg' />
          )}
        </button>
      </div>
      <input
        className='w-full'
        type='range'
        min='0'
        max='100'
        step='1'
        value={progress}
        onChange={(e) => onVideoProgressChange(Number(e.target.value))}
      />
    </div>
  )
}

export default VideoControls
