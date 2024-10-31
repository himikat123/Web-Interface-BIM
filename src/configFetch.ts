import store from "./redux/store";
import axios from "axios";
import device from "./device";
import hostUrl from "./atoms/hostUrl";
import { changeLanguage } from "./i18n/main";
import { configStateChange, setConfigState, displayModelChange } from "./redux/slices/config";
import { alarmsStateChange, setAlarmState } from "./redux/slices/alarm";

export default function configFetch() {
    axios(`${hostUrl()}/config.json?code=${localStorage.getItem('code') || '0'}`)
    .then(res => {
        store.dispatch(configStateChange('ok'));
        store.dispatch(setConfigState(res.data));
        if(device() === 'WeatherMonitorBIM') store.dispatch(displayModelChange({num: 0, val: 2}));
        changeLanguage(res.data.lang);
        localStorage.setItem('lang', res.data.lang);
    })
    .catch(err => {
        store.dispatch(configStateChange('error'));
        console.error(err);
    });
    axios(`${hostUrl()}/alarm.json?code=${localStorage.getItem('code') || '0'}`)
    .then(res => {
        store.dispatch(alarmsStateChange('ok'));
        store.dispatch(setAlarmState(res.data));
    })
    .catch(err => {
        store.dispatch(alarmsStateChange('error'));
        console.error(err);
    });
}