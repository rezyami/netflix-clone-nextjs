import React from 'react'
import ReactPlayer from 'react-player/lazy'
import { useRecoilValue } from 'recoil'
import { playerOpenState } from '../atoms/playerAtom'

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
  const playerOpen = useRecoilValue(playerOpenState)  // <-- get player open state
  if (!show || !trailerKey) return null
  return (
    <div
      id='youtube-video-container'
      className={`fixed bg-black w-full top-0 right-0 ${playerOpen
          ? 'h-full' // no before styles when playerOpen = true
          : "h-[65vh] before:content-[''] before:block before:absolute before:w-[60vw] before:h-full before:right-0 before:-top-[10px] before:z-[2] before:[box-shadow:inset_120px_-160px_94px_8px_rgb(0,0,0)]"
        }`}
    >
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${trailerKey}`}
        width={playerOpen ? '100%' : '60vw'}   // width should be either 100% or 60vw (viewport width unit)
        height={playerOpen ? '100%' : '60vh'}  // height should be either 100% or 60vh
        style={{ position: 'absolute', top: 0, right: 0, height: playerOpen ? '100%' : '60vh', width: playerOpen ? '100%' : '60vw' }}
        playing
        muted={muted}
        onError={(e) => console.error('ReactPlayer error', e)}
        config={{
          youtube: {
            playerVars: {
              controls: 0, // Hides the control bar
              modestbranding: 1, // Hides the YouTube logo (title/branding)
              showinfo: 0 // Deprecated but sometimes used to hide video info
            }
          }
        }}
      />
    </div>
  )
}
