import React, { useCallback } from 'react'
import * as firebase from 'firebase/app'
import styled from 'styled-components';
import { BrowserRouter as Router, useParams, useLocation, withRouter, RouteComponentProps } from 'react-router-dom'
import Loaders from './Loaders';
import { Letter } from './NewLetter';
import moment from 'moment';
import ReactCountryFlag from 'react-country-flag';


interface Props {
  history: RouteComponentProps;
}

const ViewLetter = (props: Props) => {

  const { id } = useParams();

  const [letterData, setLetterData] = React.useState<{
    letter: Letter;
    loading: boolean;
    letterId: string;
  }>({
    letter: {
      name: '',
      message: '',
    },
    loading: true,
    letterId: id,
  })

  const [isOpened, setIsOpened] = React.useState<Boolean>(false);


  const getLetter = useCallback(
    () => {
      firebase.firestore().collection('letters').doc(id).get().then((snap) => {
        setLetterData({
          letterId: id,
          letter: snap.data() as Letter,
          loading: false,
        })
      })
    },
    [id],
  )

  function goBack() {
    props.history && props.history.goBack();
  }


  React.useEffect(() => {
    getLetter()
    setTimeout(() => {
      setIsOpened(true)
    }, 1000)
  }, [getLetter])

  if(!letterData.loading && !letterData?.letter) {
    return (
      <LetterContainer isOpened={isOpened}>
        <LetterContentContainer>
          <LetterContent isOpened={isOpened}>
          <div className="letter-header">
          <Toolbar>
                <button onClick={goBack} className="back-button">
                  <i className="ri-arrow-left-line" /> Back
                  </button>
              </Toolbar>
              </div>
            <div className="letter-message-container error">
              <i className="ri-file-shred-line"></i>
              This letter might have been shredded
              </div>
          </LetterContent>
        </LetterContentContainer>
      </LetterContainer>
    )
  }

  return (
    <LetterContainer isOpened={isOpened}>

      {
        letterData.loading ?
          <Loaders.ViewLetterLoader />
          :
          <>
            {/* <Toolbar>
              <button className="back-button">
                <i className="ri-arrow-left-line" /> Back
            </button>
            </Toolbar> */}
            <LetterContentContainer>
              {/* <Toolbar>
                <button onClick={goBack} className="back-button">
                  <i className="ri-arrow-left-line" /> Back
                  </button>
              </Toolbar> */}
              <LetterContent isOpened={isOpened}>
                <div className="letter-header">

                  <div className="from-container">
                    <span className="label">From: </span>
                    <div className="from-profile">
                      <div className="from-flag">
                        {
                          !!letterData.letter?.location && !!letterData.letter?.location?.country_code ?
                            <ReactCountryFlag svg countryCode={letterData.letter?.location?.country_code} />
                            :
                            <i className="ri-earth-fill"></i>
                        }
                      </div>
                      <div className="from-profile-content">
                        <span className="name">{letterData.letter.name}</span>

                        {
                          !!letterData.letter?.location && !!letterData.letter?.location?.country_code &&
                          (<span className="location-text">{letterData.letter.location.city}, {letterData.letter.location.country_name}</span>)
                        }
                      </div>
                    </div>

                  </div>
                  {
                    !!letterData.letter.receipient ?
                      (
                        <div className="to-container">
                          <span className="label">To: </span>
                          <div className="from-profile">
                            <div className="from-flag">
                              {
                                !!letterData.letter.receipient?.location && !!letterData.letter.receipient?.location?.country_code ?
                                  <ReactCountryFlag svg countryCode={letterData.letter.receipient?.location.country_code} />
                                  :
                                  <i className="ri-earth-fill"></i>
                              }
                            </div>
                            <div className="from-profile-content">
                              <span className="name">{letterData.letter.receipient?.name}</span>

                              {
                                !!letterData.letter.receipient?.location && !!letterData.letter.receipient?.location?.country_code &&
                                (<span className="location-text">{letterData.letter.receipient?.location.city}, {letterData.letter.receipient?.location.country_name}</span>)
                              }
                            </div>
                          </div>

                        </div>
                      ) : null

                  }
                </div>

                <div className="letter-message-container">

                  <p className="letter-message">
                    {letterData.letter.message}
                  </p>
                  <span className="date">{moment(letterData.letter.date.toDate()).fromNow()}</span>
                </div>

              </LetterContent>
            </LetterContentContainer>
          </>
      }
    </LetterContainer>
  )
}

export default withRouter(ViewLetter)

const LetterContainer = styled('div').attrs({
  className: 'view-letter-container'
})<{ isOpened: Boolean;}>`
  display: flex;
  height: calc(100% - 72px);
  overflow: hidden;
  flex-flow: column nowrap;
  overflow-y: ${({ isOpened }) => isOpened ? 'auto' : 'hidden'};
  border-radius: 5px;

  &::-webkit-scrollbar {
    width: 1px;
    height: 0px;
  }

  }


  .letter-header {
    background: #e7f5fd;
    padding: 40px 0 0px 0;
    border-radius: 5px 5px 0 0;
    transform-origin: 50% 100%;
    animation: open-header 800ms cubic-bezier(0.075, 0.82, 0.165, 1);
    z-index: 1;

    @keyframes open-header {
      0% {
        transform: perspective(350px) rotateX(-120deg);
        filter: brightness(0.8);

      }

      100% {
        transform: perspective(250px) rotate(0deg);
        filter: brightness(1);

      }
    }
  }

 

`;


