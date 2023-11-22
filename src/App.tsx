import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom"
import './App.css';
import Navbar from './organisms/navbar/navbar';
import LangSwitcher from './organisms/langSwitcher/langSwitcher';

function App() {
    const location = useLocation()

    return (<>
        {location.pathname != '/login' && <Navbar />}

        <Routes>
            <Route path="/"     element={ <div>Homepage</div> }>    </Route>
            <Route path="/lang" element={ <LangSwitcher /> }>       </Route>
            <Route path="/*"    element={ <div>404 Page nui</div> }></Route>
        </Routes>
    </>);
}

export default App;
