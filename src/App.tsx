import React from 'react'
import './App.css'
import VideoPlayer from './components/VideoPlayer/VideoPlayer'
import Video from './types/Video'

const currentVideo: Video = {
  url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  poster: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg',
}
function App() {
  return (
    <div className='App'>
      <VideoPlayer video={currentVideo} />
    </div>
  )
}

export default App
