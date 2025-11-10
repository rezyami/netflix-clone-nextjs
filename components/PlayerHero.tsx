import { useState, useEffect } from 'react'
import { Element, Genre } from '../typings'
import { useRecoilState, useRecoilValue } from 'recoil'
import { movieState } from '../atoms/modalAtom'
import { playerOpenState } from '../atoms/playerAtom'
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
  const [zIndexVersion, setZIndexVersion] = useState(0)
  const [selectedMovie, setSelectedMovie] = useRecoilState(movieState)
  const playerOpen = useRecoilValue(playerOpenState)  // <-- get player open state

  // Visibility for the background image container
  const [showBgContainer, setShowBgContainer] = useState(false)

  // Dynamic title and z-index control
  const [dynamicTitle, setDynamicTitle] = useState('')

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
  }, [movie])

  useEffect(() => {
    if (selectedMovie) {
      // Increment version every time selected movie changes
      setZIndexVersion(prev => prev + 1)
    }
  }, [selectedMovie])

  // Prefer backdrop if available, otherwise fall back to prop
  const posterUrl = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : posterImg

  return (
    <section className={`fixed top-0 left-0 w-full h-full max-h-[65vh] overflow-hidden ${
      playerOpen ? 'z-50' : 'z-10'
    }`}>
      {/* Order matters: background image container first, YouTube player after */}
      <BackgroundImgContainer
        key={zIndexVersion}  // key forces remount
        posterUrl={posterUrl}
        title={dynamicTitle}
        overview={movie?.overview ?? overview}
        show={showBgContainer}
      />

      <YoutubePlayerContainer
        trailerKey={trailer}
        show={!!trailer}
        muted={muted}
      />
    </section>
  )
}
