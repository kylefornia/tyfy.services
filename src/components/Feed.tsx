import React from 'react'
import FirebaseAPI from '../services/FirebaseAPI'
import styled from 'styled-components';
import NewLetter, { Letter } from './NewLetter';
import NewLetterButton from './NewLetterButton';
import SectionHeader from './SectionHeader';
import ReactCountryFlag from 'react-country-flag';
import { Link } from 'react-router-dom'
import moment from 'moment';
import AccountTypes from './AccountTypes';

interface Props {

}


const StyledFeedItem = styled.div`
  background: #FFF;
  border-radius: 5px;
  margin: 0 auto;
  margin-bottom: 10px;
  width: calc(100% - 20px);
  max-width: 468px;
  display: block;
  box-shadow: 0px 3px 5px rgba(0,0,0,0.1);
  will-change: transform;
  transition: box-shadow 120ms ease-out;
  border: 2px solid #e7f5fd;

  &:hover {
    box-shadow: 0px 10px 20px rgba(0,0,0,0.15);
    border: 2px solid #8db0e4;
  }

  a, a:visited {
    text-decoration: none;
    display: block;
  }

  
  .feed-header {
    padding: 16px;
    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;
    /* padding-bottom: 6px; */
    /* border-bottom: 2px solid #f8f8f8; */
    /* border: 1px solid #e8e8e8; */
    border-radius: 5px 5px 0 0;
    background: #e7f5fd;

    .middle {
      background: #FFF;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 10px;

      i {
        color: #8eb7d4;
        font-size: 1.5em;
      }
    }

    @media only screen and ( max-width: 500px) {
     display: block;
     padding: 20px;

     .user-container {
      /* background: none; */
      border-radius: 5px !important;

      .account-type, .date {
        line-height: 1em;
        margin: 0;
      }

      .label {
        display: inline-block;
        width: 40px;
      }
     }

     .sender {
       border-bottom: 2px solid #e7f5fd;
      border-radius: 5px 5px 0 0 !important;

       /* width: 100%; */
     }

     .receiver {
      border-radius: 0 0 5px 5px !important;


     }

     .middle {
      display: none;

       /* background: #FFF; */
     }
    }
  }
 

  .message {
    font-family: 'Merriweather', serif;
    color: #444;
    line-height: 1.8em;
    padding: 20px 16px;
    min-height: 80px;
    font-size: 1em;
    border-radius: 0 0 5px 5px;
  }

  

`

const StyledFeedUser = styled.div`
  /* border-radius: 10px; */
  /* padding: 5px 0; */
  /* background: #f8f8f8; */
  flex: 1;
  /* width: calc(50% - 10px); */
  height: 100%;
  display: flex;
  align-items: center;


  .user-container {
    display: flex;
    align-items: center;
    vertical-align: middle;
    padding: 8px 12px;
    background: rgba(255,255,255,0.75);
    flex: 1;
    font-family: 'Merriweather', 'Times New Roman', Times, serif;



    &.sender {

    border-radius: 5px 0 0 5px;
    /* color: #6c7496; */
    color: #444;
    }

    &.receiver {
      border-radius: 0 5px 5px 0;
      /* color: #53b556; */
      color: #444;
    }

    .label {
      display: none;
      font-size: 0.7em;
      margin-right: 10px;
      /* margin-left: 20px; */
      text-transform: uppercase;
      font-weight: bold;
      color: #888;
      /* width: 60px; */
      font-family: 'Open Sans', Arial, Helvetica, sans-serif;
    }

    .two-line-container {
      flex: 1;
      display: flex;
      flex-flow: column nowrap;

      .container-line {
        align-items: center;
        display: flex;
        line-height: 1.2em;
        align-items: center;
        
        &:last-of-type {
          margin-top: 5px;
        }
      }
      
    }

    .account-type {
      display: flex;
      flex-flow: row nowrap;
      font-family: 'Open Sans', Arial, Helvetica, sans-serif;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 12px;
      letter-spacing: 1px;
      line-height: 1.4em !important;
      
      i {
        font-weight: normal;
        /* background: #e7f5fd; */
        /* border-radius: 100%; */
        font-size: 16px;
        /* width: 28px; */
        /* height: 28px; */
        display: flex;
        align-items: center;
        justify-content: center;
        /* flex: 0; */
        margin-right: 10px;
      }
    }

    .date {
      font-size: 12px;
      color: #aaa;
      line-height: 1.4em;
      /* text-align: right; */
      font-family: 'Open Sans', Arial, Helvetica, sans-serif;
      /* margin-bottom: 20px; */
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 1px;
      /* padding: 20px 20px; */
    }
  }

  

  i {
    display: inline-block;
    font-size: 16px;
    /* height: 24px; */
    /* width: 24px; */
    margin: 0 ;
  }

  .name {
    font-weight: 600;
    /* margin-bottom: 10px; */
    display: inline-block;
    flex: 1;
    font-size: 0.9em;
    line-height: 1.2em;
    margin: 0;
  }

  .user-icon {
    margin: 0;
    margin-right: 10px;
    display: inline-block;
    height: 23px;

    img {
      margin: 0 auto;
      width: auto !important;
      height: 14px !important;
    }
  }
 
  
`;


