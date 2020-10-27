import React, { Dispatch, SetStateAction, FormEventHandler } from 'react'
import styled from 'styled-components';
import IPLocationAPI from '../services/IPLocationAPI';
import FirebaseAPI from '../services/FirebaseAPI';
import * as firebase from 'firebase/app'
import { UserLocation } from '../services/IPLocationAPI'
import { UserProfile } from '../contexts/AuthContext';
import AccountTypes, { AccountType } from './AccountTypes';
import GlobeContextProvider, { GlobeContext, useGlobe } from '../contexts/GlobeContext';

export interface Letter {
  id?: string;
  isNewLetter?: boolean;
  name: string;
  message: string;
  location?: UserLocation;
  receipient?: UserProfile;
  date?: firebase.firestore.Timestamp;
}

export interface LetterMetadata {
  id?: string;
  name: string;
  location: UserLocation;
  date: firebase.firestore.Timestamp;
  message: string;
}

interface Props {
  setNewLetter: Dispatch<SetStateAction<Letter>>;
  newLetter: Letter;

}

const NewLetter = (props: Props) => {

  const { suspendGlobe, unsuspendGlobe } = React.useContext(GlobeContext)

  const [isSent, setIsSent] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [receipient, setReceipient] = React.useState<{
    user: UserProfile; isLoadingReceipient: boolean;
    accountType: AccountType | undefined;
  }>({
    user: null, isLoadingReceipient: true, accountType: undefined
  });

  function closeLetter(e: undefined | React.FormEvent<HTMLFormElement>) {
    !!e && e.preventDefault();

    props.setNewLetter({ ...props.newLetter, isNewLetter: false })
    unsuspendGlobe();
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

          let { city, country_name, country_code, region }: UserLocation = await IPLocationAPI.getLocationFromIPv3();

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

  async function sendLetter(e: React.FormEvent<HTMLFormElement> | undefined) {

    !!e && e.preventDefault();

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
      },
      receipient: receipient.user
    }).then(() => {
      setIsSending(false)
      setIsSent(true)
      setTimeout(() => {
        closeLetter(undefined)

      }, 2000);
    })


  }

  async function getReceipient() {

    const limit = 10; // could change

    await firebase.firestore()
      .collection('userLetters')
      .orderBy('letterCount', 'asc')
      .limit(limit)
      .get().then((snap) => {

        //randomize user
        const randomNumber = Math.floor(Math.random() * snap.docs.length)
        const randomReceipient = snap.docs[randomNumber].id

        firebase.firestore().collection('users')
          .doc(randomReceipient).get()
          .then((profileSnap) => {

            const accountType = AccountTypes.filter(({ type }) => type == profileSnap.data().accountType)[0]

            setReceipient({
              user: profileSnap.data() as UserProfile,
              isLoadingReceipient: false,
              accountType: accountType as AccountType
            })
          })



      })
  }

  // async function suspendGlobe() {
  //   const { suspendGlobe } = useGlobe()
  //   suspendGlobe()
  // }
  // React.useEffect(() => {
  //   console.log(props);
  // }, [])

  React.useEffect(() => {

    (async () => {
      getReceipient()
      suspendGlobe()
    })()

  }, [])


  return (
    <StyledNewLetterWrapper >

      <StyledMail isSent={isSent}>
        <StyledMailCover></StyledMailCover>
        <StyledMailContent>{props.newLetter.message}</StyledMailContent>
      </StyledMail>

      <StyledNewLetter isSent={isSent}>
        <form onSubmit={sendLetter}>
          {
            isSent ?
              null
              :
              <>
                <div>
                  <StyledCloseButton onClick={(e: any) => { e.preventDefault(); closeLetter(e); }}>
                    <i className="ri-delete-bin-2-line"></i>
                  </StyledCloseButton>
                </div>
                <StyledHeader>
                  <span className="label">From: </span>
                  <StyledNameInput required onChange={handleNameChange} placeholder="Your Name" type="text" />
                </StyledHeader>
                <StyledReceipient
                  isLoadingReceipient={receipient.isLoadingReceipient}
                  color={!receipient.isLoadingReceipient ? receipient.accountType.color : ''}
                >
                  {
                    receipient.isLoadingReceipient ?
                      <>
                        <span className="label">To: </span>
                        <div className="profile">
                          <div className="icon"><i className="ri-user-fill" /></div>
                          <div className="profile-content">
                            <span className="name placeholder">████ ██████</span>
                            <span className="account-type placeholder">███████</span>
                          </div>
                        </div>
                      </>
                      :
                      <>
                        <span className="label">To: </span>
                        <div className="profile">
                          <div className="icon"><i className={receipient.accountType.iconClassName} /></div>
                          <div className="profile-content">
                            <span className="name">{receipient.user.name}</span>
                            <span className="account-type">{receipient.accountType.type}</span>
                          </div>
                        </div>
                      </>
                  }
                </StyledReceipient>
                <StyledTextArea required onChange={handleMessageChange} placeholder="Enter Message...">
                </StyledTextArea>
                <StyledSendButton type="submit">{isSending ? 'Sending...' : 'Send Letter'}</StyledSendButton>
                <StyledInstructions>Your location is used to tag where message is coming from. Your IP is not stored and will not be shared.</StyledInstructions>
              </>
          }
        </form>
      </StyledNewLetter>
    </StyledNewLetterWrapper>
  )
}

export default NewLetter

