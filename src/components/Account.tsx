import React from 'react'
import styled from 'styled-components'
import AuthContext, { useAuth, useSession, UserState } from '../contexts/AuthContext'
import SignIn from './SignIn'
import SectionHeader from './SectionHeader'
import * as firebase from 'firebase/app'
import Loaders from './Loaders'

interface Props {

}

interface AccountPageProps {
  user?: firebase.auth.UserCredential | any | undefined;
  isLoading?: boolean;
}

const StyledAccountContainer = styled.div`
  /* margin-top: 20px; */
  /* padding-bottom: 60px; */
  /* min-height: 100vh; */
  font-family: 'Open Sans', sans-serif;
  height: calc(100% - 60px);
  flex: 1;
  font-size: 18px;
  position: relative;
  /* overflow: hidden; */
  display: flex;
  flex-flow: column nowrap;
`

const StyledButton = styled.button`
  display: block;
  width: calc(100% - 20px);
  max-width: 468px;
  margin: 0 auto;
  border: 0;
  background: #FFF;
  border-radius: 5px;
  text-transform: uppercase;
  font-size: 1em;
  padding: 10px 20px;
  font-weight: 800;
  font-family: 'Open Sans', sans-serif;
  font-size: 1em;
  color: #7ec9f7;
  align-items: center;
  margin-bottom: 10px;
  letter-spacing: 1px;
  box-shadow: 0px 3px 5px rgba(0,0,0,0.1);


  .icon {
    display: inline-block;
    margin: 0;
    height: 18px;
    width: 18px;
    font-size: 1.2em;
    color: #444;
    /* border-radius: 5px 0 0 5px; */
  }

  .button-text {
    display: inline-block;
    text-align: center;
    flex: 1;
    color: #444;
  }

  &:hover {
    opacity: 0.9;
  }
`

const StyledProfileContainer = styled.div`
  display: flex;
  background: #FFF;
  margin: 10px auto;
  font-family: 'Open Sans', sans-serif;
  width: calc(100% - 20px);
  max-width: 468px;
  border-radius: 5px;
  box-shadow: 0px 3px 5px rgba(0,0,0,0.1);
  flex-flow: column nowrap;



  .profile {
    display: flex;
    border-bottom: 1px solid #f0f0f0;
  }

  img {
    margin: 10px 15px 10px 15px;
    height: auto;
    width: 64px !important;
    border-radius: 100%;
    object-fit: cover;
  }

  .profile-details {
    flex: 1;
    padding: 10px 15px 10px 0px;
    font-size: 14px;
    font-weight: 400;
    color: #aaa;
    line-height: 20px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-start;
    /* height: 100%; */

    .name {
      font-weight: bold;
      color: #444;

    }
  }

`
const StyledContentContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  width: calc(100% - 20px); 
  margin: 0 auto;
  margin-bottom: 10px;
  flex-flow: column nowrap;
  justify-content: center;
`
const StyledLettersContainer = styled.div`
  background: #FFF;
  max-width: 468px;
  border-radius: 5px;
  box-shadow: 0px 3px 5px rgba(0,0,0,0.1);
  flex: 1;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`

const StyledSelectorContainer = styled.div`
  display: flex;
  position: relative;
  


  .label {
    display: inline-block;
    font-size: 14px;
    padding: 16px;
    color: #666;
  }

  ul {
    display: flex;
    flex-flow: row nowrap;
    flex: 1;
  }

  li {
    flex: 1;
    display: flex;
    font-size: 12px;
    text-align: center;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 8px 12px;
    line-height: 1.2em;
    font-weight: 600;
    color: #aaa;
    border-left: 1px solid #f0f0f0;


    &:first-of-type {
      border-left: 0;
    }


    &.active {
      color: #45aaf2;
    }
  }

  @media only screen and ( max-width: 500px) {
    display: block;

  }
`

const AccountPage = ({ user = {}, isLoading }: AccountPageProps) => {

  function signOut() {
    firebase.auth().signOut()
  }


  return (<StyledAccountContainer>
    <SectionHeader title="Account"></SectionHeader>

    <StyledProfileContainer>
      <div className="profile">
        <img src={user.photoURL} />
        <div className="profile-details">
          <strong className="name">{user.displayName}</strong>
          <p className="email">{user.email}</p>
        </div>
      </div>
      <StyledSelectorContainer>
        {/* <div className="label">I am a&hellip;</div> */}
        <ul>
          <li className="active">
            Frontliner</li>
          <li>Health Worker</li>
          <li>Law Enforcement</li>
          <li>Donor</li>
        </ul>
      </StyledSelectorContainer>
    </StyledProfileContainer>
    <StyledContentContainer>



      <StyledLettersContainer>

      </StyledLettersContainer>
    </StyledContentContainer>
    <StyledButton onClick={signOut}>Sign Out</StyledButton>
  </StyledAccountContainer>)
}

const Account = (props: Props) => {

  return (
    <StyledAccountContainer>
      <AuthContext.Consumer>
        {
          ({ user = undefined, isLoading = true }: UserState) => (

            isLoading ?

              <Loaders.AccountLoader />

              :

              (!user ?
                <SignIn />
                :
                <AccountPage user={user} isLoading={isLoading} />
              )
          )
        }
      </AuthContext.Consumer>
    </StyledAccountContainer>
  )
}

export default Account