const LetterContent = styled.div<{ isOpened: Boolean;}>`
  padding: 0 0px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  height: auto;
  max-height: calc(100% - 72px);
  // overflow-y: ${({ isOpened }) => isOpened ? 'auto' : 'normal'};
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
  position: relative;
  backface-visibility: hidden;

  
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  .date {
    font-size: 0.7em;
    color: #888;
    text-align: right;
    display: block;
    text-transform: uppercase;
    padding: 20px 20px;
    font-weight: bold;
    animation: open-contents-text 800ms linear forwards;

  }

  .from-container, .to-container {
    display: flex;
    padding-bottom: 20px;

    .label {
      font-size: 14px;
      margin-right: 0px;
      margin-left: 20px;
      text-transform: uppercase;
      font-weight: bold;
      color: #888;
      width: 60px;
    }

    @media only screen and (max-width: 500px) {
      & {
        flex-flow: column nowrap;
      }

      .label {
        display: block;
        text-align: left;
        width: 100%;
        padding-left: 20px;
        margin: 0 auto;
        margin-bottom: 8px;
        font-size: 0.7em;

      }
    }

    .from-profile {
      flex: 1;
      display: flex;
      flex-flow: row nowrap;
      padding: 10px;
      border-radius: 5px;
      max-width: 300px;
      background: rgba(255,255,255,0.75);
      margin: 0 20px;


      .from-flag {
        background: #F8F8F8;
        border-radius: 100%;
        height: 36px;
        width: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;

        img {
          width: 18px !important;
          height: 18px !important;
        }
      }

      .from-profile-content {
        display: flex;
        flex-flow: column nowrap;
        flex: 1;
      }


      .name {
        font-size: 16px;
        font-weight: bold;
        line-height: 20px;
        color: #222;
        font-family: 'Merriweather', 'Times New Roman', Times, serif;
      }

      .location-text {
        line-height: 18px;
        font-weight: bold;
        letter-spacing: 1px;
        font-size: 12px;
        color: #666;
        text-transform: uppercase;
      }


    }

    


  }

  .to-container {
    /* border-bottom: 1px solid #f8f8f8; */

  }

  .letter-message-container {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    background: #fff;

    animation: open-contents 800ms cubic-bezier(0.215, 0.610, 0.355, 1) forwards;
    transform-origin: 50% 0%;
    /* transform: rotateX(180deg); */
    backface-visibility: visible;
    border-radius: 0% 0% 5px 5px;
    will-change: transform;
    z-index: 0;

    &.error {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      line-height: 2.5em;
      color: #444;

      i {
        font-size: 60px;
        // height: 60px;
        // width: 60px;
        color: #56aade;
        line-height: normal;
      }
    }


    @keyframes open-contents {
      0% {
        transform: rotateX(-135deg);    
        filter: brightness(0.6);
        opacity: 0;
      }

      30% {
        opacity: 1;
      }

      100% {
        transform: rotateX(0deg);
        filter: brightness(1);
        opacity: 1;
      }
  }




  .letter-message {
    min-height: 200px;
    line-height: 1.8em;
    font-size: 1em;
    padding: 20px;
    font-family: 'Merriweather', 'Times New Roman', Times, serif;
    flex: 1;
    opacity: 1;
    animation: open-contents-text 400ms linear forwards;
    /* max-height: 250px; */
    overflow-y: auto;

    


    @keyframes open-contents-text {
      0% {
        opacity: 0;
      }

      20% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
  }

    
    }
    
  }

  animation: open-container 500ms ease;
  @keyframes open-container {
      /* 0% {
        background: transparent;
        box-shadow: 0px 5px 20px rgba(0,0,0,0);

      }

      90% {
        background: transparent;
        box-shadow: 0px 5px 20px rgba(0,0,0,0.1);

      }

      100% {
        background: #FFF;
        box-shadow: 0px 5px 20px rgba(0,0,0,0.1);

      } */
    }

  

`;

const Toolbar = styled.div`
  padding: 0px 20px 20px 20px;
  display: flex;
  justify-content: flex-start;
  width: 100%;


  @media only screen and (max-width: 500px) {
    /* padding-bottom: 20px; */
  }


  

  .back-button {
    padding: 8px 20px;
    border: 2px solid #FFF;
    background: rgba(255,255,255,0.9);
    border-radius: 5px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    color: #666;
    font-weight: 900;
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
    font-size: 0.8em;



    i {
      font-size: 18px;
      margin-right: 16px;
    }

    &:hover {
      border: 2px solid #57DECE;
      cursor: pointer;
    }
  }
`;

const LetterContentContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: calc(100% - 20px);
  position: relative;
  /* overflow-x: hidden; */
  max-width: 468px;
  margin: 0 auto;
  flex-flow: column nowrap;
  /* animation: open-content 500ms ease; */
  transform-origin: 50% 50%;
  /* background: #FFF; */


animation: open-letter 800ms cubic-bezier(0.175, 0.685, 0.32, 1.275);
  @keyframes open-letter {
    0% {
      transform: scale(0.25);
    }

    45% {
      transform: scale(1.25);

    }

    100% {
      transform: scale(1);
    }
  }

  
`;