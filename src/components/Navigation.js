import React from 'react'
import NavMenu from './NavMenu'
import NavHeader from './NavHeader';

const Navigation = () => {
  return(
    <div id  = "navigation">
      <NavMenu hamburger = {false}/>
      <NavHeader/>
    </div>
  )
}

export default Navigation
