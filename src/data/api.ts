import {Alert} from 'react-native';
import Axios from 'axios';
import {MarkerObj} from '../utilities/interfaces';

const ROOT_API = 'http://localhost:8000';

class Api {
  public getLandmarks: () => Promise<MarkerObj | undefined> = async () => {
    try {
      const response = await Axios.get(`${ROOT_API}/markers`);
      if (response.status === 200) {
        return response.data;
      }
      return {};
    } catch (error) {
      Alert.alert('Could not fetch data for that resourse');
    }
  };
}

export default new Api();
