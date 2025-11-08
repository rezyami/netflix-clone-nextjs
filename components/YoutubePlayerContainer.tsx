import React from 'react'
import ReactPlayer from 'react-player/lazy'

interface YoutubePlayerContainerProps {
  trailerKey: string
  show: boolean
  muted: boolean
}

export default function YoutubePlayerContainer({
  trailerKey,
  show,
  muted
}: YoutubePlayerContainerProps) {
  if (!show || !trailerKey) return null

  return (
    <div
      id='youtube-video-container'
      className="fixed bg-black h-[65vh] w-full top-0 right-0 before:content-[''] before:block before:absolute before:w-[60vw] before:h-full before:right-0 before:-top-[10px] before:z-[2] before:[box-shadow:inset_120px_-160px_94px_8px_rgb(0,0,0)]"
    >
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${trailerKey}`}
        width="60vw"
        height="60vh"
        style={{ position: 'absolute', top: 0, right: 0, height: '60vh', width: '60vw' }}
        playing
        muted={muted}
        onError={(e) => console.error('ReactPlayer error', e)}
      />
    </div>
  )
}
