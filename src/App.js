import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css';
import Globe from './components/Globe.tsx';
import styled from 'styled-components';
import ThanksCounter from './components/ThanksCounter.tsx';
import NewLetter from './components/NewLetter.tsx';
import FirebaseAPI from './services/FirebaseAPI';
import BottomNavbar from './components/BottomNavbar';
import Home from './components/Home';
import Feed from './components/Feed';
import Account from './components/Account';
import AuthContext, { useAuth, useSession } from './contexts/AuthContext'


function App() {

  FirebaseAPI.init()

  // const providerValue = React.useMemo(() => ({intializing, user}), [input])

  const { initializing, user } = useAuth()

  console.log(initializing)


  return (
    <div className="App">
      <AuthContext.Provider value={{ initializing, user }} >
        <Router>
          <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/feed" render={() => <Feed />} />
            <Route path="/account" render={() => 
                <Account />
              } />
          </Switch>
          <BottomNavbar />
        </Router>
      </AuthContext.Provider>

    </div>
  );
}

export default App;
