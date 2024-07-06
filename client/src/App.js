import React, { useState } from 'react';
import axios from 'axios';

function App() {
    // Register 상태
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerPhoneNumber, setRegisterPhoneNumber] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPreference, setRegisterPreference] = useState('');

    // Login 상태
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const register = async () => {
        try {
            const response = await axios.post('/register', { 
                username: registerUsername, 
                password: registerPassword,
                phone_number: registerPhoneNumber,
                email: registerEmail,
                preference: registerPreference
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    const login = async () => {
        try {
            const response = await axios.post('/login', { 
                username: loginUsername, 
                password: loginPassword 
            });
            console.log(response.data);
            setLoggedIn(true);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const getProtectedData = async () => {
        try {
            const response = await axios.get('/protected', { withCredentials: true });
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching protected data:', error);
        }
    };

    return (
        <div className="App">
            <h1>Register</h1>
            <input
                type="text"
                placeholder="Username"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <input
                type="text"
                placeholder="Phone Number"
                value={registerPhoneNumber}
                onChange={(e) => setRegisterPhoneNumber(e.target.value)}
            />
            <input
                type="text"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Preference"
                value={registerPreference}
                onChange={(e) => setRegisterPreference(e.target.value)}
            />
            <button onClick={register}>Register</button>

            <h1>Login</h1>
            <input
                type="text"
                placeholder="Username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button onClick={login}>Login</button>

            {loggedIn && (
                <>
                    <h1>Protected Data</h1>
                    <button onClick={getProtectedData}>Get Protected Data</button>
                </>
            )}
        </div>
    );
}

export default App;
