// TopTenGrid.tsx
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { movieState } from '../atoms/modalAtom'
import { Movie } from '../typings'

interface TopTenGridProps {
  movies: Movie[] // ensure length 10 if you want exactly top 10
}

export default function TopTenGrid({ movies }: TopTenGridProps) {
  const [, setMovie] = useRecoilState(movieState)

  return (
    <div className="container-fluid ps-5 ms-5 top10 container-height">
      <h2>Top 10 Movies</h2>
      <div className="row grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.map((m, idx) => (
          <button
            key={m.id}
            type="button"
            className="movie-card relative outline-none focus:ring-2 focus:ring-white"
            onClick={() => setMovie(m)}
          >
            {/* Optional: render your rank SVG here, using idx+1 */}
            <div className="absolute left-0 top-0 h-full w-[64px] flex items-center justify-center pointer-events-none">
              {/* Replace with your rank SVGs if desired */}
              <span className="text-4xl font-black drop-shadow-[0_0_4px_rgba(0,0,0,0.7)]">{idx + 1}</span>
            </div>

            <Image
              className="boxart-image-in-padded-container rounded"
              src={
                m.poster_path
                  ? `https://image.tmdb.org/t/p/w342${m.poster_path}`
                  : '/no-image.jpg'
              }
              alt={m.title || m.name || 'Poster'}
              width={342}
              height={513}
              priority={idx < 4}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
