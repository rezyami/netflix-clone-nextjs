import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player/lazy'
import { Movie, Element, Genre } from '../typings'
import { useRecoilState } from 'recoil'
import { movieState } from '../atoms/modalAtom'
import BackgroundImgContainer from './BackgroundImgContainer'
import YoutubePlayerContainer from './YoutubePlayerContainer'

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

  // State to show/hide background image container
  const [showBgContainer, setShowBgContainer] = useState(false)

  // State to hold the dynamic title for the <h1>
  const [dynamicTitle, setDynamicTitle] = useState('')

  // State to control z-index toggle after 2s
  const [isTopZIndex, setIsTopZIndex] = useState(true)

  useEffect(() => {
    if (!movie) {
      setShowBgContainer(false)
      setDynamicTitle('')
      setTrailer('')
      setGenres([])
      return
    }

    setDynamicTitle(movie.title || movie.name || '')
    setShowBgContainer(true)
    setIsTopZIndex(true) // Set to top when shown

    const timer = setTimeout(() => {
      setIsTopZIndex(false) // After 2 seconds, set z-index to 0
    }, 2000)

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
        setTrailer(data.videos?.results[index]?.key || '')
      }
      if (data?.genres) {
        setGenres(data.genres)
      }
    }

    fetchMovie()

    return () => clearTimeout(timer) // Cleanup timer on unmount or movie change
  }, [movie])

  const posterUrl = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : posterImg

  return (
    <section>
      {/* Background Image Container */}
      {showBgContainer && (
        <div
          id="background-img-container"
          className={`bg-transparent fixed top-0 right-0 w-full h-full overflow-hidden pointer-events-none before:content-[''] before:block before:absolute before:w-[60%] before:h-[70%] before:right-0 before:-top-[95px] before:[box-shadow:inset_120px_-160px_94px_8px_rgb(0,0,0)]
            ${isTopZIndex ? 'z-[99]' : 'z-[0]'}`}
        >
          <img
            src={posterUrl}
            alt={dynamicTitle}
            className="!h-[60vh] !w-[60vw] absolute right-0 top-0"
          />
          <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl z-[99]">{dynamicTitle}</h1>
          <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl z-[99] mt-1">
            {movie?.overview}
          </p>
        </div>
      )}

      {/* Video Player Container */}
      <div
        id='youtube-video-container'
        className={`${
          trailer ? '' : 'hidden'
        } fixed bg-black h-full w-full top-0 right-0 before:content-[''] before:block before:absolute before:w-[60vw] before:h-[70vh] before:right-0 before:-top-[95px] before:z-[2] before:[box-shadow:inset_120px_-160px_94px_8px_rgb(0,0,0)]`}
      >
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailer}`}
          width="60vw"
          height="60vh"
          style={{ position: 'absolute', top: 0, right: 0, height: '60vh', width: '60vw' }}
          playing
          muted={muted}
          onError={(e) => console.error('ReactPlayer error', e)}
        />
      </div>
    </section>
  )
}
