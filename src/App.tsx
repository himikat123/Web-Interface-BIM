import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
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
import { iConfig } from './redux/configTypes';
import { iAlarms } from './redux/alarmTypes';
import { iData } from './redux/dataTypes';
import { updateDataChange } from './redux/slices/data';
import configFetch from './configFetch';
import dataFetch from './dataFetch';
import { historyFetch } from './historyFetch';
import { hourlyFetch } from './hourlyFetch';
import { iHistory } from './redux/historyTypes';
import { iHourly } from './redux/hourlyTypes';
import moment from 'moment';

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
    const history = useSelector((state: iHistory) => state.history);
    const hourly = useSelector((state: iHourly) => state.hourly);
    const apMode = window.location.origin.toString().includes('192.168.4.1');

    useEffect(() => {
        configFetch();
    }, []);
    
    useEffect(() => {
        let dataFetchInterval: NodeJS.Timeout;

        function fetchData() {
            const nav = dataFetch(path);
            if(nav) navigate(nav);

            if(moment().unix() - history.updated > 600) historyFetch(apMode);
            if(moment().unix() - hourly.updated > 600) hourlyFetch(apMode);
        }

        if(configState === 'ok' && alarmsState === 'ok') {
            dataFetchInterval = setInterval(() => {
                dispatch(updateDataChange(true));
            }, 5000);

            if(updateData && !dataFetching) {
                if(path !== '/default') {
                    if(path === '/filesystem') {
                        if(!stopDataFetching) fetchData();
                    }
                    else fetchData();
                }
            }
        }

        return () => clearInterval(dataFetchInterval);
    }, [
        configState, alarmsState, dispatch, dataFetching, updateData, 
        path, navigate, stopDataFetching, history.updated, hourly.updated
    ]);

    useEffect(() => {
        dispatch(updateDataChange(true));
    }, [dispatch]);

    return (
        <div className={"bg-page_light dark:bg-page_dark text-text_light dark:text-text_dark min-h-screen"}>
            {configState === 'error' ? <NoConfig /> :
                dataState === 'error' ? <NoData /> :
            (configState === 'default' || dataState === 'default') && <Loading />}
            
            {configState === 'ok' && dataState === 'ok' && <Routes>
                <Route path={'/'}               element={ <Status /> } />
                <Route path={'/connect'}        element={ <Connect /> } />
                <Route path={'/accesspoint'}    element={ <AccessPoint /> } />
                <Route path={'/sensors'}        element={ <Sensors /> } />
                <Route path={'/wsensors'}       element={ <WSensors /> } />
                <Route path={'/weather'}        element={ <Weather /> } />
                <Route path={'/clock'}          element={ <Clock /> } />
                <Route path={'/alarm'}          element={ <Alarm /> } />
                <Route path={'/display'}        element={ <Display1 /> } />
                <Route path={'/display1'}       element={ <Display1 /> } />
                <Route path={'/display2'}       element={ <Display2 /> } />
                <Route path={'/sound'}          element={ <Sound /> } />
                <Route path={'/comfort'}        element={ <Comfort /> } />
                <Route path={'/history'}        element={ <History /> } />
                <Route path={'/receive'}        element={ <ReceiveThingspeak /> } />
                <Route path={'/sendthingspeak'} element={ <SendThingspeak /> } />
                <Route path={'/sendnarodmon'}   element={ <SendNarodmon /> } />
                <Route path={'/sendmqtt'}       element={ <SendMqtt /> } />
                <Route path={'/language'}       element={ <Language /> } />
                <Route path={'/backup'}         element={ <Backup /> } />
                <Route path={'/default'}        element={ <Default /> } /> 
                <Route path={'/username'}       element={ <Username /> } />
                <Route path={'/userpass'}       element={ <Password /> } />
                <Route path={'/login'}          element={ <Login />} />
                <Route path={'/*'}              element={ <PageNotFound /> } />
                <Route path={'/filesystem'}     element={ <Filesystem
                    dataFetching={dataFetching} 
                    stopDataFetching={val => setStopDataFetching(val)} 
                /> } />
            </Routes>}
        </div>
    );
}

export default App;
