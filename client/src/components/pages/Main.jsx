import React, { useState, useEffect } from 'react';
import LoginModal from '../core/LoginModal';
import JoinModal from '../core/JoinModal';
import WeatherDisplay from '../../components/widgets/WeatherDisplay';
import getWeatherData from '../../services/WeatherService';
import MapView from '../../components/widgets/MapView';
import '../../assets/scss/Main.scss';
import { useNavigate } from 'react-router-dom';

function Main() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    const [latitude, setLatitude] = useState(33.4996); // 제주도 위도
    const [longitude, setLongitude] = useState(126.5312); // 제주도 경도
    const [username, setUsername] = useState(''); // 로그인한 사용자 이름
    const navigate = useNavigate();

    const toggleLoginModal = () => {
        setIsLoginModalOpen(!isLoginModalOpen);
    };

    const toggleJoinModal = () => {
        setIsJoinModalOpen(!isJoinModalOpen);
    };

    const handleLoginSuccess = async (loggedInUsername) => {
        setLoggedIn(true);
        setUsername(loggedInUsername);
        toggleLoginModal();

        // 도시 이름 설정 (예: 제주)
        const city = 'Jeju';

        try {
            console.log(`Fetching weather data for city: ${city}`);
            const data = await getWeatherData(city);
            setWeatherData(data);
            setError(''); // Clear any previous error
        } catch (error) {
            console.error('Failed to fetch weather data:', error);

            if (error.response && (error.response.status >= 400 && error.response.status < 500)) {
                setError('Failed to fetch weather data. Please check the request and try again.');
            } else if (error.response && (error.response.status >= 500)) {
                setError('Failed to fetch weather data. Server error, please try again later.');
            } else {
                setError('Failed to fetch weather data. Please try again later.');
            }
        }

        // 로그인 성공 후 이동경로
        navigate('/');
    };

    useEffect(() => {
        // 초기화 작업 (예: 현재 위치의 날씨 정보 가져오기)
        const fetchInitialWeatherData = async () => {
            if (loggedIn) {
                const city = 'Jeju'; // 예시 도시 설정
                try {
                    const data = await getWeatherData(city);
                    setWeatherData(data);
                    setError('');
                } catch (error) {
                    console.error('Failed to fetch initial weather data:', error);
                    setError('Failed to fetch weather data. Please try again later.');
                }
            }
        };

        fetchInitialWeatherData();
    }, [loggedIn]);

    return (
        <div className="Main">
            <video autoPlay loop muted className="video-background">
                <source src="/videos/surfing.mp4" type="video/mp4" />
            </video>
            <div className="content">
                <header>
                    <nav>
                        <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            {loggedIn ? (
                                <li style={{ margin: '0 10px', color: 'white' }}>
                                    {`Welcome, ${username}`}
                                </li>
                            ) : (
                                <>
                                    <li style={{ margin: '0 10px' }}>
                                        <button onClick={toggleJoinModal}>회원가입</button>
                                    </li>
                                    <li style={{ margin: '0 10px' }}>
                                        <button onClick={toggleLoginModal}>로그인</button>
                                    </li>
                                </>
                            )}
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

                {!loggedIn && (
                    <h1>Welcome to SurFun</h1>
                )}

                {loggedIn && (
                    <>
                        {error && (
                            <p style={{ color: 'red' }}>{error}</p>
                        )}

                        {weatherData && (
                            <WeatherDisplay weatherData={weatherData} />
                        )}

                        <div className="map-container">
                            <MapView latitude={latitude} longitude={longitude} />
                        </div>

                        {/* 추가 콘텐츠 및 기능 */}
                        <section>
                            <h2>추천 서핑 포인트</h2>
                            {/* 추천 서핑 포인트를 표시하는 컴포넌트 */}
                        </section>
                        <section>
                            <h2>커뮤니티 활동</h2>
                            {/* 커뮤니티 게시판을 표시하는 컴포넌트 */}
                        </section>
                        <section>
                            <h2>서핑 교육 및 가이드</h2>
                            {/* 서핑 강좌 및 안전 가이드를 표시하는 컴포넌트 */}
                        </section>
                        <section>
                            <h2>최신 서핑 뉴스 및 정보</h2>
                            {/* 최신 서핑 뉴스 및 정보를 표시하는 컴포넌트 */}
                        </section>
                    </>
                )}
            </div>
        </div>
    );
}

export default Main;
