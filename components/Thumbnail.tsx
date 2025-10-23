import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'
import { Movie } from '../typings'

interface Props {
  // When using firebase
  movie: Movie
}

function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  const imagePath = movie.backdrop_path || movie.poster_path;


  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setCurrentMovie(movie)
        setShowModal(true)
      }}
    >
      <Image
        src={imagePath ? `https://image.tmdb.org/t/p/original${imagePath}` : '/no-image.jpg'}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        sizes="260px"
        alt={movie.title || movie.name}
      />
    </div>
  )
}

export default Thumbnail
