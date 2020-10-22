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

  static getLocationFromIPv2(): Promise<UserLocation> {
    return axios.get('//ip-api.com/json/').then((result) => {

      const data: UserLocation = {
        lat: result.data.lat,
        lon: result.data.long,
        country_name: result.data.country,
        country_code: result.data.countryCode,
        region: result.data.regionName,
        city: result.data.city
      }
      return data
    })
  }


}

export default IPLocationAPI