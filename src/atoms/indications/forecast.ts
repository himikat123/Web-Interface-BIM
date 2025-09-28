import { useSelector } from 'react-redux';
import i18n from "../../i18n/main";
import { PresLocale } from "./hPaMM";
import { windDirStr } from './windDirStr';
import * as vl from "../validateValues";
import * as calculate from "../calculate";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";

export default function Forecast() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const temp = data.weather.temp + config.weather.corr.t;
    const hum = data.weather.hum + config.weather.corr.h;
    const pres = data.weather.pres;
    const wind = data.weather.wind;

    return {
        temp: vl.validateTemperature(data.weather.temp) 
            ? temp.toFixed(1) + '°C' 
            : '--',
        hum: vl.validateHumidity(data.weather.hum) 
            ? (hum.toFixed(1) + '%') 
            : '--',
        pres: vl.validatePressureHPA(data.weather.pres) 
            ? PresLocale(pres, config.weather.corr.p) 
            : '--',
        windSpeed: vl.validateWindSpeed(wind.speed)
            ? wind.speed.toFixed(1) + i18n.t('units.mps')
            : '--',
        windDir: vl.validateWindDirection(wind.dir)
            ? Math.round(wind.dir) + '°'
            : '--',
        windDirStr: vl.validateWindDirection(wind.dir)
            ? windDirStr(wind.dir)
            : '--',
        aHum: calculate.absoluteHum(temp, hum),
        dp: calculate.dewPoint(temp, hum)
    }
}