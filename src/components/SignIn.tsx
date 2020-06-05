import React from 'react'
import styled from 'styled-components';
import * as firebase from 'firebase/app';
import SectionHeader from './SectionHeader';

const GoogleLogoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAADNElEQVQ4T2NkwAP+rwpl/vbOxv3fj+8m/xn+sTOwsN1nZP6/iTez9BUubYzYJL7MnKz7+/GDOb+vXjRh+PSRCUUNMzMDs5rmKzYNrVbenNJJ6PoxDPzc2zrt2/6dGYzfv2O1DNkAVmOLW4wKmhYCWVnvYeIomj60VG/9tX+XF75gQJETFvrL4+ptw5WadwLDwE/9rR0/tmwoR9HAzsHAoqt3k0VY9CgjM+vX/58/6fy8c936//PnbAzCQn85HT1ceDMLDyDrAbvw644qyS8zTjxh/PwZHl4squof2U3MHLlT8s4ja/g/aRL7h88v17KIinfzpuUdxBqGf67GrPv38kHgp+kMDP/e/WRgkpX7zuboKMsXn/OWaO9DFYJd+PO44Wemr1d4GFllGb5sUWdgkndJ5sspnkeqYSD1jP+fNXD9ud75leH/H7D+f5waP9itL3OiG1ay9Ovtz98YRXCmP+b//2Ykcokw/r/bYPLnfutpmML/AnYP2Ez2KqJrjJn+5cezdwzs+FwdY86ijGkgr/1DNvM9CuQYGG7Dqgf1ctdXhv+/wWZ849T6wW99EcPLGXO/vXn39S8/skUfvjGy/PmLEIm25+YDR8qvE0afGL9c5n3AqstQ8cmUwVrGPKHIMGkhPu817P/Pcf78l6+fvzOCk5oYL8PvFXk8bGAD/1xJXLv3w9eglhfMDN///GJQ4JP+5qBoLJejGY8z2bRt/L58z5W/ETBLTRSZr3RFceqCDTxxb7Z4zcWjzz78RCRsNT65j6Ziuk6FJknnUFz6n4Gxd+/9CTtPi+b9+YeQCTJjDc9xZV8Fz8ttp6a3r7u3pwJZMzszG4O+kPptUW6h40xMLF+//fqmeufjQ6vnX19z6bEmMNy6ZgNWbizHeLc7llsFnA6RDag9NnHL9keHvIlN0Eb8jgy/nkR9s5VnV012436GYSBIoPX0jCk7HxzO+vb3B8HiS1dY7ZWWmKFFqX7YfZgjsGqadG6J1uNvz+ZefHvL9N3398zILmZmZGZQE1R8py2kPK3COK2OgZHhP7I8flf8Z2CcdnmZ3dc/343//2fg4GBie8jDw74rSTXsNa5gAQB0cT2E42+E7AAAAABJRU5ErkJggg=="

const ShareScreenshot = 'https://firebasestorage.googleapis.com/v0/b/tyfyservices.appspot.com/o/share%20cropped%20transparent.png?alt=media&token=8315d490-0061-46b4-a2c4-d17bc1a899fd'
const OpenSafariScreenshot = 'https://firebasestorage.googleapis.com/v0/b/tyfyservices.appspot.com/o/open%20safari.png?alt=media&token=a3351234-671a-40dd-8b0e-5e7aea6496eb'

interface Props {
  redirectUser: firebase.auth.UserCredential;
}

const StyledSignInButton = styled.button`
  display: block;
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  padding: 15px;
  border: 0;
  background: #FFF;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1em;
  color: #444;
  align-items: center;
  margin-bottom: 10px;

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

const StyledGoogleSignIn = styled(StyledSignInButton)`
  display: flex;
  flex-flow: row nowrap;
  background-color: #4285f4;
  border: 1px solid #4285f4;
  padding: 0;
  border-radius: 0;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  
  .icon {
    display: inline-block;
    margin: 0;
    height: 48px;
    width: 48px;
    font-size: 1.2em;
    background: #FFF;
    padding: 15px;
    color: #EA4335;
    /* border-radius: 5px 0 0 5px; */
  }

  .button-text {
    display: inline-block;
    text-align: center;
    flex: 1;
    color: #FFF;
    padding: 15px;
  }
`

const StyledFacebookLogin = styled(StyledSignInButton)`
  background-color: #1877F2;
  color: #FFF;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 8px 12px;
  display: flex;
  height: 40px;

  .icon {
    color: #FFF;
    font-size: 24px;
    height: 24px;
    width: 24px;
    margin: 0 8px 0 0;
    font-weight: bold;
  }

  .button-text {
    color: #FFF;
  }


