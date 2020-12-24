import React from 'react'
import styled from 'styled-components';
import ReactCountryFlag from 'react-country-flag';
import IPLocationAPI, { UserLocation } from '../services/IPLocationAPI';
import * as firebase from 'firebase/app'

interface Props {
  user: firebase.User;
  nextStep: () => void;
  completeProfile: () => void;
}



const AccountLocation = (props: Props) => {

  const [location, setLocation] = React.useState<UserLocation>()

  async function getUserLocation(): Promise<any> {

    if (navigator.geolocation) {

      return new Promise((resolve, reject) => {
        const getGeolocation = async (position: any) => {

          if (!position) return alert('Cannot get your location')

          let { city = , country_name, country_code, region }: UserLocation = await IPLocationAPI.getLocationFromIPv3();

          const currentLocation: UserLocation = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            city,
            country_name,
            country_code,
            region,
          }

          setLocation(currentLocation)

          return resolve(currentLocation)
        }

        navigator.geolocation.getCurrentPosition(getGeolocation)
      });


    } else {
      alert("Geolocation is not supported by this browser.");
    }

  }

  async function saveUserLocation() {
    let location = await getUserLocation()

    firebase.firestore().collection('users').doc(props.user.uid)
      .update({
        location: location
      }).then(() => {
        props.completeProfile()
      })

  }

  return (
    <StyledAccountLocation>
      <StyledAccountLocationHeader>
        <h4>I am from...</h4>
      </StyledAccountLocationHeader>
      <StyledAccountLocationContent>
        <div className="icon-container">
          {
            !!location ?
              <ReactCountryFlag svg countryCode={location.country_code} />
              :
              <i className="icon ri-user-location-fill"></i>
          }
        </div>


        <p className="location">{!!location ? (`${location.city}, ${location.country_name}`) : ('')}</p>

        {
          !!location ?
            <StyledGetLocationButton onClick={saveUserLocation}>
              Complete
           </StyledGetLocationButton>
            :
            <StyledGetLocationButton onClick={getUserLocation}>
              Get Location
            </StyledGetLocationButton>
        }

      </StyledAccountLocationContent>
    </StyledAccountLocation>
  )
}

export default AccountLocation

const StyledAccountLocation = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  background: #FFF;
  width: 100%;
  max-width: 468px;
  margin: 0 auto;
  border-radius: 3px;
  box-shadow: 0px 3px 10px rgba(0,0,0,0.1);
  flex-flow: column nowrap;
`;

const StyledAccountLocationHeader = styled.div`
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

const StyledAccountLocationContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;

  .icon-container {
    padding: 20px;
    background: #f0f0f0;
    color: #444;
    border-radius: 100%;
    margin-bottom: 10px;
  }

  .icon, img {
    width: 54px;
    height: 54px;
    font-size: 54px;
    
  }

  .location {
    /* margin-top: 10px; */
    margin-bottom: 40px;
    font-size: 14px;
    line-height: 16px;
    color: #666;
    height: 20px;
    font-weight: bold;
  }
`;

const StyledGetLocationButton = styled.button`
  border: 0;
  border-radius: 30px;
  width: auto;
  color: #FFF;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: bold;
  background: #56aade;
  padding: 8px 30px;
  margin: 0 auto;
`;