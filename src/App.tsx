import React, { useEffect } from 'react';
import axios from 'axios';
import { Route, Routes } from "react-router-dom"
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
import Language from './pages/language';
import Backup from './pages/backup';
import Default from './pages/default';
import Username from './pages/username';
import Password from './pages/password';
import { changeLanguage } from './i18n/main';
import { iConfig } from './redux/configTypes';
import { iData } from './redux/dataTypes';
import { configStateChange, setConfigState } from './redux/slices/config';
import { dataStateChange, setDataState } from './redux/slices/data';

function App() {
    const dispatch = useDispatch();
    const configState = useSelector((stateConfig: iConfig) => stateConfig.config.configState);
    const dataState = useSelector((stateData: iData) => stateData.data.dataState);

    useEffect(() => {
        axios("./config.json")
        .then(res => {
            dispatch(configStateChange('ok'));
            dispatch(setConfigState(res.data));
            changeLanguage(res.data.lang);
            localStorage.setItem('lang', res.data.lang);
        })
        .catch(err => {
            dispatch(configStateChange('error'));
            console.error(err);
        })
    }, [dispatch]);
    
    useEffect(() => {
        let dataFetchInterval: NodeJS.Timeout;

        const fetchData = () => {
            axios(`${hostUrl()}/data.json`)
            .then((res) => {
                dispatch(dataStateChange('ok'));
                dispatch(setDataState(res.data));
            })
            .catch(err => {
                dispatch(dataStateChange('error'));
                console.error(err);
            })
        }

        if(configState === 'ok') {
            fetchData();
            dataFetchInterval = setInterval(() => {
                fetchData();
            }, 10000);
        }

        return () => clearInterval(dataFetchInterval);
    }, [configState, dispatch]);

    return (
        <div className={"bg-page_light dark:bg-page_dark text-text_light dark:text-text_dark min-h-screen"}>
            {configState === 'error' ? <NoConfig /> :
                dataState === 'error' ? <NoData /> :
            (configState === 'default' || dataState === 'default') && <Loading />}
            
            {configState === 'ok' && dataState === 'ok' && <Routes>
                <Route path="/"               element={ <Status /> }>            </Route>
                <Route path="/connect"        element={ <Connect /> }>           </Route>
                <Route path="/accesspoint"    element={ <AccessPoint /> }>       </Route>
                <Route path="/sensors"        element={ <Sensors /> }>           </Route>
                <Route path="/wsensors"       element={ <WSensors /> }>          </Route>
                <Route path="/weather"        element={ <Weather /> }>           </Route>
                <Route path="/clock"          element={ <Clock /> }>             </Route>
                <Route path="/alarm"          element={ <Alarm /> }>             </Route>
                <Route path="/display1"       element={ <Display1 /> }>          </Route>
                <Route path="/display2"       element={ <Display2 /> }>          </Route>
                <Route path='/sound'          element={ <Sound /> }>             </Route>
                <Route path='/comfort'        element={ <Comfort /> }>           </Route>
                <Route path='/history'        element={ <History /> }>           </Route>
                <Route path='/receive'        element={ <ReceiveThingspeak /> }> </Route>
                <Route path='/sendthingspeak' element={ <SendThingspeak /> }>    </Route>
                <Route path='/sendnarodmon'   element={ <SendNarodmon /> }>      </Route>
                <Route path="/language"       element={ <Language /> }>          </Route>
                <Route path="/backup"         element={ <Backup /> }>            </Route>
                <Route path="/default"        element={ <Default /> }>           </Route> 
                <Route path="/username"       element={ <Username /> }>          </Route>
                <Route path="/userpass"       element={ <Password /> }>          </Route>
                <Route path="/*"              element={ <PageNotFound /> }>      </Route>
            </Routes>}
        </div>
    );
}

export default App;
