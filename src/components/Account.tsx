import React from 'react'
import AuthContext from '../contexts/AuthContext'

interface Props {

}

const Account = (props: Props) => {

  console.log(props)
  return (
    <div>
      <AuthContext.Consumer>
        {
          (user) => (
            <div>{JSON.stringify(user)}</div>
          )
        }
      </AuthContext.Consumer>
      Coming Soon
    </div>
  )
}

export default Account
