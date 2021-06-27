import React, { useState } from 'react';
// import HamburgerMenu from './HamburgerMenu';

const NavHeader = () => {
  return (
    <div id="navHeader">
      {/*<HamburgerMenu />*/}
      <div id="mainHeader">
        THE ANTI-EVICTION MAPPING PROJECT
      </div>
      <div id="mapLinks">
        <div id="housingProtectionLink">
          <a href="https://covid19.antievictionmap.com/"> COVID-19    GLOBAL    HOUSING    PROTECTION<br />
            LEGISLATION & HOUSING JUSTICE ACTION</a>
        </div>
        <div id="oralHxtoriesLink">
          <a href="https://trusting-brown-d0bdea.netlify.app/">COVID-19   ORAL   HXTORIES   OF   TENANT <br />
            RESISTANCE & EVICTION INFORMATION</a>
        </div>
      </div>
    </div>
  )
}

export default NavHeader
