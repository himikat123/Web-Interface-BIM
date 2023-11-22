import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom"
import './App.css';
import Navbar from './organisms/navbar/navbar';
import LangSwitcher from './organisms/langSwitcher/langSwitcher';

function App() {
    const location = useLocation();
    const nav = location.pathname == '/login' ? false : true;

    return (<>
        {nav && <Navbar />}

        <div className={"bg-page_light dark:bg-page_dark min-h-screen" + (nav ? " pt-16" : "")}>
            <Routes>
                <Route path="/"     element={ <div>Homepage</div> }>    </Route>
                <Route path="/lang" element={ <LangSwitcher /> }>       </Route>
                <Route path="/*"    element={ <div>404 Page nui</div> }></Route>
            </Routes>
        </div>
    </>);
}

export default App;
