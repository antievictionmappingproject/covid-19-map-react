import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Hamburger from '../assets/hamburger.svg'


const NavMenu = props => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  // let menuStyle = {
  //   border: props.show ? '2px solid #c92a1d' : '0',
  // };

  let itemStyle = {
    display: !props.hamburger ? 'auto' : props.show ? 'block' : 'none',
  };

  return (
    <div id={props.hamburger ? 'HamburgerMenu' : 'NavMenu'} style={itemStyle}>

<div className="section1">
    <a href="https://antievictionmap.com/" style={itemStyle} className="aemplink">
      AEMP
    </a>

    <a href="https://covid19.antievictionmap.com/" style={itemStyle} className="mapslink">
      Covid-19 Maps
    </a>

    <a style={itemStyle} className="aboutlink"
      onClick={() => {
        dispatch({ type: 'ui:about:show' });
      }}
    >
      About
    </a>

</div>

{/* hope.xyz link removed */}

{/*
<div className="section2">




      <a style={itemStyle} className="resourceslink"
        onClick={() => {
          dispatch({ type: 'ui:resources:show' });
        }}
      >
        More Tenant Resources
      </a>

      <a
        href="https://hope.xyz/tenantexperienceoralhistoryproject"
        style={itemStyle} className="storieslink"
      >
        More Tenant-Generated Stories
      </a>
</div>
*/}

<div className="section3">
       <div className="dropdown" style={itemStyle}>

        <button className="dropbtn">Add Your Data to Our Maps ▼ </button>

        <div className="dropdown-content">
        <a href="https://airtable.com/shrRqqyDtUYdaQwt5">
          Legislation Information Update Form (English)
        </a>

        <a href="https://airtable.com/shrRqqyDtUYdaQwt5">
          Formulariode Actualización de Información sobre Legislación (Español)
        </a>

          <a href="https://airtable.com/shruRfsCnlnbIZTpb">
            Housing Experiences Form (English)
          </a>

          <a href="https://airtable.com/shrR2leBN0J9fWs5B">
            Encuesta de Experiencias de Inquilinos (Español)
          </a>

        </div>
        </div>



       </div>

    </div>
  );
};

export default NavMenu;
