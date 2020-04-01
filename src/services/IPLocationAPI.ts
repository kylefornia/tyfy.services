import axios from 'axios'
import NewLetter from '../components/NewLetter';


export interface UserLocation {
  lat: number;
  lon: number;
  country_name: string;
  country_code: string;
  region: string;
  city: string;
}

class IPLocationAPI {

  static getLocationFromIP(): Promise<UserLocation> {
    return axios.get('https://ipapi.co/json/').then((result) => {
      const data: UserLocation = result.data
      return data
    })
  }


}

export default IPLocationAPI