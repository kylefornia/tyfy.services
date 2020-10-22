import React, { Suspense, useMemo } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css';
import styled from 'styled-components';
import ThanksCounter from './components/ThanksCounter.tsx';
import NewLetter from './components/NewLetter.tsx';
import FirebaseAPI from './services/FirebaseAPI';
import BottomNavbar from './components/BottomNavbar';
import TopNav from './components/TopNav';
// import Home from './components/Home';
// import Feed from './components/Feed';
// import Account from './components/Account';
import AuthContext, { useAuth, useSession } from './contexts/AuthContext'
import Loaders from './components/Loaders';
import ViewLetter from './components/ViewLetter';
import PrivacyPolicy from './components/PrivacyPolicy';
import TourContextProvider, { TourContext } from './contexts/TourContext';
import GlobeContextProvider from './contexts/GlobeContext';

const Home = React.lazy(() => import('./components/Home'));
const Feed = React.lazy(() => import('./components/Feed'));
const Account = React.lazy(() => import('./components/Account'));
const More = React.lazy(() => import('./components/More'));
const Tour = React.lazy(() => import('./components/Tour'));


FirebaseAPI.init()

function App() {


  const { isLoading, user, userProfile } = useAuth()

  const authProviderValue = useMemo(() => ({ isLoading, user, userProfile }), [isLoading, user, userProfile])

  window.isMobile = window.innerWidth < 500

  return (
    <div className="App">
      <AuthContext.Provider value={authProviderValue} >
        <GlobeContextProvider>
        <TourContextProvider>
        <Router>
          {
            !window.isMobile && (
              <TopNav />
            )
          }
          <div className="App-content">
            <Switch>
             
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
              <Route path="/more" render={() =>
                <Suspense fallback={<Loaders.AccountLoader />}>
                  <More />
                </Suspense>
              } />
              <Route path="/letter/:id" render={() =>
                <Suspense fallback={<Loaders.AccountLoader />}>
                  <ViewLetter />
                </Suspense>
              } />
              <Route path="/privacy" render={() =>
                <Suspense fallback={<Loaders.AccountLoader />}>
                  <PrivacyPolicy />
                </Suspense>
              } />
               <Route path="/" render={() =>
                <Suspense fallback={<Loaders.HomeLoader />}>
                  <Home />
                </Suspense>
              } />
            </Switch>
            {
              window.isMobile && (
                <BottomNavbar />
              )
            }
              <TourContext.Consumer>
              {({ isTouring, startTour, stopTour, setShouldTour }) => (
                  <Suspense fallback=''>
                    <Tour 
                      isTouring={isTouring}
                      startTour={startTour}
                      stopTour={stopTour}
                      setShouldTour={setShouldTour}
                    />
                  </Suspense>
              )}
            </TourContext.Consumer>
          </div>
        </Router>
        </TourContextProvider>
            </GlobeContextProvider>
      </AuthContext.Provider>


    </div>
  );
}

export default App;
