import React, { useState } from 'react'
import Hamburger from '../assets/aemp_hamburger.svg'


const NavMenu = (props) => {
  const [show,setShow]=useState(false);
  let menuStyle = {
    border: props.show?'2px solid #c92a1d':'0'
  }
  let itemStyle = {
    display: !props.hamburger?'auto': props.show?'block':'none',
  };
  return(
    <div id={props.hamburger?"HamburgerMenu":"NavMenu"} style={menuStyle}>
      <a href="http://google" style={itemStyle}>
        About
      </a>
      <a href="http://google.com" style={itemStyle}>
        Covid-19 Maps
      </a>
      <a href="http://google.com" style={itemStyle}>
        Resources
      </a>
      <a href="http://google.com" style={itemStyle}>
        Tenant-Generated Stories
      </a>
      <a href = "http//google.com" style={itemStyle}>
        + Add Info To Map
      </a>
    </div>
  )
}

export default NavMenu
