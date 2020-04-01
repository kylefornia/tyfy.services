import React from 'react'
import styled from 'styled-components'

interface Props {

}

const StyledBottomNavContainer = styled.div`
  width: 100%;
  background: rgba(255,255,255, 1);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  box-shadow: 0 -3px 5px rgba(0,0,0,0.1);
`

const StyledBottomNavItem = styled.div`
  padding: 10px;
  color: #7ec9f7;
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  height: 36px;
  
  i {
    font-size: 1.2em;
  }

  span {
    display: block;
    font-size: 0.7em;
    font-weight: bold;
  }
`

const BottomNavbarItem = ({ iconClassName, text }: any) => {
  return (
    <StyledBottomNavItem>
      <i className={iconClassName}></i>
      <span>{text}</span>
    </StyledBottomNavItem>
  )
}

const BottomNavbar = (props: Props) => {
  return (
    <StyledBottomNavContainer>
      <BottomNavbarItem iconClassName="ri-earth-line" text="World" />
      <BottomNavbarItem iconClassName="ri-rss-line" text="Feed" />
      <BottomNavbarItem iconClassName="ri-user-line" text="Account" />
    </StyledBottomNavContainer>
  )
}

export default BottomNavbar
