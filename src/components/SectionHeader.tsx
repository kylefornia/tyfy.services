import React from 'react'
import styled from 'styled-components'

interface Props {
  title: string;
}

const StyledSectionHeader = styled.div`
  color: #FFF;
  text-align:center;
  font-size: 2em;
  font-weight: 900;
  margin-top: 1.2em;
  margin-bottom: 1em;
  width: 100%;
  padding: 20px 0;
  display: block;

  @media only screen and (max-height: 600px){
    margin-top: 0.6em;
    padding: 0px;
    margin-bottom: 0.6em;
  }
`

const SectionHeader = ({ title = '' }: Props) => {
  return (
    <StyledSectionHeader>
      <h1>{title}</h1>
    </StyledSectionHeader>
  )
}

export default SectionHeader
