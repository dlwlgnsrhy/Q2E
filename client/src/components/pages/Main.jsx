import React, { useState } from 'react';
import LoginModal from '../core/Modal';
import JoinModal from '../core/JoinModal';
import WeatherDisplay from '../../components/widgets/WeatherDisplay';
import getWeatherData from '../../services/WeatherService';
import '../../assets/scss/Main.scss';

function Main() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    const toggleLoginModal = () => {
        setIsLoginModalOpen(!isLoginModalOpen);
    };

    const toggleJoinModal = () => {
        setIsJoinModalOpen(!isJoinModalOpen);
    };

    const handleLoginSuccess = async () => {
        setLoggedIn(true);
        toggleLoginModal();

        // 도시 이름 설정 (예: 서울)
        const city = 'Seoul';

        try {
            console.log(`Fetching weather data for city: ${city}`);
            const data = await getWeatherData(city);
            setWeatherData(data);
        } catch (error) {
            console.error('Failed to fetch weather data:', error);
        }
    };

    return (
        <div className="Main">
            <video autoPlay loop muted className="video-background">
                <source src="/videos/surfing.mp4" type="video/mp4" />
            </video>
            <div className="content">
                <header>
                    <nav>
                        <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'flex-end' }}>
                            <li style={{ margin: '0 10px' }}>
                                <button onClick={toggleJoinModal}>회원가입</button>
                            </li>
                            <li style={{ margin: '0 10px' }}>
                                <button onClick={toggleLoginModal}>로그인</button>
                            </li>
                        </ul>
                    </nav>
                </header>

                {isLoginModalOpen && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '5px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                        }}>
                            <LoginModal 
                                onLoginSuccess={handleLoginSuccess}
                            />
                        </div>
                    </div>
                )}

                {isJoinModalOpen && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '5px',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                        }}>
                            <JoinModal 
                                onJoinSuccess={() => {
                                    setIsJoinModalOpen(false);
                                }}
                            />
                        </div>
                    </div>
                )}

                <h1>Welcome to the Main Page</h1>

                {loggedIn && weatherData && (
                    <WeatherDisplay weatherData={weatherData} />
                )}
            </div>
        </div>
    );
}

export default Main;
