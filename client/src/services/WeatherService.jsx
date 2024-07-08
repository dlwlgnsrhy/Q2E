import axios from 'axios';

const API_KEY = '1fc7ebdf437586e4a64c8ec8e9bdc7c9'; // 새로운 OpenWeatherMap API 키

const getWeatherData = async (city) => {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                units: 'metric',
                appid: API_KEY
            }
        });
        console.log('Weather data:', response.data); // 응답 데이터 확인
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        }
        throw error;
    }
};

export default getWeatherData;
