import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import BasicLayout from './views/BasicLayout';
import Home from './views/Home';
import ViewportContext from './utils/viewportContext';
const App = () => {
    return (
        <ViewportContext>
        <Router>
            <BasicLayout />
            <Routes>
            <Route path="/Home"  element={<Home />}>
            </Route>
            </Routes>
        </Router>
        </ViewportContext>
    );
};

export default App;
