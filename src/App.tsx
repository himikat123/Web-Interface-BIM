import React from 'react';
import { Route, Routes , useLocation } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Navbar from './organisms/navbar/navbar';
import LangSwitcher from './organisms/langSwitcher/langSwitcher';

function App() {
    const { pathname } = useLocation();

    return (
        <div className="App overflow-x-hidden">
            <Navbar />
      
            <Routes key={pathname}>
                <Route path="/lang" element={<LangSwitcher />}/>
                <Route path="*" element={<div>404 Page not found</div>}/>
            </Routes>
        </div>
    );
}

export default App;
