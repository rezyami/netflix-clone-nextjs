import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'
import { Movie } from '../typings'
import Thumbnail from './Thumbnail'

interface Props {
  title: string
  movies: Movie[]
  showRanks?: boolean // Enable for Top 10
}

function Row({ title, movies, showRanks }: Props) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick = (direction: string) => {
    setIsMoved(true)
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
    }
  }

  return (
    <div className="space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-e5e5e5 transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:ml-2">
        <ChevronLeftIcon
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${!isMoved ? 'hidden' : ''}`}
          onClick={() => handleClick('left')}
        />
        <div
          ref={rowRef}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
        >
          {movies.map((movie, idx) => (
            <div key={movie.id} className="movie-card relative flex w-80 [&_*]:inline-block [&_img]:w-[59%] [&_svg]:w-[39%] [&_svg#rank-10]:w-48">
              {showRanks && idx < 10 && (
                <div className="absolute left-0 top-0 h-10 w-48 flex items-center justify-center z-10 pointer-events-none">
                  <svg id={`rank-${idx + 1}`} width="100%" height="100%" viewBox="-20 0 70 154" className="svg-icon"><path stroke="#595959" stroke-linejoin="square" stroke-width="4" d="M35.377 152H72V2.538L2 19.362v30.341l33.377-8.459V152z"></path></svg>
                <Thumbnail movie={movie} />
                  <span className="text-3xl font-bold text-white drop-shadow-lg">{idx + 1}</span>
                </div>
              )}
              <div className="flex-1">
                <Thumbnail movie={movie} />
              </div>
            </div>
          ))}

        </div>
        <ChevronRightIcon
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  )
}

export default Row