const StyledNewLetterWrapper = styled.div`
  display: flex;
  position: fixed;
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
  background: rgba(86, 170, 222,0.5);
  backdrop-filter: blur(5px);

  .label {
      margin-right: 10px;
      font-size: 12px;
      /* flex: 0; */
      width: 54px;
      display: inline-block;
      /* font-size: 0.7em; */
      margin-right: 10px;
      /* margin-left: 20px; */
      text-transform: uppercase;
      font-weight: bold;
      color: #a1abb1;
      /* width: 60px; */
      font-family: 'Open Sans', Arial, Helvetica, sans-serif;
    }

  .placeholder {
    opacity: 0.5;
  }
`
const StyledNewLetter = styled("div") <{ isSent: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  background: #E7F5FD;
  /* height: ${({ isSent }) => isSent ? '180px' : 'calc(100% - 40px)'}; */
  /* width: ${({ isSent }) => isSent ? '280px' : 'calc(100% - 20px)'}; */
  width: calc(100% - 20px);
  max-width: 468px;
  /* height: 90%; */
  height: calc(100% - 60px);
  max-height: 600px;
  transition: all 300ms ease-out;
  animation: ${({ isSent }) => isSent ? 'shrink 300ms ease-out forwards' : 'new-letter-animate-in 200ms forwards'} ;
  will-change: transform, opacity;
  font-family: 'Merriweather', serif;
  font-size: 1em;
  box-shadow: 0 3px 15px rgba(0,0,0,0.1);
  border-radius: 3px;
  padding: 20px 0 10px 0;
  position: ${({ isSent }) => isSent ? 'absolute' : 'relative'};
  z-index: 3;
  overflow: auto;
  transform-origin: 50% 0%;

  form {
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    /* background: #FFF; */
  }

  @keyframes new-letter-animate-in {
    0% {
      transform: translateY(-100px) scale(0);
      opacity: 0;
    }
    100% {
      transform: translateY(0) scale(1);
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
  padding: 20px 20px;
  /* align-items: center; */
  justify-content: stretch;
  background: #E7F5FD;

`

const StyledNameInput = styled.input`
  padding: 12px;
  font-family: 'Merriweather', serif;
  border: 2px solid #d6dfe3;
  border-radius: 3px;
  font-size: 14px;
  flex: 1;
  max-width: 300px;

  &:placeholder-shown {
    border: 2px solid #d6dfe3;
  }

  &:not(placeholder-shown) {
    border: 2px solid #56aade;
  }

  &:active, &:focus {
    border: 2px solid #56aade;
    outline: 0;
  }

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
  margin: 0 10px 20px 0px;
  color: #888;
  padding: 5px 20px;
  border-radius: 30px;
  /* border: 2px solid #d6dfe3; */
  font-family: 'Open Sans', sans-serif;
  float: right;

  &:hover {
    opacity: 0.8;
    /* background: #fc5c65; */
    /* border: 2px solid #fc5c65; */
    color: #444;
  }

  i {
    font-size: 20px;
    /* margin-right: 10px; */
    font-weight: 400;

  }
`

const StyledTextArea = styled.textarea`
  min-height: 120px;
  height: auto;
  flex: 1;
  max-height: 600px;
  margin: 20px 20px 20px 20px;
  border-radius: 3px;
  outline: 0;
  border: 2px solid #d6dfe3;
  padding: 12px;
  font-size: 1em;
  font-family: 'Merriweather', serif;
  line-height: 1.5em;
  resize: none;
  background: rgba(255,255,255,0.8);

  &:hover {
    background: rgba(255,255,255,0.9);
  }

  &:active, &:focus {
    border: 2px solid #56aade;
    outline: 0;
    background: rgba(255,255,255,1);
  }
`

const StyledSendButton = styled.button`
  background: #56aade;
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
  display: flex;
  flex: 0;
  align-items: flex-end;
  color: #a1abb1;
  font-size: 0.7em;
  font-family: 'Open Sans', sans-serif;
  padding: 10px 20px;
  line-height: 14px;
`

const StyledMail = styled('div') <{ isSent: boolean }>`
  display: ${({ isSent }) => isSent ? 'block' : 'none'} ;
  width: 300px;
  height: 200px;
  background: #ff8789;
  position: relative;
  transform-style: preserve-3d;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  z-index: 4;
  animation: ${({ isSent }) => isSent ? 'flyRight 2000ms ease forwards' : 'none'};


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

const StyledReceipient = styled('div') <{ color: string; isLoadingReceipient: boolean; }>`
  padding: 10px 20px;
  font-size: 14px;
  display: flex;
  flex-flow: row nowrap;
  /* background: #FFF; */


  .profile {
    flex: 1;
    display: flex;
    padding: 10px;
    border: 2px solid #56aade;
    border-color: ${({ isLoadingReceipient, color }) => isLoadingReceipient ? '#d3d3d3' : color};
    border-radius: 3px;
    max-width: 300px;
    background: #FFF;

  
    .icon {
      border-radius: 100%;
      width: 36px;
      height: 36px;
      background-color: #d3d3d3;
      background-color: ${({ color }) => color};
      color: #FFF;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      font-size: 18px;
    }

    .profile-content {
      flex: 1;

      .name {
        color: #444;
        display: block;
        font-weight: bold;
        line-height: 18px;
      }

      .account-type {
        color: #666;
        color: ${({ color }) => color};
        font-weight: 600;
        font-size: 12.5px;
        text-transform: uppercase;
        letter-spacing: 0.9px;
        line-height: 18px;
        font-family: 'Open Sans', Arial, Helvetica, sans-serif;
      }
    }
  }
`