import React from 'react'
import * as firebase from 'firebase/app'
import "firebase/auth"

interface Props {

}

export interface UserState {
    user?: firebase.User | undefined | null;
    isLoading?: boolean;
}

const userContext = React.createContext({
    user: undefined,
})

export const useSession = () => {
    const { user } = React.useContext(userContext)
    return user
}

export const useAuth = () => {

    const [userState, setUserState] = React.useState(() => {
        const user = firebase.auth().currentUser
        return <UserState>({ isLoading: !user, user: user })
    })

    function onChange(user: firebase.User) {
        setUserState({ isLoading: false, user: user })
        window.localStorage.setItem('user', JSON.stringify(user))

    }

    React.useEffect(() => {
        //listen for auth changes
        const unsubscribe = firebase.auth().onAuthStateChanged(onChange)
        // unsubscribe to the listener when unmounting
        return () => unsubscribe()
    }, [])

    return userState
}

export default userContext