import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/pages/Main';
import Join from './components/pages/Join';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/join" element={<Join />} />
            </Routes>
        </Router>
    );
}

export default App;
