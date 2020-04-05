import React, { Suspense, useMemo } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css';
import styled from 'styled-components';
import ThanksCounter from './components/ThanksCounter.tsx';
import NewLetter from './components/NewLetter.tsx';
import FirebaseAPI from './services/FirebaseAPI';
import BottomNavbar from './components/BottomNavbar';
// import Home from './components/Home';
// import Feed from './components/Feed';
// import Account from './components/Account';
import AuthContext, { useAuth, useSession } from './contexts/AuthContext'
import Loaders from './components/Loaders';

const Home = React.lazy(() => import('./components/Home'));
const Feed = React.lazy(() => import('./components/Feed'));
const Account = React.lazy(() => import('./components/Account'));

FirebaseAPI.init()

function App() {


  const { isLoading, user } = useAuth()

  const authProviderValue = useMemo(() => ({ isLoading, user }), [isLoading, user])

  return (
    <div className="App">
      <AuthContext.Provider value={authProviderValue} >
        <Router>
          <Switch>
            <Route path="/" exact render={() =>
              <Suspense fallback={<Loaders.HomeLoader />}>
                <Home />
              </Suspense>
            } />
            <Route path="/feed" render={() =>
              <Suspense fallback={<Loaders.FeedLoader />}>
                <Feed />
              </Suspense>
            } />
            <Route path="/account" render={() =>
              <Suspense fallback={<Loaders.AccountLoader />}>
                <Account />
              </Suspense>
            } />
          </Switch>
          <BottomNavbar />
        </Router>
      </AuthContext.Provider>


    </div>
  );
}

export default App;
