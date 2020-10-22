import React from 'react'
import styled from 'styled-components';
import * as firebase from 'firebase/app';
import { UserProfile } from '../contexts/AuthContext';


interface Props {
  user: firebase.User | any | undefined;
  userProfile: UserProfile | undefined;
  saveBio: (name, about) => void;
}


const AccountBio = (props: Props) => {
  const [name, setName] = React.useState<string>(
    props.userProfile.name || props.user.displayName || '');
  const [about, setAbout] = React.useState<string>(
    props.userProfile.about || ''
  );

  function handleSaveBio(e: React.MouseEvent<HTMLButtonElement>) {
    props.saveBio(name, about)
  }


  // async function saveBio() {
  //   firebase.app().firestore().collection('users').doc(props.user.uid).update({
  //     name: name,
  //     about: about
  //   })
  // }


  return (
    <StyledAccountBioWrapper>
      <StyledAccountBioHeader>
        <h4>Profile</h4>
      </StyledAccountBioHeader>
      <div className="input-group">
        <label className="label">Name:</label>
        <input
          autoFocus
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          value={name} placeholder="Enter Your Name"
          type="text" className="input-name"
        />
      </div>
      <div className="input-group">
        <label className="label">About You:</label>
        <textarea
          value={about}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setAbout(e.target.value)}
          placeholder="A short description about you"
          rows={8} className="input-about"

        />
      </div>
      <div className="input-group save-button-wrapper">
        <StyledSaveButton onClick={handleSaveBio}>Save</StyledSaveButton>
      </div>
    </StyledAccountBioWrapper>
  )
}

const StyledAccountBioWrapper = styled.div`
  display: flex;
  position: relative;
  /* flex: 1; */
  background: #FFF;
  width: 100%;
  /* max-width: 468px; */
  border-radius: 5px;
  box-shadow: 0px 3px 5px rgba(0,0,0,0.1);
  flex-flow: column nowrap;
  /* padding: 10px; */
  margin: 0 auto;
  width: 100%;
  max-width: 468px;


  .input-group {
    padding: 20px 0px 0px 0px;
    width: calc(100% - 40px);
    max-width: 350px;
    margin: 0 auto;
    
  }

  .save-button-wrapper {
    margin-top: 20px;
    text-align: center;
  }



  .label {
      font-size: 14px;
      margin-right: 0px;
      margin-left: 0px;
      text-transform: uppercase;
      font-weight: bold;
      color: #888;
      /* width: 60px; */
      display: block;
    }

    input, textarea {
      width: 100%;
      padding: 10px;
      color: #222;
      flex: 1;
      margin: 10px 0;
      border-radius: 5px;
      padding: 12px;
      font-family: 'Open Sans', Arial, Helvetica, sans-serif;
      border: 2px solid #e5e5e5;
      border-radius: 3px;
      font-size: 14px;
      flex: 1;
      resize: none;
      font-weight: 400;

      &:active, &:focus {
        border: 2px solid #56aade;
        outline: 0;
      }

    }

    
`;

const StyledAccountBioHeader = styled.div`
  text-align: center;
  padding: 30px 0 20px 0;
  /* margin-bottom: 10px; */
  /* width: 100%; */
  display: block;
  /* float: none; */
  flex: 0;

  h4 {
    font-weight: 600;
    color: #555;
    font-size: 24px;
    font-family: 'Merriweather', 'Times New Roman', Times, serif;
  }
`
const StyledSaveButton = styled.button`
  /* width: 100%; */
  min-width: 200px;
  border-radius: 30px;
  color: #FFF;
  background: #56aade;
  border: 0;
  padding: 10px 40px;
  font-weight: 600;
  font-size: 16px;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 auto;
  margin-bottom: 40px;
  text-align: center;
  display: inline-block;
`;

export default AccountBio

