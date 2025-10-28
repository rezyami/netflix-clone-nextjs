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
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
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
    <div className="relative">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailer}`}
                width="100%"
                height="100%"
                style={{ position: 'absolute', top: '0', left: '0' }}
                playing
                muted={muted}
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
