import { useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  PlusIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline'

interface PlayerHeroProps {
  trailerUrl?: string   // YouTube link, e.g. "https://www.youtube.com/watch?v=abc123"
  posterImg: string     // Background image URL
  title: string
  overview: string
  onAddClick?: () => void
  onLikeClick?: () => void
  isAdded?: boolean
  isLiked?: boolean
}

export default function PlayerHero({
  trailerUrl,
  posterImg,
  title,
  overview,
  onAddClick,
  onLikeClick,
  isAdded,
  isLiked,
}: PlayerHeroProps) {
  const [muted, setMuted] = useState(true)

  return (
    <section className="relative w-full h-[60vw] max-h-[800px] min-h-[400px] overflow-hidden">
      {/* Backdrop video or still */}
      {trailerUrl ? (
        <ReactPlayer
          url={trailerUrl}
          playing
          loop
          muted={muted}
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none', // disables clicks on video
          }}
        />
      ) : (
        <img
          src={posterImg}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}
      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#181818]/90 via-transparent to-transparent" />

      {/* Top right action icons */}
      <div className="absolute top-8 right-8 flex space-x-3 z-10">
        <button
          className="rounded-full bg-black/80 p-2 hover:bg-white/20 transition"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? (
            <SpeakerXMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <SpeakerWaveIcon className="h-6 w-6 text-white" />
          )}
        </button>
        <button
          className={`rounded-full bg-black/80 p-2 hover:bg-white/20 transition ${
            isAdded ? 'border border-white' : ''
          }`}
          onClick={onAddClick}
          aria-label="Add"
        >
          <PlusIcon className="h-6 w-6 text-white" />
        </button>
        <button
          className={`rounded-full bg-black/80 p-2 hover:bg-white/20 transition ${
            isLiked ? 'border border-green-500' : ''
          }`}
          onClick={onLikeClick}
          aria-label="Like"
        >
          <HandThumbUpIcon className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Title, description and main action buttons (bottom left) */}
      <div className="absolute bottom-16 left-8 z-10 max-w-xl text-white space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow">{title}</h1>
        <p className="hidden md:block text-lg max-h-36 overflow-y-auto">{overview}</p>
        {/* Add your main "Play" button here if you need */}
      </div>
    </section>
  )
}
