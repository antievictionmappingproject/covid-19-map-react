import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import Hamburger from '../assets/aemp_hamburger.svg'

const NavMenu = props => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  let menuStyle = {
    border: props.show ? '2px solid #c92a1d' : '0',
  };
  let itemStyle = {
    display: !props.hamburger ? 'auto' : props.show ? 'block' : 'none',
  };
  return (
    <div id={props.hamburger ? 'HamburgerMenu' : 'NavMenu'} style={menuStyle}>
      {/*<div>*/}
      <a
        onClick={() => {
          dispatch({ type: 'ui:about:show' });
        }}
      >
        About
      </a>
      <a href="https://covid19.antievictionmap.com/" style={itemStyle}>
        Covid-19 Maps
      </a>
      <a
        onClick={() => {
          dispatch({ type: 'ui:resources:show' });
        }}
      >
        Resources
      </a>
      <a
        href="https://hope.xyz/tenantexperienceoralhistoryproject"
        style={itemStyle}
      >
        Other Tenant-Generated Stories
      </a>
      <a href="https://airtable.com/shruRfsCnlnbIZTpb" style={itemStyle}>
        + Add Your Data to Our Maps
      </a>
    </div>
  );
};

export default NavMenu;
