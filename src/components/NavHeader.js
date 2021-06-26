import React, { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';

const NavHeader = () => {
  return (
    <div id="navHeader">
      <HamburgerMenu />
      <div id="mainHeader">
        THE ANTI-EVICTION MAPPING PROJECT
      </div>
      <div id="mapLinks">
        <div id="housingProtectionLink">
          <a href="http://google.com"> COVID-19 HOUSING PROTECTION<br />
            LEGISLATION & HOUSING JUSTICE ACTION</a>
        </div>
        <div id="oralHxtoriesLink">
          <a href="http://google.com">COVID-19 ORAL HXTORIES OF TENANT <br />
            RESISTANCE & EVICTION INFORMATION</a>
        </div>
      </div>
    </div>
  )
}

export default NavHeader
