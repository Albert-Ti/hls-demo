import React from 'react'
import {fetchUploadVideo} from './api'
import HlsPlayer from './components/hls-player'

function App() {
  const [videoUrl, setVideoUrl] = React.useState<string>()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files?.[0])

    const file = e.target.files?.[0]

    if (file) {
      const date = await fetchUploadVideo(file)

      console.log(date)
    }
  }

  return (
    <>
      <input type='file' accept='video/mkv,video/mpeg4' onChange={handleUpload} />
      <HlsPlayer url={videoUrl!} />
    </>
  )
}

export default App
