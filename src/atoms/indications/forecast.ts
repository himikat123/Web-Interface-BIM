import { iSensorWeatherConfig } from "../../redux/configTypes";
import { iSensorWeatherData } from "../../redux/dataTypes";
import i18n from "../../i18n/main";
import { PresLocale } from "./hPaMM";
import { windDirStr } from './windDirStr';
import * as vl from "../validateValues";
import * as calculate from "../calculate";

export default function Forecast(conf: iSensorWeatherConfig, data: iSensorWeatherData, units: number) {
    const temp = data.temp + conf.corr.t;
    const hum = data.hum + conf.corr.h;
    const pres = data.pres;
    const wind = data.wind;

    return {
        temp: vl.validateTemperature(data.temp) ? temp.toFixed(1) + '°C' : '--',
        hum: vl.validateHumidity(data.hum) ? (hum.toFixed(1) + '%') : '--',
        pres: vl.validatePressureHPA(data.pres) ? PresLocale(pres, conf.corr.p, units) : '--',
        windSpeed: vl.validateWindSpeed(wind.speed) ? wind.speed.toFixed(1) + i18n.t('units.mps') : '--',
        windDir: vl.validateWindDirection(wind.dir) ? Math.round(wind.dir) + '°' : '--',
        windDirStr: vl.validateWindDirection(wind.dir) ? windDirStr(wind.dir) : '--',
        aHum: calculate.absoluteHum(temp, hum),
        dp: calculate.dewPoint(temp, hum)
    }
}