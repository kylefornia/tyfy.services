import React from 'react'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'

interface Props {
  count: number | firebase.firestore.DocumentData;
}

const StyledThanksCounterContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  right: 0;
  z-index: 2;
  color: #FFF;
  font-family: 'Merriweather', serif;
  font-size: 0.88em;
  text-align: center;
  line-height: 1.2;
  padding: 40px 0;
  font-weight: 300;
  color: rgba(255,255,255, 0.8);
  pointer-events: none;
`

const StyledThanksCounterText = styled.h3`
  font-size: 3em;
  color: #FFF;
  font-weight: 800;
  line-height: 1em;
  margin: 0;
`

const ThanksCounter = (props: Props) => {
  return (
    <StyledThanksCounterContainer>
      <StyledThanksCounterText>
        <NumberFormat
          value={props.count as number || 0}
          displayType="text"
          thousandSeparator
        />
      </StyledThanksCounterText>
      <p>Thank you letters sent to health workers worldwide.</p>
    </StyledThanksCounterContainer>
  )
}

export default ThanksCounter
