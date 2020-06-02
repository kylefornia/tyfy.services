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
    console.log(props);
    // const location = useLocation();
    props.history && props.history.goBack();
  }

  React.useEffect(() => {
    getLetter()
  }, [])

  return (
    <LetterContainer>

      {
        letterData.loading ?
          <Loaders.AccountLoader />
          :
          <>
            {/* <Toolbar>
              <button className="back-button">
                <i className="ri-arrow-left-line" /> Back
            </button>
            </Toolbar> */}
            <LetterContentContainer>
              <LetterContent>
                <div className="letter-header">
                  <Toolbar>
                    <button onClick={goBack} className="back-button">
                      <i className="ri-arrow-left-line" /> Back
                  </button>
                  </Toolbar>
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


                <p className="letter-message">
                  {letterData.letter.message}
                </p>
                <span className="date">{moment(letterData.letter.date.toDate()).fromNow()}</span>

              </LetterContent>
            </LetterContentContainer>
          </>
      }
    </LetterContainer>
  )
}

export default withRouter(ViewLetter)

const LetterContainer = styled.div`
  display: flex;
  /* align-items: stretch; */
  /* justify-content: center; */
  flex: 1;
  height: calc(100% - 60px);
  flex-flow: column nowrap;

  /* margin-bottom: 70px; */

  .letter-header {
    background: #e7f5fd;
    padding: 20px 0 0px 0;
    border-radius: 5px 5px 0 0;
  }

`;


const LetterContent = styled.div`
  background: #FFF;
  padding: 0 0px;
  /* width: calc(100% - 60px); */
  /* max-width: 468px; */
  width: 100%;
  margin: 0 auto;
  border-radius: 5px;
  /* margin-bottom: 60px; */
  /* overflow: auto; */
  max-height: calc(100% - 90px);
  flex: 1;


  box-shadow: 0px 5px 10px rgba(0,0,0,0.1);

  .date {
    font-size: 0.7em;
    color: #888;
    text-align: right;
    display: block;
    /* margin-bottom: 20px; */
    text-transform: uppercase;
    padding: 20px 20px;
    font-weight: bold;
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
      /* border: 2px solid #f8f8f8; */
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
          /* padding: 10px; */
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


  .letter-message {
    min-height: 200px;
    line-height: 1.8em;
    font-size: 1em;
    padding: 20px;
    font-family: 'Merriweather', 'Times New Roman', Times, serif;
  }

`;

const Toolbar = styled.div`
  padding: 0 0 40px 16px;
  display: flex;
  /* margin-left: 16px; */
  /* margin-bottom: 10px; */
  /* width: calc(100% - 60px); */
  /* max-width: 468px; */
  /* margin: 0 auto; */
  /* margin-top: 40px; */

  @media only screen and (max-width: 500px) {
    padding-bottom: 20px;
  }


  

  .back-button {
    padding: 8px 20px;
    /* border: 2px solid #e7f5fd; */
    border: 0;
    background: rgba(255,255,255,0.9);
    border-radius: 5px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    color: #666;
    font-weight: 900;
    font-family: 'Open Sans', Arial, Helvetica, sans-serif;
    font-size: 0.8em;
    /* box-shadow: 0px 5px 10px rgba(0,0,0,0.1); */


    i {
      font-size: 18px;
      margin-right: 16px;
    }
  }
`;

const LetterContentContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: calc(100% - 20px);
  overflow-x: hidden;
  max-width: 468px;
  margin: 0 auto;
`;