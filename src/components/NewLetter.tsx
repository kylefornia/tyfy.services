import React from 'react'
import styled from 'styled-components';
import IPLocationAPI from '../services/IPLocationAPI';
import FirebaseAPI from '../services/FirebaseAPI';
import { UserLocation } from '../services/IPLocationAPI'

export interface Letter {
  id?: string;
  isNewLetter?: boolean;
  name: string;
  message: string;
  location: UserLocation;
}

interface Props {
  setNewLetter: ({
    isNewLetter,
    name,
    message,
    location,
  }: Letter) => {};
  newLetter: Letter
}

const StyledNewLetterWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  z-index: 3;
  width: 100%;
  align-items: center;
  justify-content: center;
`
const StyledNewLetter = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  background: #FFF;
  height: calc(100% - 40px);
  width: calc(100% - 20px);
  max-width: 768px;
  max-height: 900px;
  transition: transform 300ms ease-out, opacity 300ms ease-out;
  animation: animate-in 300ms ease-out;
  will-change: transform, opacity;
  font-family: 'Merriweather', serif;
  font-size: 1.1em;
  box-shadow: 0 3px 15px rgba(0,0,0,0.1);
  border-radius: 3px;
  padding: 10px 0;

  @keyframes animate-in {
    0% {
      transform: translateY(100px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }

  }

`

const StyledHeader = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
`

const StyledNameInput = styled.input`
  padding: 12px;
  font-family: 'Merriweather', serif;
  border: 1px dashed #f0f0f0;
  font-size: 1em;
  flex: 1;
  max-width: 300px;
`

const StyledCloseButton = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  outline: 0;
  background: none;
  font-size: 0.8em;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0 0 0 10px;
  color: #fc5c65;
  padding: 10px;
  /* border-radius: 30px; */
  font-family: 'Open Sans', sans-serif;

  &:hover {
    opacity: 0.8;
  }

  i {
    font-size: 2em;
    margin-right: 10px;
    font-weight: 400;

  }
`

const StyledTextArea = styled.textarea`
  flex: 1;
  margin: 10px;
  border-radius: 3px;
  outline: 1px dotted #f0f0f0;
  border: 1px dashed #f0f0f0;
  padding: 12px;
  font-size: 1em;
  font-family: 'Merriweather', serif;
  line-height: 1.2;
  resize: none;
`

const StyledSendButton = styled.button`
  background: #7ec9f7;
  width: auto;
  margin: 10px auto;
  padding: 10px 20px;
  border-radius: 30px;
  border: 0;
  outline: 0;
  color: #FFF;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 0.8em;
  letter-spacing: 1px;
`

const StyledInstructions = styled.p`
  color: #ccc;
  font-size: 0.7em;
  font-family: 'Open Sans', sans-serif;
  padding: 0px 20px;
`


const NewLetter = (props: Props) => {

  function closeLetter() {
    props.setNewLetter({ ...props.newLetter, isNewLetter: false })
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.setNewLetter({ ...props.newLetter, name: e.target.value })
  }

  function handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    props.setNewLetter({ ...props.newLetter, message: e.target.value })
  }

  async function sendLetter() {
    let { lat, lon, city, country, countryCode, regionName }: UserLocation = await IPLocationAPI.getLocationFromIP();

    if (!city) {
      return alert('Cannot get location. Unable to send letter')
    }

    FirebaseAPI.addNewLetter({
      name: props.newLetter.name,
      message: props.newLetter.message,
      location: {
        lat: lat,
        lon: lon,
        city: city,
        country: country,
        countryCode: countryCode,
        regionName: regionName
      }
    })

  }


  return (
    <StyledNewLetterWrapper >
      <StyledNewLetter>
        <StyledHeader>
          <StyledNameInput onChange={handleNameChange} placeholder="Your Name" type="text" />
          <StyledCloseButton onClick={closeLetter}><i className="ri-delete-bin-2-line"></i></StyledCloseButton>
        </StyledHeader>
        <StyledTextArea onChange={handleMessageChange} placeholder="Enter Message...">
        </StyledTextArea>
        <StyledSendButton onClick={sendLetter}>Send Thank You</StyledSendButton>
        <StyledInstructions>Your approximate location is retrieved using your public IP Address to tag where the message is coming from. Your IP is not stored and will not be shared.</StyledInstructions>
      </StyledNewLetter>
    </StyledNewLetterWrapper>
  )
}

export default NewLetter
