import React, { useEffect, useState } from 'react'
import './Nav.css'

const Nav = () => {
  const [show, handleShow] = useState(false)
  const handleScroll = () => {
    if(window.scrollY > 100){
      handleShow(true)
    }else handleShow(false)
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={`nav ${show && 'nav_black'}`}>
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
        alt="Netflix Logo" 
        className="nav_logo" />
    </div>
  )
}

export default Nav