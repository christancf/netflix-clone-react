import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'
import axios from './axios'
import './Row.css'

const base_url = "https://image.tmdb.org/t/p/original/"

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const req = await axios.get(fetchUrl)
      setMovies(req.data.results)
    }
    fetchData()
  }, [fetchUrl])//variable passed outside of the block

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    }
  }

  const handleClick = movie => {
    if(trailerUrl) setTrailerUrl("")
    else{
      movieTrailer(movie?.name || "")
      .then(url => {
        const urlParams = new URLSearchParams(new URL(url).search)
        setTrailerUrl(urlParams.get('v'))
      }).catch(e => console.error(e))
    }
  }

  return (
    <div className="row">
      {/* title */}
      <h2>{title}</h2>
      <div className='row_posters'>
        {/* row posters */}
        {
          movies.map(movie => (
            <img 
              key={movie.id}//add key for optimization
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_poster_large"}`}
              src={`${base_url}${isLargeRow? movie.poster_path : movie.backdrop_path}`} 
              alt={movie.name} 
            />
          ))
        }
      </div>
      {/* container -> posters */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}

    </div>
  )
}

export default Row