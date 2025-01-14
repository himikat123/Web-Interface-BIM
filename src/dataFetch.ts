import axios from "axios";
import { dataFetchingChange, dataStateChange, setDataState, updateDataChange } from "./redux/slices/data";
import store from "./redux/store";
import hostUrl from "./atoms/hostUrl";

export default async function dataFetch(path: string): Promise<string> {
    let navigate = '';

    try {
        store.dispatch(dataFetchingChange(true));
        const res = await axios(`${hostUrl()}/data.json?code=${localStorage.getItem('code') || '0'}`);
        
        store.dispatch(dataStateChange('ok'));
        store.dispatch(dataFetchingChange(false));
        store.dispatch(updateDataChange(false));

        let resData = { ...res.data };

        if (res.data.state === 'DEMO') {
            const date = new Date();
            const timezoneOffset = date.getTimezoneOffset();
            resData.time = Math.round(Date.now() / 1000 - timezoneOffset * 60);
            resData.runtime = Math.round(Date.now() / 1000 - 1736864436);
            resData.wsensor.time[0] = Math.round(resData.time - 8 * 60);
            resData.wsensor.time[1] = Math.round(resData.time - 12 * 60);
            resData.weather.time = Math.round(resData.time - 15 * 60);
            resData.thing.time = Math.round(resData.time - 7 * 60);
        }

        if (res.data.state === 'OK' && path === '/login') navigate = '/';
        if (res.data.state === 'LOGIN' && path !== '/login') navigate = '/login';

        store.dispatch(setDataState(resData));
    } catch (err) {
        store.dispatch(dataStateChange('error'));
        console.error(err);
        store.dispatch(dataFetchingChange(false));
        store.dispatch(updateDataChange(false));
    }

    return navigate;
}