import axios from 'axios';

const API_KEY = '4e73fef788084c96a34774510b8ec36f';


export const getLiveData = async (symbol : string) => {
    try {
        
        const response = await axios.get(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=15min&apikey=${API_KEY}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching live data:', error);
        throw error; // Re-throw the error for handling in the calling code
    }
}

