import { useState, useEffect } from 'react'
import { Element, Genre } from '../typings'
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
  posterImg,
  overview,
}: PlayerHeroProps) {
  const [muted, setMuted] = useState(true)
  const [movie] = useRecoilState(movieState)
  const [trailer, setTrailer] = useState('')
  const [genres, setGenres] = useState<Genre[]>([])

  // Visibility for the background image container
  const [showBgContainer, setShowBgContainer] = useState(false)

  // Dynamic title and z-index control
  const [dynamicTitle, setDynamicTitle] = useState('')
  const [isTopZIndex, setIsTopZIndex] = useState(true)

  useEffect(() => {
    if (!movie) {
      setShowBgContainer(false)
      setDynamicTitle('')
      setTrailer('')
      setGenres([])
      return
    }

    // Show the background container and put it on top
    setDynamicTitle(movie.title || movie.name || '')
    setShowBgContainer(true)
    setIsTopZIndex(true)

    // Drop z-index after 2s
    const timer = setTimeout(() => {
      setIsTopZIndex(false)
    }, 2000)

    // Fetch trailer/videos and genres for the selected movie
    async function fetchMovie() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${movie?.media_type === 'tv' ? 'tv' : 'movie'}/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
        )
        const data = await res.json()

        if (data?.videos) {
          const index = data.videos.results.findIndex(
            (element: Element) => element.type === 'Trailer'
          )
          setTrailer(data.videos?.results[index]?.key || '')
        }
        if (data?.genres) {
          setGenres(data.genres)
        }
      } catch (e) {
        // no-op
      }
    }

    fetchMovie()
    return () => clearTimeout(timer)
  }, [movie])

  // Prefer backdrop if available, otherwise fall back to prop
  const posterUrl = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : posterImg

  return (
    <section>
      {/* Order matters: background image container first, YouTube player after */}
      <BackgroundImgContainer
        posterUrl={posterUrl}
        title={dynamicTitle}
        overview={movie?.overview ?? overview}
        show={showBgContainer}
        isTopZIndex={isTopZIndex}
      />

      <YoutubePlayerContainer
        trailerKey={trailer}
        show={!!trailer}
        muted={muted}
      />
    </section>
  )
}
