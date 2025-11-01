import React from 'react';

interface BackgroundImgContainerProps {
  posterUrl: string
  title: string
  overview: string
  show: boolean
  isTopZIndex: boolean
}

export default function BackgroundImgContainer({
  posterUrl,
  title,
  overview,
  show,
  isTopZIndex
}: BackgroundImgContainerProps) {
  if (!show) return null;

  return (
    <div
      id="background-img-container"
      className={`bg-transparent fixed top-0 right-0 w-full h-full overflow-hidden pointer-events-none before:content-[''] before:block before:absolute before:w-[60%] before:h-[70%] before:right-0 before:-top-[95px] before:[box-shadow:inset_120px_-160px_94px_8px_rgb(0,0,0)]
        ${isTopZIndex ? 'z-[99]' : 'z-[0]'}`}
    >
      <img
        src={posterUrl}
        alt={title}
        className="!h-[60vh] !w-[60vw] absolute right-0 top-0"
      />
      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl z-[99]">{title}</h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl z-[99] mt-1">
        {overview}
      </p>
    </div>
  )
}
