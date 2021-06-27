import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const NavLink = (props) => {
  return(
    <a href={props.href}>
      {props.children}
    </a>
  )
}

const SubNav = (props) => {
  const [show, setShow] = useState(false)
  return(
    <span className="sub-nav" onClick={e => setShow(current => !current)}>
      { props.children }
      <div className="list" style={{display: show ? 'block' : 'none'}}>
        { props.links.map((l,i) => {
          return (
            <NavLink key={i} {...l} />
          )
        }) }
      </div>
    </span>
  )
}

/*
* Plan:
*   - get rid of nav-mobile
*   - put below in new element navbar-menu
*   - set navbar to flex so it's either
*     6 x 1, 3 x 2 or 2 x 3 depending
*     on the width
*   - add element below navbar-header
*   - in navbar-header have div width 100%
*     with header title
*   - below that div flex as 2x1 or 1x2
*     depending on the width
*   - I guess get rid of nav-desktop too
*     and put all this in navigation
* */


const NavDesktop = () => {
  return(
    <div id="NavDesktop">
      {/*<Link to="/maps/covid-19">Covid-19 Map</Link>*/}
      {/*<Link to="/maps/oral-histories">Oral Histories</Link>*/}
      <NavLink href="http://google">
        About
      </NavLink>
      <NavLink href="http://google.com">
        Protection Legislation
      </NavLink>
      <NavLink href="http://google.com">
        Tenant Stories
      </NavLink>
      <NavLink href="http://google.com">
        Share Your Story
      </NavLink>
      <SubNav
        links={[
          { href: 'http://google.com', children: `Evictions & Protections` },
          { href: 'http://google.com', children: `Housing Justice Action` },
        ]}
      >
        Add Info To Map
      </SubNav>
      <NavLink href="http://google.com">
        Resources
      </NavLink>
    </div>
  )
}

export default NavDesktop
