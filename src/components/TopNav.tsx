import React from 'react'
import styled from 'styled-components'
import { NavLink, useLocation } from 'react-router-dom';

interface Props {
  transparent?: boolean;
}

const StyledTopNavContainer = styled.div`
  width: 100%;
  background: rgba(86,170,222, 0.65);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  backdrop-filter: blur(10px);
  /* box-shadow: 0 3px 5px rgba(0,0,0,0.1); */
  z-index: 3;

  .left-nav {
      flex: 1;
      align-self: flex-start;
      display: flex;
      height: 58px;

      .logo {
        margin-left: 40px;
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .logo-icon {
          color: #FFF;
          font-size: 36px;
          display: inline-block;
        }
      }

  }

  .right-nav {
    display: flex;
    align-self: flex-end;
    flex-flow: row nowrap;
    justify-content: space-evenly;
  }
`

const StyledTopNavItem = styled.div`
  color: #fff;
  opacity: 0.8;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  flex: 1;
  align-items: center;
  width: 100px;
  font-weight: 400;



  &:hover a {
    background: rgba(255,255,255, 0.2);
    opacity: 1;
    border-bottom: 2px solid #FFF;

  }

  a {
    padding: 10px;
    text-decoration: none;
    color: #fff;
    flex: 1;
    display: inline-block;
    height: 100%;
    width: 100%;
    border-bottom: 2px solid transparent;
  }
  

  .active {
    color: #FFF;
    background: rgba(255,255,255, 0.1);
    opacity: 1;
    border-bottom: 2px solid #FFF;
  }


  i {
    font-size: 1.4em;
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

const StyledTransparentNav = styled(StyledTopNavContainer)`
  /* background: rgba(0,0,0, 0.1); */
  /* background: #4d99c7; */
  background: none;
  /* background: linear-gradient(to bottom, rgba(20,20,20,0.4) 0%, transparent); */
  box-shadow: none;
  /* border-bottom: 1px solid  rgba(255,255,255, 0.02); */
  /* border-color: rgba(255,255,255, 0.02); */
  /* box-shadow: 0px 3px 10px rgba(0,0,0,0.05); */
  color: #f0f0f0;

  a {
    color: rgba(255,255,255,0.6);
  }

  .active * {
    color: #FFF;
  }

  .left-nav {
    .logo {
      .logo-icon {
        color: #FFF;
      }
    }
  }

  .right-nav div {
    &:hover {
      background: rgba(255,255,255, 0.2);

      a { 
       border-bottom: 2px solid #FFF;

       }

       

      * {
        color: #FFF;
      }
      



    }

    
  }

  .active {
    border-bottom: 2px solid rgba(255,255,255,0.25);
  }

`;

const TopNav = (props: Props) => {

  let location = useLocation();

  //@ts-ignore
  if (!window.isMobile && (location.pathname === '/' || location.pathname === '/home')) {
    return (<TopNavTransparent />)
  }


  return (
    <StyledTopNavContainer>
      <div className="left-nav">
        <div className="logo">
          <i className="ri-empathize-line logo-icon"></i>
        </div>
      </div>
      <div className="right-nav">
        <TopNavItem to="/" exact iconClassName="ri-earth-line" text="World" />
        <TopNavItem to="/feed" iconClassName="ri-rss-line" text="Feed" />
        <TopNavItem to="/account" iconClassName="ri-user-line" text="Account" />
        <TopNavItem to="/more" iconClassName="ri-menu-line" text="More" />
      </div>
    </StyledTopNavContainer>
  )
}

const TopNavTransparent = () => {
  return (
    <StyledTransparentNav>
      <>
        <div className="left-nav">
          <div className="logo">
            <i className="ri-empathize-line logo-icon"></i>
          </div>
        </div>
        <div className="right-nav">
          <TopNavItem to="/" exact iconClassName="ri-earth-line" text="World" />
          <TopNavItem to="/feed" iconClassName="ri-rss-line" text="Feed" />
          <TopNavItem to="/account" iconClassName="ri-user-line" text="Account" />
          <TopNavItem to="/more" iconClassName="ri-menu-line" text="More" />
        </div>
      </>
    </StyledTransparentNav>
  )
}

export default TopNav
