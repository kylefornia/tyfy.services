import React from 'react';
import logo from './logo.svg';
import './App.css';
import Globe from './components/Globe.tsx';
import styled from 'styled-components';
import NewLetterButton from './components/NewLetterButton.tsx';
import ThanksCounter from './components/ThanksCounter.tsx';
import NewLetter from './components/NewLetter.tsx';

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

  return (
    <div className="App">
      <ThanksCounter count={1000} />
      <Globe />
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
