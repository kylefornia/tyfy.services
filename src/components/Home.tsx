import React, { Suspense } from 'react'
import ThanksCounter from './ThanksCounter'
// import Globe from './Globe'
import NewLetterButton from './NewLetterButton';
import FirebaseAPI from '../services/FirebaseAPI';
import styled from 'styled-components';
import NewLetter, { Letter } from './NewLetter';
import HomeHeader from './HomeHeader';
import GlobeContextProvider from '../contexts/GlobeContext';
import { TourContext } from '../contexts/TourContext';
// import CheerButton from './CheerButton';


const CheerButton = React.lazy(() => import('./CheerButton'))
const Globe = React.lazy(() => import('./Globe'))

interface Props {

}




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
    letters: [] as firebase.firestore.DocumentData,
    isLettersLoading: true,
  })

  const [letterCount, setLetterCount] = React.useState<firebase.firestore.DocumentData | number | null | undefined>(null)

  let unsubscribeLetters: () => any = () => undefined, unsubscribeLetterCount: () => any = () => undefined

  React.useEffect(() => {


    async function getData() {
      unsubscribeLetters = await FirebaseAPI.getAllLetters().onSnapshot((snap) => {
        const lettersSnap = snap.docs.map((letter) => letter.data())
        setLetters({ letters: lettersSnap as Letter[], isLettersLoading: false })
      })

      unsubscribeLetterCount = await FirebaseAPI.getLetterCount().onSnapshot((snap) => {

        setLetterCount(snap?.data()?.totalLetters as number)
      })
    }

    getData();

    return () => { unsubscribeLetterCount(); unsubscribeLetters(); }

  }, [])


  return (
    <GlobeContextProvider>
      <StyledHomeContainer>
        <HomeHeader onClick={() => setNewLetter({ ...newLetter, isNewLetter: true })} />
        {
          letters.isLettersLoading ?

            <StyledLoadingContainer>
              <i className="ri-earth-fill"></i>
            Loading World...
          </StyledLoadingContainer>
            :
            <Suspense fallback={
              <StyledLoadingContainer>
                <i className="ri-earth-fill"></i>
            Loading World...
          </StyledLoadingContainer>
            }>
              <Globe letters={letters.letters} />
            </Suspense>
        }

        <StyledBottomContainer>

          <Suspense fallback={
            <div style={{ height: 80, width: 80, borderRadius: '100%', background: '#FFF', margin: '0 auto' }} />
          }>
            <CheerButton />
          </Suspense>
        </StyledBottomContainer>
        {
          newLetter.isNewLetter ?
            <NewLetter
              setNewLetter={setNewLetter}
              newLetter={newLetter}
            />
            : null
        }
      </StyledHomeContainer>

    </GlobeContextProvider >
  )
}

export default Home

const StyledBottomContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  height: auto;
  z-index: 2;
  text-align: center;
  padding: 0px 0px 70px 0px;
  
  @media only screen and (min-width: 500px) {
    padding-bottom: 0px;
  }

`

const StyledLoadingContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.8);
  flex-flow: column nowrap;
  position: absolute;
  height: calc(100% - 60px);
  width: 100%;
  top: 0;
  left: 0;
  right:0;
  bottom: 0;
  overflow: hidden;


  i {
    float: none;
    display: block;
    font-size: 4em;
    margin-bottom: 10px;
  }

`

const StyledHomeContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  flex-flow: column nowrap;
  overflow: hidden;
  position: relative;
`
const StyledTopContainer = styled.div`
  z-index: 2;
  width: 100%;
  margin-top: 2vh;
  text-align: center;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-size: 14px;


  p {
    padding: 10px 40px 0px 40px;
    line-height: 18px;
    color: rgba(255,255,255,0.9);

    b {
      font-weight: bold;
      color: rgba(255,255,255, 1);
    }

  }

  h2 {
    color: #FFF;
    font-family: 'Merriweather', 'Times New Roman', Times, serif;
    margin-top: 20px;
    margin-bottom: 24px;
    font-size: 1.6em;
    font-weight: 800;
    line-height: 1.25em;
  }

`