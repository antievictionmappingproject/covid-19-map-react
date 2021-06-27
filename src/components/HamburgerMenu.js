import React, { useState } from 'react'
// import Hamburger from '../assets/aemp_hamburger.svg'
import NavMenu from './NavMenu'

const HamburgerMenu = () => {
  const [show,setShow]=useState(false);
  return(
    <div id="HamburgerWrapper"
         onMouseEnter={()=>setShow(true)}
         onMouseLeave={()=>setShow(false)}
    >
      {/*<img src={Hamburger}
            id = "hamburgerImage"*/}

      <img src="http://assets.stickpng.com/images/588a6507d06f6719692a2d15.png"
                  id = "hamburgerImage">




      <NavMenu hamburger = {true} show = {show} />
    </div>
  )
};

export default HamburgerMenu;
