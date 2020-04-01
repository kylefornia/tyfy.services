import React from 'react';
import logo from './logo.svg';
import './App.css';
import Globe from './components/Globe.tsx';
import styled from 'styled-components';
import NewLetterButton from './components/NewLetterButton.tsx';
import ThanksCounter from './components/ThanksCounter.tsx';
import NewLetter from './components/NewLetter.tsx';
import FirebaseAPI from './services/FirebaseAPI.ts';

const StyledBottomContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  height: auto;
  z-index: 2;
  text-align: center;
  padding: 0px 0px 60px 0px;
`
function App() {

  const [newLetter, setNewLetter] = React.useState({
    isNewLetter: false,
    name: '',
    message: '',
  })

  const [letters, setLetters] = React.useState({
    letters: []
  })

  React.useEffect(() => {

    async function initData() {
      await FirebaseAPI.init()

      FirebaseAPI.getAllLetters().onSnapshot((snap) => {
        const lettersSnap = snap.docs.map((letter) => letter.data())
        setLetters({ letters: lettersSnap })
      })

      // debugger;


    }

    initData();

  }, [])

  return (
    <div className="App">
      <ThanksCounter count={1000} />
      <Globe letters={letters.letters} />
      <StyledBottomContainer>
        <NewLetterButton
          onClick={() => setNewLetter({ isNewLetter: true })}
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
  );
}

export default App;
