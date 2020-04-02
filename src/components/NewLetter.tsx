import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components';
import IPLocationAPI from '../services/IPLocationAPI';
import FirebaseAPI from '../services/FirebaseAPI';
import { UserLocation } from '../services/IPLocationAPI'

export interface Letter {
  id?: string;
  isNewLetter?: boolean;
  name: string;
  message: string;
  location?: UserLocation;
}

interface Props {
  setNewLetter: Dispatch<SetStateAction<Letter>>;
  newLetter: Letter;

}

const StyledNewLetterWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  overflow: hidden;
  z-index: 3;
  width: 100%;
  align-items: center;
  justify-content: center;
`
const StyledNewLetter = styled("div") <{ isSent: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  background: #FFF;
  /* height: ${ ({ isSent }) => isSent ? '180px' : 'calc(100% - 40px)'}; */
  /* width: ${ ({ isSent }) => isSent ? '280px' : 'calc(100% - 20px)'}; */
  height: calc(100% - 80px);
  width: calc(100% - 20px);
  max-width: 768px;
  max-height: 900px;
  transition: all 300ms ease-out;
  animation: ${ ({ isSent }) => isSent ? 'shrink 300ms ease-out forwards' : 'animate-in 300ms ease-out'} ;
  will-change: transform, opacity;
  font-family: 'Merriweather', serif;
  font-size: 1.1em;
  box-shadow: 0 3px 15px rgba(0,0,0,0.1);
  border-radius: 3px;
  padding: 10px 0;
  position: ${ ({ isSent }) => isSent ? 'absolute' : 'relative'};
  z-index: 3;

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

  @keyframes shrink {
    0% {
      transform: scale(1);
      opacity: 1
    }

    50% {
      opacity: 1;
    }

    100% {
      transform: scale(1, 0);
      opacity: 0;
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
  /* height: 600px; */
  max-height: 600px;
  margin: 10px;
  border-radius: 3px;
  outline: 1px dotted #f0f0f0;
  border: 1px dashed #f0f0f0;
  padding: 12px;
  font-size: 1em;
  font-family: 'Merriweather', serif;
  line-height: 1.4;
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

  &:hover {
    opacity: 0.8;
  }
`

const StyledInstructions = styled.p`
  color: #ccc;
  font-size: 0.7em;
  font-family: 'Open Sans', sans-serif;
  padding: 0px 20px;
`

const StyledMail = styled('div') <{ isSent: boolean }>`
  display: ${ ({ isSent }) => isSent ? 'block' : 'none'} ;
  width: 300px;
  height: 200px;
  background: #ff8789;
  position: relative;
  transform-style: preserve-3d;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: 4;
  animation: ${ ({ isSent }) => isSent ? 'flyRight 2000ms ease forwards' : 'none'};


  &:before{
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  border-left: 140px solid Transparent;
  border-right: 150px solid #ff393c;
  border-top: 100px solid Transparent;
  border-bottom: 100px solid #ff393c;
  z-index: 5;
  border-bottom-right-radius: 10px;
}

  &:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  border-left: 150px solid #ff5355;
  border-right: 140px solid Transparent;
  border-top: 100px solid Transparent;
  border-bottom: 100px solid #ff5355;
  z-index: 4;
  border-bottom-left-radius: 10px;
  }


  @keyframes flyRight {
    0% {
      transform: translateX(0) scale(1);
      opacity: 1;
    }

    70% {
      transform: translateX(0) scale(1);
      opacity: 1;
    }

    100% {
      transform: translateX(800px);
      opacity: 0;
    }
  }

`

const StyledMailContent = styled.div`
  height: 100px;
  width: 200px;
  white-space: pre-wrap;
  padding: 20px;
  font-size: 0.7em;
  font-family: 'Merriweather', serif;
  background: #FFF;
  margin: 0 auto;
  border-radius: 3px;
  box-shadow: 0px 3px 10px rgba(0,0,0,0.1);
`

const StyledMailCover = styled.div`
  &::before {
    content: '';
  position: absolute;
  top: 0;
  left: 0;
  border-left: 150px solid transparent;
  border-right: 150px solid transparent;
  border-top: 100px solid #ff8789;
  border-bottom: 100px solid transparent;
  z-index: 6;
  transform-origin: top;
  transition: all 200ms 1s ease;
  transform: rotateX(180deg);
  animation: closeFlap 300ms 700ms ease-out forwards;

  @keyframes closeFlap {
    0% {
      transform: rotateX(180deg);
    }

    100% {
    transform: rotateX(0deg);
    }
  }
  }
`


const NewLetter = (props: Props) => {

  const [isSent, setIsSent] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);

  function closeLetter() {
    props.setNewLetter({ ...props.newLetter, isNewLetter: false })
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.setNewLetter({ ...props.newLetter, name: e.target.value })
  }

  function handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    props.setNewLetter({ ...props.newLetter, message: e.target.value })
  }

  async function getUserLocation(): Promise<any> {

    if (navigator.geolocation) {

      return new Promise((resolve, reject) => {
        const getGeolocation = async (position: any) => {

          if (!position) return alert('Cannot get your location')

          let { city, country_name, country_code, region }: UserLocation = await IPLocationAPI.getLocationFromIP();

          const location: UserLocation = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            city,
            country_name,
            country_code,
            region,
          }

          return resolve(location)
        }

        navigator.geolocation.getCurrentPosition(getGeolocation)
      });


    } else {
      alert("Geolocation is not supported by this browser.");
    }

  }

  async function sendLetter() {

    setIsSending(true)

    let { lat = 0, lon = 0, city, country_name, country_code, region }: UserLocation = await getUserLocation();

    if (!city) {
      return alert('Cannot get location. Unable to send letter')
    }

    await FirebaseAPI.addNewLetter({
      name: props.newLetter.name,
      message: props.newLetter.message,
      location: {
        lat: lat,
        lon: lon,
        city: city,
        country_name: country_name,
        country_code: country_code,
        region: region,
      }
    }).then(() => {
      setIsSending(false)
      setIsSent(true)
      setTimeout(() => {
        closeLetter()

      }, 2000);
    })


  }


  return (
    <StyledNewLetterWrapper >

      <StyledMail isSent={isSent}>
        <StyledMailCover></StyledMailCover>
        <StyledMailContent>{props.newLetter.message}</StyledMailContent>
      </StyledMail>

      <StyledNewLetter isSent={isSent}>
        {
          isSent ?
            null
            :
            <>
              <StyledHeader>
                <StyledNameInput onChange={handleNameChange} placeholder="Your Name" type="text" />
                <StyledCloseButton onClick={closeLetter}><i className="ri-delete-bin-2-line"></i></StyledCloseButton>
              </StyledHeader>
              <StyledTextArea onChange={handleMessageChange} placeholder="Enter Message...">
              </StyledTextArea>
              <StyledSendButton onClick={sendLetter}>{isSending ? 'Sending...' : 'Send Thank You'}</StyledSendButton>
              <StyledInstructions>Your approximate location is retrieved using your public IP Address to tag where the message is coming from. Your IP is not stored and will not be shared.</StyledInstructions>
            </>
        }
      </StyledNewLetter>
    </StyledNewLetterWrapper>
  )
}

export default NewLetter
