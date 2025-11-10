import { useEffect, useState } from 'react'
import { Movie } from '../typings'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import AutoScrollParagraph from '../components/AutoScrollParagraph'

interface Props {
  netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  const [genreList, setGenreList] = useState<{ id: number; name: string }[]>([])

  // Optional: set a random movie if no movie selected yet for initial render
  useEffect(() => {
    if (!currentMovie && netflixOriginals?.length > 0) {
      setCurrentMovie(
        netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
      )
    }
  }, [netflixOriginals, currentMovie, setCurrentMovie])

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=14e893e97ac3ae3e72bc8a4b529bf133&language=en-US')
      .then((res) => res.json())
      .then((data) => setGenreList(data.genres || []))
      .catch(() => setGenreList([]))
  }, [])

  if (!currentMovie) return null

  const year = currentMovie.release_date
    ? new Date(currentMovie.release_date).getFullYear()
    : currentMovie.first_air_date
    ? new Date(currentMovie.first_air_date).getFullYear()
    : 'N/A'

  const rating = currentMovie.vote_average?.toFixed(1) ?? 'N/A'

  const genreNames = currentMovie.genre_ids
  ?.map((id) => genreList.find((g) => g.id === id)?.name)
  .filter(Boolean)
  .join(', ') ?? ''

  console.log(currentMovie)

  return (
    <section className="banner-container z-10 fixed top-24 w-1/2">
      <h1 className="banner-title text-2xl font-bold md:text-4xl lg:text-7xl z-[99]">{currentMovie.title || currentMovie.name || currentMovie.original_name}</h1>
      <div className="banner-meta my-2 text-white space-x-3 flex text-sm md:text-lg">
        <span>{year}</span>
        <span className='flex flex-row'><img src="./IMDB_Logo_2016.svg" alt="rating-logo" className='w-8 me-2'  /> {rating}</span>
        {genreNames && <span>{genreNames}</span>}
      </div>
      <AutoScrollParagraph>
        {currentMovie.overview}
      </AutoScrollParagraph>

      <div className="flex space-x-3 mt-4">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
        </button>
        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(currentMovie)
            setShowModal(true)
          }}
        >
          More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </section>
  )
}

export default Banner
