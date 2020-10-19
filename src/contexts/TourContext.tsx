import React, { createContext, useContext, useState, Component } from 'react'

interface Props {

}

export interface TourState {
  isTouring: boolean;
  tourStep: number;
}


export const TourContext = React.createContext({
  isTouring: false,
  tourStep: 0,
  setTourStep: (stepNum) => { },
  startTour: () => { },
  stopTour: () => { },
})

export const useTour = () => {
  return useContext(TourContext)
}

const TourContextProvider = ({ children }) => {

  const [tourState, setTourState] = useState<TourState>
    (({
      isTouring: false,
      tourStep: 0
    }))

  function startTour() {
    setTourState({ ...tourState, isTouring: true })
  }

  function stopTour() {
    setTourState({ ...tourState, isTouring: false })
  }

  function setTourStep(stepNum) {
    setTourState({ ...tourState, tourStep: +stepNum })
  }

  return (
    <>
      <TourContext.Provider value={{
        ...tourState,
        startTour: startTour,
        stopTour: stopTour,
        setTourStep: setTourStep
      }}>
        {children}
      </TourContext.Provider>
    </>
  )
}

export default TourContextProvider