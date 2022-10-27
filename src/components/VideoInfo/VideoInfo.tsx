import React from 'react'
import Crew from '../../types/Crew'
import Video from '../../types/Video'

interface VideoInfoProp {
  video: Video
  crew: Crew[]
}
const VideoInfo = ({ video, crew = [] }: VideoInfoProp) => {
  return (
    <div className='py-5'>
      <h1 className='text-rose-600 font-semibold text-2xl mb-2'>{video.title}</h1>
      <h1 className='text-white mb-2 text-xl'>Equipe : </h1>
      <ul className='flex flex-row flex-wrap'>
        {crew.map((c) => (
          <li key={`${c.id}-${c.name}`} className='p-3 flex flex-row float-left w-[230px]'>
            <img src={c.image} alt={c.name} className='w-[50px] h-[50px] rounded' />
            <div className='ml-3'>
              <p className='text-rose-600'>{c.name}</p>
              <p className='text-white'>{c.role}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default VideoInfo
