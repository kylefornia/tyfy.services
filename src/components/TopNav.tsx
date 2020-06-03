import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';

interface Props {

}

const StyledTopNavContainer = styled.div`
  width: 100%;
  background: rgba(255,255,255, 1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  box-shadow: 0 3px 5px rgba(0,0,0,0.1);
  z-index: 3;

  .left-nav {
      flex: 1;
      align-self: flex-start;
  }

  .right-nav {
    display: flex;
    align-self: flex-end;
    flex-flow: row nowrap;
    justify-content: space-evenly;
  }
`

const StyledTopNavItem = styled.div`
  padding: 10px;
  color: #888;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  flex: 1;
  align-items: center;
  width: 100px;

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

const TopNavItem = ({ iconClassName, text, to, exact }: any) => {
    return (
        <StyledTopNavItem>
            <NavLink exact={exact} activeClassName="active" to={to}>
                <i className={iconClassName}></i>
                <span>{text}</span>
            </NavLink>
        </StyledTopNavItem>
    )
}

const TopNav = (props: Props) => {
    return (
        <StyledTopNavContainer>
            <div className="left-nav"></div>
            <div className="right-nav">
                <TopNavItem to="/" exact iconClassName="ri-earth-line" text="World" />
                <TopNavItem to="/feed" iconClassName="ri-rss-line" text="Feed" />
                <TopNavItem to="/account" iconClassName="ri-user-line" text="Account" />
                <TopNavItem to="/more" iconClassName="ri-menu-line" text="More" />
            </div>
        </StyledTopNavContainer>
    )
}

export default TopNav
