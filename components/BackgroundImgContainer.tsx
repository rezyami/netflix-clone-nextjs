import { useState, useEffect } from 'react'

interface BackgroundImgContainerProps {
  posterUrl: string
  title: string
  overview: string
  show: boolean
}

export default function BackgroundImgContainer({
  posterUrl,
  title,
  overview,
  show,
}: BackgroundImgContainerProps) {
  const [isTopZIndex, setIsTopZIndex] = useState(true)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    if (show) {
      setIsTopZIndex(true)
      setOpacity(1)

      const timer = setTimeout(() => {
        setOpacity(0)         // start fade
        setIsTopZIndex(false)
      }, 2000)

      return () => clearTimeout(timer)
    } else {
      // Reset when hide
      setOpacity(1)
      setIsTopZIndex(true)
    }
  }, [show])

  if (!show && opacity === 0) return null

  return (
    <div
      id="background-img-container"
      className={`bg-transparent fixed top-0 right-0 w-full h-[65vh] overflow-hidden pointer-events-none
        before:content-[''] before:block before:absolute before:w-[61vw] before:h-[75vh] before:right-0 before:-top-[95px]
        before:[box-shadow:inset_120px_-160px_94px_8px_rgb(0,0,0)] before:z-10 
        ${isTopZIndex ? 'z-[99]' : 'z-[0]'}`}
        style={{
          opacity,
          transition: 'opacity 1s ease-in-out',
        }}
    >
      <img
        src={posterUrl}
        alt={title}
        className="!h-[60vh] !w-[60vw] absolute right-0 top-0"
      />
    </div>
  )
}
