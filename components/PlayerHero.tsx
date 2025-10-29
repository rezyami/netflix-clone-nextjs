import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player/lazy'
import { Movie, Element, Genre } from '../typings'
import { FaPlay } from 'react-icons/fa'
import { useRecoilState } from 'recoil'
import { movieState } from '../atoms/modalAtom'
import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  PlusIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline'

interface PlayerHeroProps {
  trailerUrl?: string
  posterImg: string
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
  const [movie, setMovie] = useRecoilState(movieState)
  const [trailer, setTrailer] = useState('')
  const [genres, setGenres] = useState<Genre[]>([])

  // New state to toggle from poster to trailer
  const [showTrailer, setShowTrailer] = useState(false)

  // Effect to switch from poster to trailer after 3 seconds
  useEffect(() => {
    if (!movie) return

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      )
        .then((response) => response.json())
        .catch((err) => console.log(err.message))

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        setTrailer(data.videos?.results[index]?.key)
      }
      if (data?.genres) {
        setGenres(data.genres)
      }
    }

    fetchMovie()
  }, [movie])

  return (
    <div className="before:content-[''] before:block before:absolute before:w-[60vw] before:h-[70vh] before:right-0 before:-top-[95px] before:z-[2] before:[box-shadow:inset_120px_-160px_94px_8px_rgb(0,0,0)]">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${trailer}`}
        width="60vw"
        height="60vh"
        style={{ position: 'absolute', top: '0', right: '0', height: '60vh', width: '60vw' }}
        playing
        muted={muted}
        onError={(e) => console.error('ReactPlayer error', e)}
      />
      <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
        <div className="flex space-x-2">
          <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
            <FaPlay className="h-7 w-7 text-black" />
            Play
          </button>

          <button className="modalButton">
            <PlusIcon className="h-7 w-7" />
          </button>

          <button className="modalButton">
            <HandThumbUpIcon className="h-7 w-7" />
          </button>
        </div>
        <button className="modalButton" onClick={() => setMuted(!muted)}>
          {muted ? (
            <SpeakerXMarkIcon className="h-6 w-6" />
          ) : (
            <SpeakerWaveIcon className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  )
}