const FeedItem = (Letter: Letter) => {

  const receipientType = (!!Letter.receipient?.accountType ? AccountTypes.filter(({ type }) =>
    Letter.receipient?.accountType == type)[0] : undefined)


  return (
    <StyledFeedItem>
      <Link to={`/letter/${Letter.id}`}>
        <div className="feed-header">
          <StyledFeedUser>
            <div className="user-container sender">
              <span className="label">FROM: </span>
              <div className="two-line-container">
                <div className="container-line">

                  <div className="user-icon">
                    <ReactCountryFlag svg countryCode={Letter.location.country_code} />
                  </div>

                  <span className="name">{Letter.name}</span>
                </div>
                <div className="container-line">
                  <span className="date">{moment(Letter.date.toDate()).fromNow()}</span>
                </div>
              </div>
            </div>
          </StyledFeedUser>
          <div className="middle">
            <i className="ri-arrow-right-line"></i>
          </div>
          <StyledFeedUser>
            <div className="user-container receiver">
              <span className="label">TO: </span>
              <div className="two-line-container">
                <div className="container-line">

                  <div className="user-icon">
                    {
                      !!Letter.receipient ?
                        <ReactCountryFlag svg countryCode={Letter.receipient?.location.country_code} />
                        :
                        <i className="ri-eye-off-line"></i>
                    }
                  </div>
                  <span className="name">{Letter.receipient?.name || 'Private Receipient'}</span>
                </div>

                <div className="container-line account-type" style={{
                  color: !!receipientType ? receipientType.color : '#888',
                }}>
                  <i className={!!receipientType ? receipientType.iconClassName : ''} />
                  {Letter.receipient?.accountType} &nbsp;
                </div>


              </div>
            </div>
          </StyledFeedUser>
        </div>


        <p className="message">{Letter.message}</p>


      </Link>
    </StyledFeedItem >
  )
}

const StyledFeedContainer = styled.div`
  /* padding: 20px; */
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  padding-bottom: 80px;

`

const StyledNewLetterButtonContainer = styled.div`
  /* position: absolute; */
  /* bottom: 80px; */
  /* left: 0; */
  /* right: 0; */
  /* z-index: 2; */
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
  width: auto;
  display: block;
`

const StyledFeedWrapper = styled.div`
  /* display: flex; */
  /* flex-flow: column nowrap; */
  height: 100%;
  /* min-height: calc(100vh - 80px); */
  /* margin-bottom: 80px; */
  /* overflow: hidden; */
  -webkit-overflow-scrolling: touch;
  position: relative;
`

const StyledNewLetter = styled.div`
 margin: 0 auto;
 margin-bottom: 40px;
 text-align: center;
`
const Feed = (props: Props) => {

  const [feedData, setFeedData] = React.useState<[]>([])


  React.useEffect(() => {
    FirebaseAPI.getAllLetters()
      .orderBy("date", "desc")
      .onSnapshot((snap) => {
        setFeedData(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as React.SetStateAction<[]>)
      })
  }, [])

  const [newLetter, setNewLetter] = React.useState<Letter>({
    isNewLetter: false,
    name: '',
    message: '',
    location: {
      lat: 0,
      lon: 0,
      country_name: '',
      country_code: '',
      city: '',
      region: '',
    },
  })

  return (
    <>
      <StyledFeedWrapper>
        <StyledFeedContainer>
          <SectionHeader title="Live Feed" />
          <StyledNewLetter>
            <NewLetterButton
              onClick={() => setNewLetter({ ...newLetter, isNewLetter: true })}
            />
          </StyledNewLetter>
          {
            feedData.map((letter, i) => (
              <FeedItem key={i} {...letter} />
            ))
          }
        </StyledFeedContainer>

      </StyledFeedWrapper>
      {
        newLetter.isNewLetter ?
          <NewLetter
            setNewLetter={setNewLetter}
            newLetter={newLetter}
          />
          : null
      }
    </>
  )
}

export default Feed
