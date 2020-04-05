import React from 'react'
import styled from 'styled-components';
import NewLetterButton from './NewLetterButton';

interface Props {
  onClick: () => void
}

const StyledTopContainer = styled.div`
  z-index: 2;
  width: 100%;
  margin-top: 2vh;
  text-align: center;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-size: 14px;

  p {
    padding: 10px 40px 0px 40px;
    line-height: 18px;
    color: rgba(255,255,255,0.8);

    b {
      font-weight: bold;
      color: rgba(255,255,255, 0.9);
    }

  }

  h2 {
    color: #FFF;
    font-family: 'Merriweather', 'Times New Roman', Times, serif;
    margin-top: 20px;
    margin-bottom: 24px;
    font-size: 1.6em;
    font-weight: 800;
    line-height: 1.25em;
  }

`

const HomeHeader = (props: Props) => {
  return (
    <StyledTopContainer>
      <p>To all <b>Frontliners</b>, <b>Health Workers</b>, <b>Law Enforcement</b>, <b>Donors</b>, and others &hellip;</p>
      <h2>Thank You For Your Services</h2>
      <NewLetterButton
        onClick={props.onClick}
      />
    </StyledTopContainer>
  )
}

export default HomeHeader
