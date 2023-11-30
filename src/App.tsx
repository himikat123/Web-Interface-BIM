import React from 'react';
import { Route, Routes } from "react-router-dom"
import Status from './pages/status';
import Connect from './pages/connect';
import Language from './pages/language';
import Username from './pages/username';
import { GetConfig } from './redux/getConfig';

function App() {
    GetConfig();

    return (
        <div className={"bg-page_light dark:bg-page_dark text-text_light dark:text-text_dark min-h-screen"}>
            <Routes>
                <Route path="/"         element={ <Status /> }>  </Route>
                <Route path="/connect"  element={ <Connect /> }></Route>
                <Route path="/language" element={ <Language /> }></Route>
                <Route path="/username" element={ <Username /> }></Route>
                <Route path="/*"        element={ <div>404 Page nui</div> }></Route>
            </Routes>
        </div>
    );
}

export default App;
