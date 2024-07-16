import {React,useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/pages/Main';
import Community from './components/pages/Community';
import Profile from './components/pages/Profile';
import SpotSelect from './components/pages/SpotSelect';
import Header from './components/layout/Header';
import LoginModal from './components/core/LoginModal';
import JoinModal from './components/core/JoinModal';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [isLoginModalOpen,setIsLoginModalOpen] = useState(false);
    const [isJoinModalOpen,setIsJoinModalOpen] = useState(false);


    const handleLoginSuccess = (username) => {
        setLoggedIn(true);
        setUsername(username);
        setIsLoginModalOpen(false);
    };

    const toggleJoinModal = () => {
        setIsJoinModalOpen(!isJoinModalOpen);
    };

    const toggleLoginModal = () => {
        setIsLoginModalOpen(!isLoginModalOpen);
    };

    return (
        <Router>
            <Header
                loggedIn={loggedIn}
                username={username}
                toggleJoinModal={toggleJoinModal}
                toggleLoginModal={toggleLoginModal}
            />
            <Routes>
                <Route path="/" element={<Main onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/community" element={<Community />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/spot-select" element={<SpotSelect />} />
            </Routes>
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
                        <LoginModal onLoginSuccess={handleLoginSuccess} />
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
                        <JoinModal onJoinSuccess={() => setIsJoinModalOpen(false)} />
                    </div>
                </div>
            )}
        </Router>
    );
}

export default App;
