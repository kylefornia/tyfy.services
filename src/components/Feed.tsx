import React from 'react'
import FirebaseAPI from '../services/FirebaseAPI'
import styled from 'styled-components';
import NewLetter, { Letter } from './NewLetter';
import NewLetterButton from './NewLetterButton';

interface Props {

}


const StyledFeedItem = styled.div`
  background: #FFF;
  padding: 20px;
  border-radius: 3px;
  margin: 0 auto;
  margin-bottom: 10px;
  /* width: 90%; */
  max-width: 600px;
  display: block;
  box-shadow: 0px 3px 5px rgba(0,0,0,0.1);
  will-change: transform;

  .sender {
    font-weight: bold;
    color: #45aaf2;
    margin-bottom: 10px;
    display: block;
  }

  p {
    font-family: 'Merriweather', serif;
    color: #444;
    line-height: 1.5em;
    margin: 0;
  }
`

const FeedItem = ({ name = '', message = '' }: Letter) => (
  <StyledFeedItem>
    <span className="sender">{name}</span>
    <p>{message}</p>
  </StyledFeedItem>
)

const StyledFeedContainer = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;

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
  padding-bottom: 80px;
  position: relative;
`

const StyledNewLetter = styled.div`
 margin: 0 auto;
 margin-bottom: 40px;
 text-align: center;
`

const StyledHeader = styled.h1`
  color: #FFF;
  text-align:center;
  font-size: 2em;
  font-weight: 900;
  margin-bottom: 20px;
  width: 100%;
  padding: 20px 0;
`

const Feed = (props: Props) => {

  const [feedData, setFeedData] = React.useState<[]>([])


  React.useEffect(() => {
    FirebaseAPI.getAllLetters()
      .orderBy("date", "desc")
      .onSnapshot((snap) => {
        setFeedData(snap.docs.map((doc) => doc.data()) as React.SetStateAction<[]>)
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
          <StyledHeader>Live Feed</StyledHeader>
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
