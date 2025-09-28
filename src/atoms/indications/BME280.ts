import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import * as calculate from "../calculate";
import { PresLocale } from "./hPaMM";
import { useSelector } from 'react-redux';

export default function BME280() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const temp = data.bme280.temp + config.sensors.bme280.t;
    const hum = data.bme280.hum + config.sensors.bme280.h;
    const pres = data.bme280.pres;

    return {
        temp: vl.validateTemperature(data.bme280.temp) 
            ? temp.toFixed(1) + '°C'
            : '--',
        hum: vl.validateHumidity(data.bme280.hum) 
            ? (hum.toFixed(1) + '%') 
            : '--',
        pres: vl.validatePressureHPA(data.bme280.pres) 
            ? PresLocale(pres, config.sensors.bme280.p) 
            : '--',
        aHum: calculate.absoluteHum(temp, hum),
        dp: calculate.dewPoint(temp, hum)
    }
}