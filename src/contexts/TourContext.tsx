import React, { createContext, useContext, useState, useEffect, Component } from 'react'
import localforage from 'localforage'

interface Props {

}

export interface TourState {
  isTouring: boolean;
  tourStep: number;
  shouldTour: boolean;
}


export const TourContext = React.createContext({
  isTouring: false,
  tourStep: 0,
  shouldTour: false,
  setTourStep: (stepNum) => { },
  startTour: () => { },
  stopTour: () => { },
  setShouldTour: (val) => { },
})

export const useTour = () => {
  return useContext(TourContext)
}

const TourContextProvider = ({ children }) => {

  
  

  const [tourState, setTourState] = useState<TourState>
    (({
      isTouring: false,
      tourStep: 0,
      shouldTour: false
    }))

  function startTour() {
    setTourState({ ...tourState, isTouring: true })
  }

  function stopTour() {
    setTourState({ ...tourState, isTouring: false })
  }

  function setTourStep(stepNum) {
    setTourState(prevState => ({... prevState, tourStep: +stepNum }))
  }

  async function setShouldTour(shouldTourVal) {
    await localforage.setItem('shouldTour', shouldTourVal)
    setTourState(prevState => ({ ...prevState, shouldTour: shouldTourVal}))
  }

  useEffect(() => {
    // check if user has toured
    async function checkShouldTour() {
      
      let shouldTour:boolean | null = true
      try {
          shouldTour = await localforage.getItem('shouldTour') as boolean | null
          console.log(typeof shouldTour)
          console.log(shouldTour)
          if(shouldTour !== null && !shouldTour) {
            setShouldTour(false)
            stopTour()
          } else if(shouldTour === null || shouldTour) {
            setShouldTour(true)
            startTour()
          }

          console.log(tourState)
      } catch (error) {
        console.log(error)
      }
    }

    checkShouldTour()
  }, [])


  return (
      <TourContext.Provider value={{
        ...tourState,
        startTour: startTour,
        stopTour: stopTour,
        setTourStep: setTourStep,
        setShouldTour: setShouldTour
      }}>
        {children}
      </TourContext.Provider>
  )
}

export default TourContextProvider