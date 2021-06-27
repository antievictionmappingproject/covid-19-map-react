import React, { useState } from 'react'
// import Hamburger from '../assets/aemp_hamburger.svg'


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
    {/*<div>*/}
      <a href="https://i.imgur.com/7vxa0ud.png" style={itemStyle}>
        About
      </a>
      <a href="https://trusting-brown-d0bdea.netlify.app/" style={itemStyle}>
        Covid-19 Maps
      </a>
      <a href="https://i.imgur.com/7vxa0ud.png" style={itemStyle}>
        Resources
      </a>
      <a href="https://hope.xyz/tenantexperienceoralhistoryproject" style={itemStyle}>
        Tenant-Generated Stories
      </a>
      <a href = "https://airtable.com/shruRfsCnlnbIZTpb" style={itemStyle}>
        + Add Info To Map
      </a>
    </div>
  )
}

export default NavMenu
