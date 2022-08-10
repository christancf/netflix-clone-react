import React, { useEffect, useState } from 'react'
import axios from './axios'
import requests from './requests'
import './Banner.css'

const base_url = "https://image.tmdb.org/t/p/original/"

const Banner = () => {
  const [movie, setMovie] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const req = await axios.get(requests.fetchNetflixOriginals)
      const randomIndex = Math.floor(Math.random() * req.data.results.length-1)
      setMovie(req.data.results[randomIndex]) 
      return req
    }
    fetchData()
  }, [])
  
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n-1) + '...' : str
  }

  return (
    <header className='banner'
      style={{
        backgroundImage: `url(
          ${base_url}${movie?.backdrop_path}
        )`,
        backgroundPosition: 'center center',
      }}
    >
      <div className='banner_contents'>
        {/* title */}
        <h1 className='banner_title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        {/* div > 2 buttons */}
        <div className='banner_buttons'>
          <button className='banner_button'>Play</button>
          <button className='banner_button'>My List</button>
        </div>
        {/* description */}
        <h1 className='banner_description'>{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner--fadeBottom"/>
    </header>
  )
}

export default Banner