`

const StyledInstructions = styled.p`
  text-align: center;
  color: #FFF;
  margin: 2px 0 20px 0;
  font-size: 16px;
  line-height: 1.8em;
`

const StyledFBIOS = styled.div`

  a, a:visited {
    /* color: #FFF !important; */
    color: #FFF;
    background: rgba(0,0,0,0.1);
    border-radius: 5px;
    padding: 4px 6px;
  }

  strong {
    font-weight: bold;
  }

  section {
    color: #FFF;
    width: 100%;
    text-align: center;


    p {
      margin: 0 auto;
      padding: 20px;
      width: calc(100% - 40px);
      max-width: 468px;
      text-align: left;
      line-height: 1.6em;
      font-size: 16px;

     
    }

    img {
      margin: 0 auto;
      width: calc(100% - 60px);
      max-width: 468px;
    
    }

    &:first-of-type {

      img {
        margin-left: 50px;
      }
    @media only screen and (min-width: 500px) {
    }
    }
    

    

  }
`;

const SignIn = (props: Props) => {

  let FBProvider = new firebase.auth.FacebookAuthProvider();
  let GoogleProvider = new firebase.auth.GoogleAuthProvider();

  // function isFBIOS(): Boolean {
  //   return (navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/FBAV/i)) ? true : false
  // }




  async function signInWithGoogle() {

    firebase.auth().signInWithRedirect(GoogleProvider).then(() => {
    }).catch((err) => {
      if (err.code === 'auth/account-exists-with-different-credential') {
        let pendingCred = err.credential;
        let email = err.email;

        firebase.auth().fetchSignInMethodsForEmail(email).then((methods) => {

          // alert(`An account with the email ${email} already exists.`)
          if (methods[0] === 'facebook.com') {
            firebase.auth().signInWithPopup(FBProvider).then((result) => {
              result.user.linkWithRedirect(GoogleProvider)
            })
          }
        })

      }
    })

  }

  async function signInWithFacebook() {
    firebase.auth().signInWithRedirect(FBProvider).then((result) => {
    }).catch((err) => {
      console.log(err);
      if (err.code === 'auth/account-exists-with-different-credential') {
        let pendingCred = err.credential;
        let email = err.email;

        firebase.auth().fetchSignInMethodsForEmail(email).then((methods) => {

          // alert(`An account with the email ${email} already exists.`)
          if (methods[0] === 'google.com') {
            firebase.auth().signInWithPopup(GoogleProvider).then((result) => {
              result.user.linkWithRedirect(FBProvider)
            })
          }


        })


      }
    })
  }


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

  const [isFBIOS, setIsFBIOS] = React.useState<Boolean>(
    false
  )

  React.useEffect(() => {

    setIsFBIOS(
      (navigator.userAgent.match(/(iPod|iPhone|iPad)/)
        &&
        navigator.userAgent.match(/FBAV/i) ? true : false
      ))



    // alert('yes: ' + yes)
    // firebase.auth().onAuthStateChanged((user) => {
    //   window.localStorage.setItem('user', JSON.stringify(user))
    // })
  }, [])

  if (isFBIOS) {
    return (
      <StyledFBIOS>
        <SectionHeader title="Sign In" />
        <StyledInstructions>
          For a more secure browsing experience please follow the instructions below: <br />
        </StyledInstructions>
        <section>
          <p>1. Tap the <strong>Share</strong> icon on the lower right corner.</p>
          <img src={ShareScreenshot} />
        </section>
        <section>
          <p>2. Tap <strong>Open in Safari</strong></p>
          <img src={OpenSafariScreenshot} />

        </section>
        <StyledInstructions>
          or visit <a href="https://tyfy.services/account">https://tyfy.services/account</a> on your <strong>Safari Web Browser</strong>.
        </StyledInstructions>
      </StyledFBIOS>
    )
  }


  return (
    <div>
      <SectionHeader title="Sign In" />
      <StyledInstructions>Start Receiving Letters</StyledInstructions>
      <StyledGoogleSignIn onClick={signInWithGoogle}>
        <div className="icon"><img className="ri-google-fill" src={GoogleLogoBase64} /></div>
        <div className="button-text">
          Sign in with Google
        </div>
      </StyledGoogleSignIn>
      <StyledFacebookLogin onClick={signInWithFacebook}>
        <div className="icon"><i className="ri-facebook-circle-fill" /></div>
        <div className="button-text">
          Continue with Facebook
        </div>
      </StyledFacebookLogin>
    </div>
  )
}



export default SignIn
