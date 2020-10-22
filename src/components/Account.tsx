import React from 'react'
import styled from 'styled-components'
import AuthContext, { useAuth, useSession, UserState, UserProfile } from '../contexts/AuthContext'
import SectionHeader from './SectionHeader'
import * as firebase from 'firebase/app'
import Loaders from './Loaders'
import AccountTypeSelector from './AccountTypeSelector'
import AccountTypes, { AccountType } from './AccountTypes'
import { Letter, LetterMetadata } from './NewLetter'
import AccountLocation from './AccountLocation'
import moment from 'moment'
import { Link } from 'react-router-dom'
import AccountBio from './AccountBio'

const SignIn = React.lazy(() => import('./SignIn'));


interface Props {

}

interface AccountPageProps {
  user?: firebase.auth.UserCredential | any | undefined;
  isLoading?: boolean;
  userProfile?: UserProfile;
}


const StyledAccountContainer = styled.div`
  font-family: 'Open Sans', sans-serif;
  /* height: calc(100% - 60px); */
  height: 100%;
  flex: 1;
  font-size: 18px;
  position: relative;
  overflow-y: auto;
  display: flex;
  flex-flow: column nowrap;

`

const StyledButton = styled.button`
  display: block;
  width: calc(100% - 20px);
  max-width: 468px;
  margin: 0 auto;
  border: 0;
  background: #FFF;
  border-radius: 5px;
  text-transform: uppercase;
  font-size: 1em;
  padding: 10px 20px;
  font-weight: 800;
  font-family: 'Open Sans', sans-serif;
  font-size: 1em;
  color: #56aade;
  align-items: center;
  margin-bottom: 10px;
  letter-spacing: 1px;
  box-shadow: 0px 3px 5px rgba(0,0,0,0.1);


  .icon {
    display: inline-block;
    margin: 0;
    height: 18px;
    width: 18px;
    font-size: 1.2em;
    color: #444;
    /* border-radius: 5px 0 0 5px; */
  }

  .button-text {
    display: inline-block;
    text-align: center;
    flex: 1;
    color: #444;
  }

  &:hover {
    opacity: 0.9;
  }
`

export const StyledProfileContainer = styled('div') <{ color: string; }>`
  display: flex;
  background: #FFF;
  margin: 10px auto;
  font-family: 'Open Sans', sans-serif;
  width: calc(100% - 20px);
  max-width: 468px;
  border-radius: 5px;
  box-shadow: 0px 3px 5px rgba(0,0,0,0.1);
  flex-flow: column nowrap;


  .profile {
    display: flex;
    /* border-bottom: 1px solid #f0f0f0; */
  }

  .profile-image-container {
    position: relative;

    img {
      margin: 10px 15px 10px 15px;
      height: 54px;
      width: 54px;
      display: inline-block;
      border-radius: 100%;
      object-fit: cover;
      background: #d5d5d5;
    }
    
    i {
      position: absolute;
      height: 24px;
      width: 24px;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFF;
      top: 10px;
      right: 10px;
      border-radius: 100%;
      background-color: ${({ color }) => color};
      /* border: 1px solid #FFF; */
    }
  }

  

  .profile-details {
    flex: 1;
    padding: 10px 15px 10px 0px;
    font-size: 14px;
    font-weight: 400;
    color: #aaa;
    /* line-height: 22px; */
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-start;
    /* height: 100%; */

    .name {
      font-weight: bold;
      color: #444;
      font-size: 16px;
      font-family: 'Merriweather', 'Times New Roman', Times, serif;
      line-height: 22px;
    }

    .account-type {
      color: #45aaf2;
      color: ${({ color }) => color};
      font-weight: 600;
      font-size: 12.5px;
      text-transform: uppercase;
      letter-spacing: 0.9px;
      line-height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;    
      
    }
  }

`
const StyledContentContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  width: calc(100% - 20px); 
  margin: 0 auto;
  margin-bottom: 10px;
  flex-flow: column nowrap;
  justify-content: center;
`
const StyledLettersContainer = styled.div`
  background: #FFF;
  max-width: 468px;
  border-radius: 5px;
  box-shadow: 0px 3px 5px rgba(0,0,0,0.1);
  flex: 1;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;

  .letters-header {
    border-radius: 5px 5px 0 0;
    text-align: left;
    padding: 20px 20px;
    /* font-family: 'Merriweather', 'Times New Roman', Times, serif; */
    color: #666;
    font-weight: 600;
    /* border-bottom: 2px solid #f0f0f0; */
    background: #e7f5fd;
  }
