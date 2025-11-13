import React from 'react'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import Row from '../components/Row'
import { Movie } from '../typings'
import requests from '../utils/requests'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface Props {
  movies: Movie[]
}

export default function MoviesPage({ movies }: Props) {
  const router = useRouter()

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <main className="pl-24 pb-24 pt-32">
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-400 hover:text-white transition"
          >
            <ArrowLeftIcon className="w-6 h-6 mr-2" />
            Back
          </button>
        </div>
        <h1 className="text-4xl font-bold text-white mb-8">Movies</h1>
        <div className="space-y-8">
          <Row title="Action Movies" movies={movies.filter(m => m.genre_ids?.includes(28))} />
          <Row title="Comedy Movies" movies={movies.filter(m => m.genre_ids?.includes(35))} />
          <Row title="Horror Movies" movies={movies.filter(m => m.genre_ids?.includes(27))} />
          <Row title="Romance Movies" movies={movies.filter(m => m.genre_ids?.includes(10749))} />
          <Row title="All Movies" movies={movies} />
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(requests.fetchActionMovies)
  const data = await res.json()
  return {
    props: {
      movies: data.results,
    },
  }
}
