import React from 'react'
import styled from 'styled-components';
import NewLetterButton from './NewLetterButton';
import SectionHeader from './SectionHeader';
import HomeHeader from './HomeHeader';
import Account, { StyledProfileContainer } from './Account';

interface Props {

}



const Loaders = (props: Props) => {
  return (
    <div>

    </div>
  )
}

export const HomeLoader = () => (
  <StyledHomeContainer>
    <HomeHeader onClick={() => undefined} />
  </StyledHomeContainer>
)

export const FeedLoader = () => (
  <StyledFeedContainer>
    <SectionHeader title="Live Feed" />
    <NewLetterButton onClick={() => undefined}></NewLetterButton>
    <ul>
      <li><StyledFeedItem /></li>
      <li><StyledFeedItem /></li>
      <li><StyledFeedItem /></li>
      <li><StyledFeedItem /></li>
      <li><StyledFeedItem /></li>
    </ul>
  </StyledFeedContainer>
)

export const AccountLoader = () => (
  <StyledAccountContainer>
    <i className="ri-loader-fill spin"></i>
  </StyledAccountContainer>
)
export const ViewLetterLoader = () => (
  <StyledViewLetterContainer>
    <i className="ri-mail-open-fill grow"></i>
  </StyledViewLetterContainer>
)

export const AccountProfileLoader = () => (
  <StyledAccountProfileLoader color="#d5d5d5">
    <div className="profile">
      <div className="profile-image-container">
        <div className="img" />
        <i className='ri-loader-2-line spin' />
      </div>
      <div className="profile-details">
        <strong className="name">█████ ███████</strong>
        <span className="account-type">██████</span>
      </div>
    </div>
  </StyledAccountProfileLoader>
)

export const LettersLoader = () => (
  <StyledLettersContainer>
    <div className="letters-header">
      <h5>Inbox</h5>
    </div>
    <div className="letters-content">
      <i className='ri-loader-2-line spin' />
    </div>
  </StyledLettersContainer>
)

export const MoreLoader = () => (
  <StyledAccountContainer>
    <i className="ri-loader-fill spin"></i>
  </StyledAccountContainer>
)

export default { Loaders, HomeLoader, FeedLoader, AccountLoader, LettersLoader, AccountProfileLoader, ViewLetterLoader }



const StyledHomeContainer = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh - 60px);
  flex-flow: column nowrap;
`

const StyledFeedContainer = styled.div`
  /* padding: 20px; */
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  text-align: center;
  height: 100vh;
  overflow: hidden;
  
  ul {
    margin-top: 40px;
  }
`


const StyledFeedItem = styled.div`
  background: #FFF;
  border-radius: 5px;
  margin: 0 auto;
  margin-bottom: 10px;
  width: calc(100% - 20px);
  max-width: 468px;
  display: block;
  /* box-shadow: 0px 3px 5px rgba(0,0,0,0.1); */
  will-change: transform;
  -webkit-transition: box-shadow 120ms ease-out;
  transition: box-shadow 120ms ease-out;
  /* border: 2px solid #e7f5fd; */
  height: 215px;
  opacity: 0.25;
`

const StyledLoadingContainer = styled.div`
  /* flex: 1; */
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.8);
  height: calc(100vh - 60px);
  flex-flow: column nowrap;

  i{
    float: none;
    display: block;
    font-size: 4em;
    margin-bottom: 10px;
  }

  

`

const StyledHeader = styled.h1`
  color: #FFF;
  text-align:center;
  font-size: 2em;
  font-weight: 900;
  margin-top: 2em;
  margin-bottom: 20px;
  width: 100%;
  padding: 20px 0;
`

const StyledBottomContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  height: auto;
  z-index: 2;
  text-align: center;
  padding: 0px 0px 80px 0px;
`

const StyledAccountContainer = styled(StyledLoadingContainer)`
  overflow: hidden;
  height: calc(100vh - 80px);
  width: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  i {
    font-size: 2.5em;
  }

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
  display: flex;
  flex-flow: column nowrap;

  .letters-header {
    border-radius: 5px 5px 0 0;
    text-align: left;
    padding: 20px 20px;
    /* font-family: 'Merriweather', 'Times New Roman', Times, serif; */
    color: #666;
    font-weight: 600;
    /* border-bottom: 2px solid #f0f0f0; */
    background: #e7f5fd;
  }

  .letters-content {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;

    i {
      color: #c3c3c3;
      font-size: 1.5em;
    }
  }
`;

const StyledAccountProfileLoader = styled(StyledProfileContainer)`

 

  .img {
      margin: 10px 15px 10px 15px;
      height: 54px;
      width: 54px;
      display: inline-block;
      border-radius: 100%;
      object-fit: cover;
      background: #f8f8f8;
    }

    strong { color: #c3c3c3 !important; }
    span { color: #d8d8d8 !important; }
`;

const StyledViewLetterContainer = styled(StyledLoadingContainer)`

  i {
    animation: grow 10s ease forwards;
  }
  
    @keyframes grow {
      0% {
        transform: scale(1);
      }

      20% {
        transform: scale(2);
      }

      100% {
        transform: scale(2.2);
      }
    }

`