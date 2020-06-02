import React from 'react'
import * as firebase from 'firebase/app'
import "firebase/auth"
import { UserLocation } from '../services/IPLocationAPI'
import { AccountType } from '../components/AccountTypes'

interface Props {

}

export interface UserProfile {
    email: string;
    name: string;
    photoURL: string;
    accountType?: string;
    uid: string;
    location?: UserLocation
}

export interface UserState {
    user?: firebase.User | undefined | null;
    isLoading?: boolean;
    userProfile?: UserProfile | any;
}



const userContext = React.createContext({
    user: undefined,
    userProfile: {},
    isLoading: true,
})

export const useSession = () => {
    const { user } = React.useContext(userContext)
    return user
}

export const useAuth = () => {

    const [userState, setUserState] = React.useState(() => {
        const user = firebase.auth().currentUser
        return <UserState>({ isLoading: !user, user: user, userProfile: {} })
    })

    async function onChange(user: firebase.User) {
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