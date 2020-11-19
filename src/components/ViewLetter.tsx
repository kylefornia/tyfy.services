import React from 'react'
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


  function getLetter() {
    firebase.firestore().collection('letters').doc(id).get().then((snap) => {
      setLetterData({
        letterId: id,
        letter: snap.data() as Letter,
        loading: false,
      })
    })
  }

  function goBack() {
    props.history && props.history.goBack();
  }

  React.useEffect(() => {
    getLetter()
  }, [])

  return (
    <LetterContainer>

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
              <LetterContent>
                {/* <div className="paper"></div> */}
                <div className="letter-header">

                  <div className="from-container">
                    <span className="label">From: </span>
                    <div className="from-profile">
                      <div className="from-flag">
                        <ReactCountryFlag svg countryCode={letterData.letter.location.country_code} />
                      </div>
                      <div className="from-profile-content">
                        <span className="name">{letterData.letter.name}</span>

                        {
                          !!letterData.letter.location &&
                          <span className="location-text">{letterData.letter.location.city}, {letterData.letter.location.country_name}</span>
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
                              <ReactCountryFlag svg countryCode={letterData.letter.receipient?.location?.country_code} />
                            </div>
                            <div className="from-profile-content">
                              <span className="name">{letterData.letter.receipient?.name}</span>

                              {
                                !!letterData.letter.receipient.location &&
                                <span className="location-text">{letterData.letter.receipient?.location.city}, {letterData.letter.receipient?.location.country_name}</span>
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
})`
  display: flex;
  height: calc(100% - 60px);
  overflow: hidden;
  flex-flow: column nowrap;

  }


  .letter-header {
    background: #e7f5fd;
    padding: 40px 0 0px 0;
    border-radius: 5px 5px 0 0;
    transform-origin: 50% 100%;
    animation: open-header 800ms ease;

    @keyframes open-header {
      0% {
        transform: perspective(350px) rotateX(-120deg);
      }

      100% {
        transform: perspective(250px) rotate(0deg);
      }
    }
  }

 

`;


const LetterContent = styled.div`
  padding: 0 0px;
  width: 100%;
  margin: 0 auto;
  height: calc(100% - 60px);
  max-height: 605px;
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
  position: relative;
  backface-visibility: hidden;

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

    animation: open-contents 800ms ease-out forwards;
    transform-origin: 50% 0%;
    /* transform: rotateX(180deg); */
    backface-visibility: visible;
    border-radius: 0% 0% 5px 5px;
    


    @keyframes open-contents {
      0% {
        transform:  rotateX(-145deg);
      }

      20% {
        transform:  rotateX(-145deg);
      }

      100% {
        transform:  rotateX(0deg);
      }
  }




  .letter-message {
    min-height: 200px;
    line-height: 1.8em;
    font-size: 1em;
    padding: 20px;
    font-family: 'Merriweather', 'Times New Roman', Times, serif;
    flex: 1;

    animation: open-contents-text 800ms linear forwards;


    @keyframes open-contents-text {
      0% {
        opacity: 0;
      }

      50% {
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
  padding: 10px 0 10px 0px;
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


  @keyframes open-content {
      0% {
        opacity: 0;
        /* transform: perspective(350px) rotateX(-180deg); */

      }

      80% {
        /* opacity: 0; */
        /* transform: perspective(-350px) rotateX(-90deg); */
      }

      100% {
        opacity: 1;
        /* transform: perspective(250px) rotate(0deg); */
        
      }
    }

  .paper {
    /* background-color: #eee; */
    background-image: -webkit-linear-gradient(hsla(0,0%,0%,.025), hsla(0,0%,100%,.05) 33%, hsla(0,0%,0%,.05) 33%, hsla(0,0%,100%,.05) 67%, hsla(0,0%,0%,.05) 67%, hsla(0,0%,100%,.025));
    box-shadow: inset 0 0 0 .1em hsla(0,0%,0%,.1),
                inset 0 0 1em hsla(0,0%,0%,.05),
                0 .1em .25em hsla(0,0%,0%,.1);
    position: absolute;
    z-index: 1;
    pointer-events: none;
    height: 100%;
    width: 100%;
    animation: open-paper 800ms linear;
    opacity: 0.75;
    /* border-radius: 5px; */


    @keyframes open-paper {
      0% {
        opacity: 0;
        /* transform: perspective(-350px) rotateX(-180deg); */

      }

     85% {
        opacity: 0;
        /* transform: perspective(-350px) rotateX(-90deg); */
      }

      100% {
        opacity: 0.75;
        /* transform: perspective(-250px) rotate(0deg); */
        
      }
    }

}

animation: open-letter 1000ms ease-out forwards;
  @keyframes open-letter {
    0% {
      transform: scale(0.2);
    }

    20% {
      transform: scale(1.2);

    }

    100% {
      transform: scale(1);
    }
  }

  
`;