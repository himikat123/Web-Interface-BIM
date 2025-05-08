import i18n from "../../i18n/main";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import * as calculate from "../calculate";
import { useSelector } from 'react-redux';

export default function BME280() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const temp = data.bme280.temp + config.sensors.bme280.t;
    const hum = data.bme280.hum + config.sensors.bme280.h;
    const pres = data.bme280.pres + config.sensors.bme280.p;

    return {
        temp: vl.validateTemperature(data.bme280.temp) 
            ? (temp.toFixed(1) + '°C') 
            : '--',
        hum: vl.validateHumidity(data.bme280.hum) 
            ? (hum.toFixed(1) + '%') 
            : '--',
        pres: vl.validatePressure(data.bme280.pres) 
            ? (pres.toFixed(1) + i18n.t('units.hpa') + ' / ' + (pres * 0.75).toFixed(1) + i18n.t('units.mm')) 
            : '--',
        aHum: calculate.absoluteHum(temp, hum),
        dp: calculate.dewPoint(temp, hum)
    }
}