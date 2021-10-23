import React, { useState } from 'react'
import Hamburger from '../assets/hamburger.svg'
import NavMenu from './NavMenu'

const HamburgerMenu = () => {
  const [show,setShow]=useState(false);
  return(

    <div id="HamburgerWrapper"
         onMouseEnter={()=>setShow(true)}
         onMouseLeave={()=>setShow(false)}
    >

      <img src={Hamburger}
           id = "hamburgerImage"
      />

      <NavMenu hamburger = {true} show = {show} />

    </div>
  )
};

export default HamburgerMenu;
