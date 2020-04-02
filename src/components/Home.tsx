import React from 'react'
import ThanksCounter from './ThanksCounter'
import Globe from './Globe'
import NewLetterButton from './NewLetterButton';
import FirebaseAPI from '../services/FirebaseAPI';
import styled from 'styled-components';
import NewLetter, { Letter } from './NewLetter';


interface Props {

}

const StyledBottomContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  height: auto;
  z-index: 2;
  text-align: center;
  padding: 0px 0px 80px 0px;
`

const Home = (props: Props) => {

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

  const [letters, setLetters] = React.useState({
    letters: [] as firebase.firestore.DocumentData
  })

  const [letterCount, setLetterCount] = React.useState<firebase.firestore.DocumentData | number | null | undefined>(null)

  React.useEffect(() => {

    let unsubscribeLetters: () => any, unsubscribeLetterCount: () => any

    async function getData() {
      unsubscribeLetters = await FirebaseAPI.getAllLetters().onSnapshot((snap) => {
        const lettersSnap = snap.docs.map((letter) => letter.data())
        setLetters({ letters: lettersSnap as Letter[] })
      })

      unsubscribeLetterCount = await FirebaseAPI.getLetterCount().onSnapshot((snap) => {

        setLetterCount(snap?.data()?.totalLetters as number)
      })
    }

    getData();

    return () => { unsubscribeLetterCount(); unsubscribeLetters(); }

  }, [])


  return (
    <div>
      <ThanksCounter count={letterCount || 0} />
      <Globe letters={letters.letters} />
      <StyledBottomContainer>
        <NewLetterButton
          onClick={() => setNewLetter({ ...newLetter, isNewLetter: true })}
        />
      </StyledBottomContainer>
      {
        newLetter.isNewLetter ?
          <NewLetter
            setNewLetter={setNewLetter}
            newLetter={newLetter}
          />
          : null
      }
    </div>
  )
}

export default Home