`

const StyledSelectorContainer = styled.div`
  display: flex;
  position: relative;
  overflow-x: auto;


  .label {
    display: inline-block;
    font-size: 14px;
    padding: 16px;
    color: #666;
  }

  ul {
    display: flex;
    flex-flow: row nowrap;
    flex: 1;
  }

  li {
    flex: 1;
    display: flex;
    font-size: 12px;
    text-align: center;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 8px 12px;
    line-height: 1.2em;
    font-weight: 600;
    color: #aaa;
    border-left: 1px solid #f0f0f0;


    &:first-of-type {
      border-left: 0;
    }


    &.active {
      color: #45aaf2;
    }
  }

  @media only screen and ( max-width: 500px) {
    display: block;

  }
`

const StyledNoLetters = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-flow: column nowrap;

  i {
    display: block;
    float: none;
    font-size: 42px;
    padding: 20px;
    border-radius: 100%;
    background: #f8f8f8;
    color: #888;
  }

  span {
    margin-top: 15px;
    font-size: 14px;
    font-weight: bold;
    color: #888;

  }
`;

const NoLetters = () => (
  <StyledNoLetters>
    <i className="ri-file-text-line"></i>
    <span>You will see your letters here</span>
  </StyledNoLetters>
)

const StyledGetLocation = styled.div`
  
`;


const AccountPage = ({
  user = {},
  isLoading = true,
  userProfile }: AccountPageProps) => {

  const [accountPageState, setAccountPageState] =
    React.useState<{
      user: firebase.auth.UserCredential;
      userProfile?: UserProfile;
      userLetters: LetterMetadata[] | [];
      currentStep: number;
      userLocation: any;
    }>({
      user: user,
      userProfile: userProfile,
      userLetters: [],
      currentStep: 0,
      userLocation: null,
    })

  const [userProfileLoading, setUserProfileLoading] = React.useState<boolean>(true)
  const [isLettersLoading, setIsLettersLoading] = React.useState<boolean>(true)
  const [userProfileState, setUserProfileState] = React.useState<UserProfile>(userProfile)
  const [profileAccountType, setProfileAccountType] = React.useState<AccountType>({ iconClassName: '', color: '', id: null, type: '' });

  async function getUserProfile() {
    return firebase.firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot((snap) => {
        const profile = snap.data() as UserProfile;
        // console.log(!!profile.accountType);
        const accountType = (snap.exists && !!profile.accountType) ? AccountTypes.filter(({ type }) => type === profile.accountType)[0]
          :
          {
            iconClassName: '', color: '', id: null, type: ''
          };
        setProfileAccountType(accountType)
        setUserProfileState({ ...userProfileState, ...profile })
        setUserProfileLoading(false)
      })
  }

  async function getUserLetters() {
    return firebase.firestore()
      .collection('userLetters')
      .doc(user.uid)
      .collection('letters')
      .orderBy('date', 'desc')
      .onSnapshot((snap) => {
        const userLettersDoc = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        if (!!userLettersDoc) {
          setAccountPageState({
            ...accountPageState,
            userLetters: userLettersDoc as LetterMetadata[],
          })
          setIsLettersLoading(false)
        } else {
          setAccountPageState({ ...accountPageState, userLetters: [] })
        }

      })
  }

  async function saveBio(name, about) {
    firebase.app().firestore().collection('users').doc(user.uid).update({
      name: name,
      about: about
    }).then(() => nextStep())
      .catch((err) => console.log(err))
  }

  function signOut() {
    firebase.auth().signOut()
  }

  function nextStep() {

    setAccountPageState({ ...accountPageState, currentStep: accountPageState.currentStep += 1 })

  }

  function completeProfile() {
    if (
      !!userProfileState.email &&
      !!userProfileState.name &&
      !!userProfileState.accountType &&
      !!userProfileState.location &&
      !!userProfileState.about
    ) {
      firebase.app().firestore().collection('users').doc(user.uid).update({
        isProfileComplete: true
      })
        .then(() => getUserLetters())
        .catch((err) => console.log(err))
    }
  }


  React.useEffect(() => {

    let unsubProfile, unsubLetters

    async function fetch() {

      unsubProfile = await getUserProfile()
      unsubLetters = await getUserLetters()

    }

    fetch()

    return () => { unsubProfile(); unsubLetters(); }

  }, [user])

  // Fetch letters when profile is complete
  React.useEffect(() => {
    userProfileState.isProfileComplete && getUserLetters()
  }, [userProfileState.isProfileComplete])

  const profileComplete = userProfileState.isProfileComplete

  // const profileComplete = (!!userProfileState &&
  //   !!userProfileState.about &&
  //   !!userProfileState.accountType && !!userProfileState.location) || accountPageState.currentStep == 3

  const accountTypeClassName = profileComplete ? userProfileState.accountType : ''


  return (<>
    <SectionHeader title="Account"></SectionHeader>

    {userProfileLoading ?
      <Loaders.AccountProfileLoader />
      :
      profileComplete && (
        <StyledProfileContainer color={profileAccountType && profileAccountType.color}>
          <div className="profile">
            <div className="profile-image-container">
              <img src={user.photoURL} />
              {profileComplete && <i className={profileAccountType.iconClassName} />}
            </div>
            <div className="profile-details">
              <strong className="name">{userProfileState.name}</strong>
              {/* <p className="email">{user.email}</p> */}
              {profileComplete ?
                <span className="account-type">{userProfileState.accountType || ''}</span>
                : <span className="account-type">&nbsp;</span>}
            </div>
          </div>
        </StyledProfileContainer>
      )
    }

    <StyledContentContainer>
      {
        userProfileLoading ?
          <Loaders.LettersLoader />
          :
          !profileComplete ?
            [(
              accountPageState.currentStep == 0 &&
              <AccountBio
                user={user}
                userProfile={userProfileState}
                saveBio={saveBio}
                key='account-bio'
              />
            ), (
              accountPageState.currentStep == 1 &&
              <AccountTypeSelector
                accountTypes={AccountTypes}
                user={user}
                userProfile={userProfileState}
                profileAccountType={profileAccountType}
                nextStep={nextStep}
                key='account-type'
              />)
              , (
              accountPageState.currentStep == 2 &&
              <AccountLocation
                user={user}
                nextStep={nextStep}
                completeProfile={completeProfile}
                key='account-location'
              />
            )]
            :
            (<StyledLettersContainer>
              <div className="letters-header">
                <h5>Inbox</h5>
              </div>
              {
                accountPageState.userLetters.length > 0 ?
                  (accountPageState.userLetters || []).map((letter: LetterMetadata) => (
                    <StyledUserLetter key={letter.id}>
                      <Link to={`/letter/${letter.id}`}>
                        <div className="header">
                          <span className="name">{letter.name}</span>
                          <span className="date">{moment(letter.date.toDate()).fromNow()}</span>
                        </div>
                        <p className="message">{letter.message.length >= 40 ? (`${letter.message}\u2026`) : letter.message}</p>
                      </Link>
                    </StyledUserLetter>
                  ))
                  :
                  <NoLetters />
              }
            </StyledLettersContainer>)
      }

    </StyledContentContainer>
    {
      profileComplete &&
      <StyledButton onClick={signOut}>Sign Out</StyledButton>
    }
  </>)
}

