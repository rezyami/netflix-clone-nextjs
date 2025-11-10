import React from 'react'
import { useRecoilState } from 'recoil'
import { movieState } from '../atoms/modalAtom'
import PlayerHero from './PlayerHero'


interface YouflexPlayerProps {
    trailerKey?: string // You might not need to pass this anymore since PlayerHero fetches it internally
    onClose: () => void
}

const YouflexPlayer: React.FC<YouflexPlayerProps> = ({ onClose }) => {
    const [movie] = useRecoilState(movieState)

    if (!movie) return null

    // Optionally you can handle closing on Escape key or overlay click here as needed

    return (
        <div
            className='fixed inset-0 bg-black z-50 flex justify-center items-center'
            onClick={onClose} // Close when clicking background
        >
            <div onClick={(e) => e.stopPropagation()} className="w-full h-full">
                <PlayerHero
                    posterImg={movie.backdrop_path || movie.poster_path || ''}
                    overview={movie.overview || ''}
                    trailerUrl='https://www.youtube.com/watch?v="{{ trailerKey }}'
                    title="Your Movie or Show Title"
                // You can forward more props like onAddClick/onLikeClick as needed
                />
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        fontSize: '24px',
                        color: 'white',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        zIndex: 1100,
                    }}
                    aria-label="Close player"
                >
                    &times;
                </button>
            </div>
        </div>
    )
}

export default YouflexPlayer
