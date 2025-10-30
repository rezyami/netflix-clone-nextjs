import Image from 'next/image'
import { useEffect, useState } from 'react'
import { baseUrl } from '../constants/movie'
import { Movie } from '../typings'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import PlayerHero from './PlayerHero'

interface Props {
  netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    )
  }, [netflixOriginals])

  return (
    <div className="fixed top-0 left-0 w-full flex  flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0  h-[70vh] w-screen">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          fill
          sizes='100vw'
          className="object-cover"
          alt="{movie?.title || movie?.name || movie?.original_name}"
        />
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
        </button>
        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(movie)
          }}
        >
          More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
      <div id="background-img-container"
          className="bg-transparent fixed top-0 right-0 w-full h-full z-0 overflow-hidden pointer-events-none before:content-[''] before:block before:absolute before:w-[60%] before:h-[70%] before:right-0 before:-top-[95px] before:z-[2] before:[box-shadow:inset_120px_-160px_94px_8px_rgb(0,0,0)]">
          <Image
            src="/login_background.jpg"
            fill
            className="h-3/5 w-3/5 absolute right-0 top-0 max-h-full"
            alt=""
          />
        </div>
      <PlayerHero
        trailerUrl="https://www.youtube.com/watch?v=...yourKey..."
        posterImg="/path/to/poster.jpg"
        title="Your Movie or Show Title"
        overview="Description or summary here."
        
/>

    </div>
  )
}

export default Banner
