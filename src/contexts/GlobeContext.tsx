import React, { createContext, useContext, useState, Component } from 'react'

interface Props {

}

export interface GlobeState {
  isSuspended: boolean;
}


export const GlobeContext = React.createContext({
  isSuspended: false,
  suspendGlobe: () => { },
  unsuspendGlobe: () => { },
})

export const useGlobe = () => {
  return useContext(GlobeContext)
}

const GlobeContextProvider = ({ children }) => {

  const [globeState, setGlobeState] = useState(({ isSuspended: false }))

  function suspendGlobe() {
    setGlobeState({ isSuspended: true })
  }

  function unsuspendGlobe() {
    setGlobeState({ isSuspended: false })
  }

  return (
    <>
      <GlobeContext.Provider value={{
        ...globeState,
        suspendGlobe: suspendGlobe,
        unsuspendGlobe: unsuspendGlobe
      }}>
        {children}
      </GlobeContext.Provider>
    </>
  )
}

export default GlobeContextProvider