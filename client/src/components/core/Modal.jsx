import React, { useState } from 'react';
import axios from 'axios';

function LoginModal({ onLoginSuccess }) {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const login = async () => {
        try {
            const response = await axios.post('/login', { 
                username: loginUsername, 
                password: loginPassword 
            });
            console.log(response.data);
            onLoginSuccess();
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
            />
            <br/>
            <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
            />
            <br/>
            <button onClick={login}>Login</button>
        </div>
    );
}

export default LoginModal;
