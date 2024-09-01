import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import hostUrl from './atoms/hostUrl';
import Loading from './pages/loading';
import NoConfig from './pages/noConfig';
import NoData from './pages/noData';
import PageNotFound from './pages/pageNotFound';
import Status from './pages/status';
import Connect from './pages/connect';
import AccessPoint from './pages/accessPoint';
import Sensors from './pages/sensors';
import WSensors from './pages/wsensors';
import Weather from './pages/weather';
import Clock from './pages/clock';
import Alarm from './pages/alarm';
import Display1 from './pages/display1';
import Display2 from './pages/display2';
import Sound from './pages/sound';
import Comfort from './pages/comfort';
import History from './pages/history';
import ReceiveThingspeak from './pages/receiveThingspeak';
import SendThingspeak from './pages/sendThingspeak';
import SendNarodmon from './pages/sendNarodmon';
import SendMqtt from './pages/sendMqtt';
import Language from './pages/language';
import Backup from './pages/backup';
import Default from './pages/default';
import Filesystem from './pages/filesystem';
import Username from './pages/username';
import Password from './pages/password';
import Login from './pages/login';
import { changeLanguage } from './i18n/main';
import { iConfig } from './redux/configTypes';
import { iAlarms } from './redux/alarmTypes';
import { iData } from './redux/dataTypes';
import { configStateChange, setConfigState } from './redux/slices/config';
import { alarmsStateChange, setAlarmState } from './redux/slices/alarm';
import { dataFetchingChange, dataStateChange, setDataState, updateDataChange } from './redux/slices/data';
import relPath from "./atoms/relPath";

function App() {
    const dispatch = useDispatch();
    const configState = useSelector((stateConfig: iConfig) => stateConfig.config.configState);
    const alarmsState = useSelector((stateAlarm: iAlarms) => stateAlarm.alarm.alarmState);
    const dataState = useSelector((stateData: iData) => stateData.data.dataState);
    const dataFetching = useSelector((stateData: iData) => stateData.data.dataFetching);
    const updateData = useSelector((stateData: iData) => stateData.data.updateData);
    const [stopDataFetching, setStopDataFetching] = useState<boolean>(false);
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();

    useEffect(() => {
        axios(`${hostUrl()}/config.json?code=${localStorage.getItem('code') || '0'}`)
        .then(res => {
            dispatch(configStateChange('ok'));
            dispatch(setConfigState(res.data));
            changeLanguage(res.data.lang);
            localStorage.setItem('lang', res.data.lang);
        })
        .catch(err => {
            dispatch(configStateChange('error'));
            console.error(err);
        });
        axios(`${hostUrl()}/alarm.json?code=${localStorage.getItem('code') || '0'}`)
        .then(res => {
            dispatch(alarmsStateChange('ok'));
            dispatch(setAlarmState(res.data));
        })
        .catch(err => {
            dispatch(alarmsStateChange('error'));
            console.error(err);
        });
    }, [dispatch]);
    
    useEffect(() => {
        let dataFetchInterval: NodeJS.Timeout;

        function fetchData() {
            dispatch(dataFetchingChange(true));
            axios(`${hostUrl()}/data.json?code=${localStorage.getItem('code') || '0'}`)
            .then(res => {
                dispatch(dataStateChange('ok'));
                dispatch(dataFetchingChange(false));
                dispatch(updateDataChange(false));
                let data = res.data;
                if(res.data.state === 'DEMO') {
                    const date = new Date();
                    const timezoneOffset = date.getTimezoneOffset();
                    data.time = Math.round(Date.now() / 1000 - timezoneOffset * 60);
                    data.runtime = Math.round(Date.now() / 1000 - 1724076829);
                    data.wsensor.time[0] = Math.round(data.time - 8 * 60);
                    data.wsensor.time[1] = Math.round(data.time - 12 * 60);
                    data.weather.time = Math.round(data.time - 15 * 60);
                    data.thing.time = Math.round(data.time - 7 * 60);
                }
                if(res.data.state === 'OK') if(path === relPath() + '/login') navigate('/');
                if(res.data.state === 'LOGIN') if(path !== relPath() + '/login') navigate('/login');
                dispatch(setDataState(data));
            })
            .catch(err => {
                dispatch(dataStateChange('error'));
                console.error(err);
                dispatch(dataFetchingChange(false));
                dispatch(updateDataChange(false));
            })
        }

        if(configState === 'ok' && alarmsState === 'ok') {
            dataFetchInterval = setInterval(() => {
                dispatch(updateDataChange(true));
            }, 5000);

            if(updateData && !dataFetching) {
                if(path !== (relPath() + '/default')) {
                    if(path === relPath() + '/filesystem') {
                        if(!stopDataFetching) fetchData();
                    }
                    else fetchData();
                }
            }
        }

        return () => clearInterval(dataFetchInterval);
    }, [configState, alarmsState, dispatch, dataFetching, updateData, path, navigate, stopDataFetching]);

    return (
        <div className={"bg-page_light dark:bg-page_dark text-text_light dark:text-text_dark min-h-screen"}>
            {configState === 'error' ? <NoConfig /> :
                dataState === 'error' ? <NoData /> :
            (configState === 'default' || dataState === 'default') && <Loading />}
            
            {configState === 'ok' && dataState === 'ok' && <Routes>
                <Route path={relPath() + '/'}               element={ <Status /> } />
                <Route path={relPath() + '/connect'}        element={ <Connect /> } />
                <Route path={relPath() + '/accesspoint'}    element={ <AccessPoint /> } />
                <Route path={relPath() + '/sensors'}        element={ <Sensors /> } />
                <Route path={relPath() + '/wsensors'}       element={ <WSensors /> } />
                <Route path={relPath() + '/weather'}        element={ <Weather /> } />
                <Route path={relPath() + '/clock'}          element={ <Clock /> } />
                <Route path={relPath() + '/alarm'}          element={ <Alarm /> } />
                <Route path={relPath() + '/display'}        element={ <Display1 /> } />
                <Route path={relPath() + '/display1'}       element={ <Display1 /> } />
                <Route path={relPath() + '/display2'}       element={ <Display2 /> } />
                <Route path={relPath() + '/sound'}          element={ <Sound /> } />
                <Route path={relPath() + '/comfort'}        element={ <Comfort /> } />
                <Route path={relPath() + '/history'}        element={ <History /> } />
                <Route path={relPath() + '/receive'}        element={ <ReceiveThingspeak /> } />
                <Route path={relPath() + '/sendthingspeak'} element={ <SendThingspeak /> } />
                <Route path={relPath() + '/sendnarodmon'}   element={ <SendNarodmon /> } />
                <Route path={relPath() + '/sendmqtt'}       element={ <SendMqtt /> } />
                <Route path={relPath() + '/language'}       element={ <Language /> } />
                <Route path={relPath() + '/backup'}         element={ <Backup /> } />
                <Route path={relPath() + '/default'}        element={ <Default /> } /> 
                <Route path={relPath() + '/username'}       element={ <Username /> } />
                <Route path={relPath() + '/userpass'}       element={ <Password /> } />
                <Route path={relPath() + '/login'}          element={ <Login />} />
                <Route path={relPath() + '/*'}              element={ <PageNotFound /> } />
                <Route path={relPath() + '/filesystem'}
                    element={ <Filesystem stopDataFetching={val => setStopDataFetching(val)} /> } />
            </Routes>}
        </div>
    );
}

export default App;
