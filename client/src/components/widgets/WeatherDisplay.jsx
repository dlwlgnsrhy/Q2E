import React from 'react';

function WeatherDisplay({ weatherData }) {
    if (!weatherData) {
        return <div>Loading...</div>;
    }

    const { name, main, weather } = weatherData;
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    return (
        <div>
            <h2>Current Weather in {name}</h2>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={iconUrl} alt={weather[0].description} />
                <div>
                    <p>Temperature: {main.temp} °C</p>
                    <p>Weather: {weather[0].description}</p>
                    <p>Humidity: {main.humidity}%</p>
                    <p>Pressure: {main.pressure} hPa</p>
                </div>
            </div>
        </div>
    );
}

export default WeatherDisplay;
