import React from 'react'
import styled from 'styled-components'

interface Props {
  onClick?: () => void;
}



const NewLetterButton = (props: Props) => {
  return (
    <StyledNewLetterButton {...props} data-tour="step-1">
      Say Thank You
    </StyledNewLetterButton>
  )
}

export default NewLetterButton

const StyledNewLetterButton = styled.button`
  border: 2px solid white;
  outline: 0;
  background: #FFF;
  color: #56aade;
  text-transform: uppercase;
  border-radius: 30px;
  padding: 5px 20px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
  font-size: 1em;
  letter-spacing: 1px;
  transition: transform 120ms ease-out;
  box-shadow: 0px 3px 10px rgba(0,0,0,0.1);
  pointer-events: all;


  &:hover {
    transform: scale(1.2, 1.2);
  }
`