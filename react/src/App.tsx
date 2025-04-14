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

      setVideoUrl(date.url)
    }
  }

  return (
    <div
      style={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
      }}
    >
      <input type='file' accept='video/mkv,video/mpeg4' onChange={handleUpload} />
      <HlsPlayer url={`http://localhost:3000${videoUrl}`} />
    </div>
  )
}

export default App
