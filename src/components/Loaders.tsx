import React from 'react'
import styled from 'styled-components';
import NewLetterButton from './NewLetterButton';
import SectionHeader from './SectionHeader';
import HomeHeader from './HomeHeader';

interface Props {

}

const StyledHomeContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  flex-flow: column nowrap;
`

const StyledFeedContainer = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  text-align: center;
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

  .spin {
    animation: rotate 10000ms linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
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
    animation-duration: 300ms;
  }

`

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
  </StyledFeedContainer>
)

export const AccountLoader = () => (
  <StyledAccountContainer>
    <i className="ri-loader-fill spin"></i>
  </StyledAccountContainer>
)

export default { Loaders, HomeLoader, FeedLoader, AccountLoader }
