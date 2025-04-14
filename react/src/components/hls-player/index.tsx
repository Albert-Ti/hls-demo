import Hls from 'hls.js'
import React from 'react'

type Props = {
  url: string
}

const HlsPlayer: React.FC<Props> = ({url}) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null)
  const [isError, setIsError] = React.useState(false)

  React.useEffect(() => {
    if (!url) return

    const hls = new Hls()
    hls.loadSource(url)
    hls.attachMedia(videoRef.current!)

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      console.log('Manifest loaded')
    })

    hls.on(Hls.Events.ERROR, (_, data) => {
      if (data.fatal) {
        setIsError(true)
        console.error('Error occurred:', data)
      }
    })

    return () => {
      hls.destroy()
    }
  }, [url])

  return (
    <div>
      {isError ? (
        <p>Ошибка загрузки видео. Попробуйте позже.</p>
      ) : (
        <video ref={videoRef} controls width='800px' height='auto' />
      )}
    </div>
  )
}

export default HlsPlayer
