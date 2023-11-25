import React, { useEffect} from 'react';
import { Route, Routes/*, useLocation*/ } from "react-router-dom"
import './App.css';
import Status from './pages/status';
import Language from './pages/language';
import  { getConfig } from './redux/getConfig';

function App() {
    //const location = useLocation();
    //const nav = location.pathname === '/login' ? false : true;
    useEffect(() => {
        getConfig();
    }, []);

    return (
        <div className={"bg-page_light dark:bg-page_dark text-text_light dark:text-text_dark min-h-screen"}>
            <Routes>
                <Route path="/"         element={ <Status /> }>  </Route>
                <Route path="/language" element={ <Language /> }></Route>
                <Route path="/*"        element={ <div>404 Page nui</div> }></Route>
            </Routes>
        </div>
    );
}

export default App;
