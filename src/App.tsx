import './App.css'
import SceneList from './components/SceneList/SceneList'
import VideoInfo from './components/VideoInfo/VideoInfo'
import VideoPlayer from './components/VideoPlayer/VideoPlayer'
import useVideoAPI from './hooks/useVideoAPI'
import Scene from './types/Scene'
import Video from './types/Video'

const currentVideo: Video = {
  title: 'Big Buck Bunny',
  url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  poster: 'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg',
}
function App() {
  const { currentSceneData, setCurrentSceneData, crewData, getSceneByTimecode, sceneListData } =
    useVideoAPI()
  const handleSceneChange = (scene: Scene) => {
    setCurrentSceneData(scene, true)
  }
  return (
    <div className='App p-5 flex'>
      <div className='w-[1000px]'>
        <VideoPlayer
          video={currentVideo}
          onPositionUpdate={getSceneByTimecode}
          currentScene={currentSceneData}
        />
        <VideoInfo video={currentVideo} crew={crewData} />
      </div>
      <div className='overflow-auto'>
        <SceneList
          currentSceneId={currentSceneData?.id}
          sceneList={sceneListData}
          onSceneChange={handleSceneChange}
        ></SceneList>
      </div>
    </div>
  )
}

export default App
