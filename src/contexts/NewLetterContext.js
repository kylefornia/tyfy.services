import React from 'react'

export const NewLetterContext = React.createContext();

const NewLetterContext = (props) => {

  const [state, useState] = React.useState({
    isNewLetter: false,
  })

  return (
    <NewLetterContext.Provider value={{ ...state }}>
      {props.children}
    </NewLetterContext.Provider>
  )
}

export default NewLetterContext
