import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import Loading from './pages/loading';
import NoConfig from './pages/noConfig';
import NoData from './pages/noData';
import PageNotFound from './pages/pageNotFound';
import Status from './pages/status';
import Connect from './pages/connect';
import AccessPoint from './pages/accessPoint';
import Sensors from './pages/sensors';
import Language from './pages/language';
import Username from './pages/username';
import { changeLanguage } from './i18n/main';
import { iConfig } from './redux/configTypes';
import { iData } from './redux/dataTypes';
import { configStateChange, setConfigState } from './redux/slices/config';
import { dataStateChange, setDataState } from './redux/slices/data';

function App() {
    const dispatch = useDispatch();
    const configState = useSelector((stateConfig: iConfig) => stateConfig.config.configState);
    const dataState = useSelector((stateData: iData) => stateData.data.dataState);

    const fetchConfig = () => {
        fetch("./config.json")
        .then(res => res.json())
        .then((result) => {
            dispatch(configStateChange('ok'));
            dispatch(setConfigState(result));
            changeLanguage(result.lang);
            localStorage.setItem('lang', result.lang);
        },
            (error) => {
                dispatch(configStateChange('error'));
                console.error(error);
            }
        )
    }

    const fetchData = () => {
        fetch("./data.json")
        .then(res => res.json())
        .then((result) => {
            dispatch(dataStateChange('ok'));
            dispatch(setDataState(result));
        },
            (error) => {
                dispatch(dataStateChange('error'));
                console.error(error);
            }
        )
    }

    useEffect(() => {
        fetchConfig();
    }, []);
    
    useEffect(() => {
        if(configState === 'ok') {
            fetchData();
            setInterval(() => {
                fetchData();
            }, 10000);
        }
    }, [configState]);

    return (
        <div className={"bg-page_light dark:bg-page_dark text-text_light dark:text-text_dark min-h-screen"}>
            {configState === 'error' ? <NoConfig /> :
                dataState === 'error' ? <NoData /> :
            (configState === 'default' || dataState === 'default') && <Loading />}
            
            {configState === 'ok' && dataState === 'ok' && <Routes>
                <Route path="/"            element={ <Status /> }>      </Route>
                <Route path="/connect"     element={ <Connect /> }>     </Route>
                <Route path="/accesspoint" element={ <AccessPoint /> }> </Route>
                <Route path="/sensors"     element={ <Sensors /> }>     </Route>
                <Route path="/language"    element={ <Language /> }>    </Route>
                <Route path="/username"    element={ <Username /> }>    </Route>
                <Route path="/*"           element={ <PageNotFound /> }></Route>
            </Routes>}
        </div>
    );
}

export default App;