const Account = (props: Props) => {

  const [accountState, setAccountState] = React.useState<{
    redirectUser: firebase.auth.UserCredential;
  }>({
    redirectUser: null,
  })

  async function storeUserAccount(loggedInUser: firebase.auth.UserCredential) {

    firebase.firestore().collection('users').doc(loggedInUser.user.uid)
      .get().then((snapshot) => {
        if (!snapshot.exists) {
          firebase.firestore().collection('users').doc(loggedInUser.user.uid).set({
            email: loggedInUser.user?.email,
            name: loggedInUser.user?.displayName,
            photoURL: loggedInUser.user?.photoURL,
            uid: loggedInUser.user?.uid,
            // accessToken: loggedInUser.credential?.accessToken,
          })
        } else {
          // alert("User " + loggedInUser.user?.uid + " is in the database")
        }

      })
  }


  React.useEffect(() => {
    firebase.auth().getRedirectResult().then((cred: firebase.auth.UserCredential) => {
      if (!!cred.user) {
        setAccountState({ ...accountState, redirectUser: cred })
        storeUserAccount(cred)
      }

    })
  }, [])

  return (
    <StyledAccountContainer>
      <AuthContext.Consumer>
        {
          ({
            user = undefined,
            isLoading = true,
            userProfile = {
              email: '',
              uid: '',
              accountType: '',
              photoURL: '',
              name: ''
            } as UserProfile
          }: UserState) => (

              isLoading ?

                <Loaders.AccountLoader />

                :

                (!user ?
                  <SignIn redirectUser={accountState.redirectUser} />
                  :
                  <AccountPage
                    user={user}
                    isLoading={isLoading}
                    userProfile={userProfile}
                  />
                )
            )
        }
      </AuthContext.Consumer>
    </StyledAccountContainer>
  )
}

export default Account

const StyledUserLetter = styled.div`
  border-bottom: 1px solid #f0f0f0;

  
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .name {
    font-family: 'Merriweather', 'Times New Roman', Times, serif;
    font-size: 16px;
    font-weight: bold;
    color: #444;
  }

  .date {
    font-size: 14px;
    color: #777;
    margin-left: 20px;
  }

  .message {
    font-size: 14px;
    color: #777;
    /* width: 100%; */
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: hidden;
    text-overflow: ellipsis;
    line-height: 18px;
  }

  &:last-of-type {
    /* border-bottom: none; */
  }

  &:hover {
    background: #f8f8f8;
  }

  a, a:visited {
    text-decoration: none;
    padding: 20px;
    display: block;
  }

`;