import axios from 'axios'
import NewLetter from '../components/NewLetter';

export interface UserLocation {
  lat: number;
  lon: number;
  country: string;
  countryCode: string;
  regionName: string;
  city: string;
}

class IPLocationAPI {

  static getLocationFromIP(): Promise<UserLocation> {
    return axios.get('http://ip-api.com/json/').then((result) => {
      const data: UserLocation = result.data
      return data
    })
  }


}

export default IPLocationAPI