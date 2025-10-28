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
  const imagePath = movie.poster_path;


  return (
    <div
      className="relative min-w-[150px] cursor-pointer transition duration-200 ease-out md:h-36 md:hover:scale-105"
      style={{ width: 150, height: 225 }}
      onClick={() => {
        setCurrentMovie(movie)
      }}
    >
      <Image
        src={imagePath ? `https://image.tmdb.org/t/p/original${imagePath}` : '/no-image.jpg'}
        className="rounded-sm object-cover md:rounded"
        fill
        sizes="150px"
        alt={movie.title || movie.name}
      />
    </div>
  )
}

export default Thumbnail
