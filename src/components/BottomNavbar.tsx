import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';

interface Props {

}


const BottomNavbarItem = ({ iconClassName, text, to, exact, ...props }: any) => {
  return (
    <StyledBottomNavItem {...props}>
      <NavLink exact={exact} activeClassName="active" to={to} >
        <i className={iconClassName}></i>
        <span>{text}</span>
      </NavLink>
    </StyledBottomNavItem>
  )
}

const BottomNavbar = (props: Props) => {
  return (
    <StyledBottomNavContainer>
      <BottomNavbarItem to="/" exact iconClassName="ri-earth-line" text="World" />
      <BottomNavbarItem data-tour="step-4" to="/feed" iconClassName="ri-rss-line" text="Feed" />
      <BottomNavbarItem data-tour="step-3" to="/account" iconClassName="ri-user-line" text="Account" />
      <BottomNavbarItem to="/more" iconClassName="ri-menu-line" text="More" />
    </StyledBottomNavContainer>
  )
}

export default BottomNavbar


const StyledBottomNavContainer = styled.div`
  width: 100%;
  background: rgba(255,255,255, 1);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  box-shadow: 0 -3px 5px rgba(0,0,0,0.1);
  z-index: 2;
`

const StyledBottomNavItem = styled.div`
  padding: 10px;
  color: #888;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  flex: 1;
  align-items: center;

  a {
    text-decoration: none;
    color: #888;
  }
  

  .active * {
    color: #56aade;
  }


  i {
    font-size: 1.2em;
    line-height: 1.4em;
  }

  span {
    display: block;
    font-size: 0.7em;
    font-weight: bold;
  }
`