import i18n from "../../i18n/main";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import { useSelector } from 'react-redux';

export default function Forecast() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const temp = data.weather.temp + config.weather.corr.t;
    const hum = data.weather.hum + config.weather.corr.h;
    const pres = data.weather.pres + config.weather.corr.p;

    return {
        temp: vl.validateTemperature(temp) 
            ? (temp.toFixed(2) + '°C') 
            : '--',

        hum: vl.validateHumidity(hum) 
            ? (hum.toFixed(2) + '%') 
            : '--',

        pres: vl.validatePressure(pres) 
            ? (pres.toFixed(2) + i18n.t('units.hpa') + ' / ' 
                + (pres * 0.75).toFixed(2) + i18n.t('units.mm')) 
            : '--'
    }
}