import React from 'react'
import styled from 'styled-components'

interface Props {
  title: string;
}



const SectionHeader = ({ title = '' }: Props) => {
  return (
    <StyledSectionHeader>
      <h1>{title}</h1>
    </StyledSectionHeader>
  )
}

export default SectionHeader

const StyledSectionHeader = styled.div`
  color: #FFF;
  text-align:center;
  font-size: 2em;
  font-weight: 900;
  /* margin-top: 20px; */
  /* margin-bottom: 15px; */
  width: 100%;
  padding: 30px 0 30px 0;
  display: block;
  flex: 0 1 auto;
  max-height: 350px;
  /* font-family: 'Merriweather', 'Times New Roman', Times, serif; */

  @media only screen and (max-height: 600px){
    margin-top: 0.6em;
    padding: 0px;
    margin-bottom: 0.6em;
    font-size: 24px;
  }
`