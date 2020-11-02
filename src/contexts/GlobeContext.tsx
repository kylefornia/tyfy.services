import React, { createContext, useContext, useState, Component } from 'react'

interface Props {

}

export interface GlobeState {
  isSuspended: boolean;
  isGlobeLoaded: boolean;
}


export const GlobeContext = React.createContext({
  isSuspended: false,
  suspendGlobe: () => { },
  unsuspendGlobe: () => { },
  isGlobeLoaded: false,
})

export const useGlobe = () => {
  return useContext(GlobeContext)
}

const GlobeContextProvider = ({ children }) => {

  const [globeState, setGlobeState] = useState((
    { isSuspended: false, isGlobeLoaded: false }
  ))

  function suspendGlobe() {
    if (!globeState.isSuspended)
      setGlobeState({ ...globeState, isSuspended: true })
  }

  function unsuspendGlobe() {
    if (globeState.isSuspended)
      setGlobeState({ ...globeState, isSuspended: false })
  }

  return (
    <>
      <GlobeContext.Provider value={{
        ...globeState,
        suspendGlobe: suspendGlobe,
        unsuspendGlobe: unsuspendGlobe,
      }}>
        {children}
      </GlobeContext.Provider>
    </>
  )
}

export default GlobeContextProvider