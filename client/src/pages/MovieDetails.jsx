import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react'
import timeFormat from '../lib/timeFormat'
import DateSelect from '../components/DateSelect'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'

const MovieDetails = () => {

  const navigate = useNavigate()
  const { id } = useParams()

  const [show, setShow] = useState(null)
  const [casts, setCasts] = useState([])
  const [loadingCast, setLoadingCast] = useState(true)

  // Load movie from dummy data
  const getShow = () => {
    const movie = dummyShowsData.find(show => show._id === id)
    if (movie){
      setShow({
      movie,
      dateTime: dummyDateTimeData
      })
    }
  }

  // Fetch REAL cast from TMDB
  const fetchCasts = async (movieId) => {
    try {
      setLoadingCast(true)
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
      )
      const data = await res.json()
      setCasts(data.cast || [])
    } catch (error) {
      console.error('TMDB cast fetch failed', error)
      setCasts([])
    } finally {
      setLoadingCast(false)
    }
  }

  useEffect(() => {
    getShow()
  }, [id])

  useEffect(() => {
    if (show?.movie?.id) {
      fetchCasts(show.movie.id) // TMDB ID
    }
  }, [show])

  return show ? (
    <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>

      {/* Movie Details */}
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className='max-md:max-auto rounded-xl h-104 max-w-70 object-cover'
        />

        <div className='relative flex flex-col gap-3'>
          <BlurCircle top='-100px' left='-100px' />

          <p className='text-primary'>ENGLISH</p>

          <h1 className='text-4xl font-semibold max-w-96 text-balance'>
            {show.movie.title}
          </h1>

          <div className='flex items-center gap-2 text-gray-300'>
            <StarIcon className='w-5 h-5 text-primary fill-primary' />
            {show.movie.vote_average.toFixed(1)} User Rating
          </div>

          <p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>
            {show.movie.overview}
          </p>

          <p>
            {timeFormat(show.movie.runtime)} •{' '}
            {show.movie.genres.map(g => g.name).join(', ')} •{' '}
            {show.movie.release_date.split('-')[0]}
          </p>

          <div className='flex items-center flex-wrap gap-4 mt-4'>
            <button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium'>
              <PlayCircleIcon className='w-5 h-5' />
              Watch Trailer
            </button>

            <a
              href='#dateSelect'
              className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium'
            >
              Buy Tickets
            </a>

            <button className='bg-gray-700 p-2.5 rounded-full'>
              <Heart className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <p className='text-lg font-medium mt-20'>Your Favorite Cast</p>

      <div className='overflow-x-auto no-scrollbar mt-8 pb-4'>
        <div className='flex items-center gap-4 w-max px-4'>

          {/* Loading */}
          {loadingCast && (
            <p className='text-gray-400 italic text-sm'>
              Loading cast...
            </p>
          )}

          {/* Cast List */}
          {!loadingCast && casts.length > 0 &&
            casts.slice(0, 12).map(cast => (
              <div key={cast.id} className='flex flex-col items-center text-center'>
                <img
                  src={
                    cast.profile_path
                      ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                      : '/profile.png'
                  }
                  alt={cast.name}
                  className='rounded-full h-20 md:h-20 aspect-square object-cover'
                />
                <p className='text-sm mt-2'>{cast.name}</p>
              </div>
            ))
          }

          {/* Coming Soon */}
          {!loadingCast && casts.length === 0 && (
            <p className='text-gray-400 italic text-sm'>
              🎬 Cast details coming soon
            </p>
          )}

        </div>
      </div>

      <DateSelect dateTime={show.dateTime} id={id} />

      <p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>
      <div className='flex flex-wrap max-sm:justify-center gap-8'>
          {dummyShowsData.slice(0,4).map((movie, index)=>(
            <MovieCard key={index} movie={movie}/>
          ))}
      </div>
      <div className='flex justify-center mt-20'>
          <button onClick={()=> {navigate('/movies'); scrollTo(0, 0)}} className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'>Show more</button>
      </div>

    </div>
  ) : (
    <Loading />
  )
}

export default MovieDetails
