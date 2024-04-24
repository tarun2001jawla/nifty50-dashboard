import axios from 'axios';

const API_KEY = '4e73fef788084c96a34774510b8ec36f';

export const getLiveData = async (symbol : string) => {
      const response = await axios.get(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1min&apikey=${API_KEY}`)
      const data = await response.data;

      return data

}