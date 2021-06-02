import React, { useState } from 'react'

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

const NavDesktop = () => {
  return(
    <div id="NavDesktop">
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