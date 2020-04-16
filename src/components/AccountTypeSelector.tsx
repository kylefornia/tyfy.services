import React from 'react'
import styled from 'styled-components';
import * as firebase from 'firebase/app'

const AccountTypeSelectorContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
  /* height: 100%; */

  /* padding: 5px; */
`;

const AccountTypeItem = styled.div`
  flex: 1;
  /* float: left; */
  /* flex-basis: calc(50% - 24px); */
  flex: 1;
  margin: 5px;
  border-radius: 3px;
  /* width: 50%; */
  /* padding: 20px; */
  border: 2px solid #f0f0f0;
  /* margin-bottom: 10px; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row nowrap;
  cursor: pointer;
  padding: 10px 10px;

  transition: transform 200ms cubic-bezier(0.64, 0.57, 0.67, 1.53);

  i {
    font-size: 18px;
    color: #FFF;
    background: #888;
    border-radius: 100%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:nth-of-type(1) {
    i { background-color: #fd9644; }
  }

  &:nth-of-type(2) {
    i { background-color: #fc5c65; }

  }

  &:nth-of-type(3) {
    i { background-color: #2d98da; }

  }

  &:nth-of-type(4) {
    i { background-color: #20bf6b; }

  }
  


  h5 {
    margin-left: 10px;
    line-height: 18px;
    font-weight: 700;
    color: #666;
    font-size: 14px;
    flex: 1;
    /* font-family: 'Merriweather', 'Times New Roman', Times, serif; */
  }

  &.active {
    border-color: #7ec9f7;
    h5 { color: #333; }
    /* transform:scale(1.04); */
    box-shadow: 0px 3px 10px rgba(0,0,0,0.1);

    i {
    }
  }

  &.disabled {
    opacity: 0.8;
  }

  &:not(.active):hover {
    opacity: 0.9;
  }

  
`;

const StyledAccountTypeHeader = styled.div`
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
const StyledButtonContainer = styled.div`
  /* flex: 2; */
  display: inline-block;
  width: 100%;
  /* height: 0; */
  /* flex: 2; */
  margin: 0 auto;
  margin-top: 15px;
  text-align: center;
  padding: 0 0 20px 0;
`

const StyledSaveButton = styled.button`
  /* width: 100%; */
  min-width: 200px;
  border-radius: 30px;
  color: #FFF;
  background: #7ec9f7;
  border: 0;
  padding: 10px 40px;
  font-weight: 600;
  font-size: 16px;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 auto;
`;

const AccountTypeWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  background: #FFF;
  border-radius: 3px;
  box-shadow: 0px 3px 10px rgba(0,0,0,0.1);
  margin: 0 auto;
  width: 100%;
  max-width: 468px;
`;


interface Props {
  user: firebase.User;
  accountTypes: {
    id: number; type: string; iconClassName: string;
  }[];
  nextStep: () => void;
}

const AccountTypeSelector = ({ user, accountTypes, nextStep }: Props) => {

  const [accountTypeState, setAccounTypeState] = React.useState<{
    selected: { type: string; id: number } | undefined;
  }>({
    selected: undefined,
  })



  function handleTypeSelect({ type, id }) {
    setAccounTypeState({ selected: { type, id } })
  }

  function saveAccountType() {

    const updateType = firebase.firestore().collection('users').doc(user.uid)

    const initLetters = firebase.firestore().collection('userLetters').doc(user.uid)

    let batch = firebase.firestore().batch();

    batch.set(initLetters, { letterCount: 0 });
    batch.update(updateType, { accountType: accountTypeState.selected.type })

    batch.commit().then(() => {
      nextStep()
    })

  }

  return (
    <>
      <AccountTypeWrapper>
        <StyledAccountTypeHeader>
          <h4>I am a...</h4>
        </StyledAccountTypeHeader>
        <AccountTypeSelectorContainer>
          {
            accountTypes.map(({ type, id, iconClassName }) => (
              <AccountTypeItem className={
                accountTypeState.selected ? id === accountTypeState.selected.id
                  ? 'active' : 'disabled' : ''}
                key={id} onClick={() => handleTypeSelect({ type, id })}>
                <i className={iconClassName} />
                <h5>{type}</h5>
              </AccountTypeItem>
            ))
          }
        </AccountTypeSelectorContainer>
        <StyledButtonContainer>
          <StyledSaveButton onClick={saveAccountType}>Next</StyledSaveButton>
        </StyledButtonContainer>
      </AccountTypeWrapper>

    </>
  )
}

export default AccountTypeSelector
