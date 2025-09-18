import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import * as calculate from "../calculate";
import { TempLocale } from "./celsiusToFahrenheit";
import { PresLocale } from "./hPaMM";
import { useSelector } from 'react-redux';

export default function BME680() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const temp = (data.bme680?.temp ?? 0) + (config.sensors.bme680?.t ?? 0);
    const hum = (data.bme680?.hum ?? 0) + (config.sensors.bme680?.h ?? 0);
    const pres = (data.bme680?.pres ?? 0) + (config.sensors.bme680?.p ?? 0);
    const iaq = (data.bme680?.iaq ?? 0) + (config.sensors.bme680?.i ?? 0);

    return {
        temp: vl.validateTemperature(data.bme680?.temp ?? 40400) 
            ? TempLocale(temp, config.units.temp)
            : '--',
        hum: vl.validateHumidity(data.bme680?.hum ?? 40400) 
            ? hum.toFixed(1) + '%'
            : '--',
        pres: vl.validatePressureHPA(data.bme680?.pres ?? 40400) 
            ? PresLocale(pres) 
            : '--',
        iaq: vl.validateIaq(data.bme680?.iaq ?? -1) 
            ? 'IAQ ' + iaq.toFixed(1) 
            : '--',
        aHum: calculate.absoluteHum(temp, hum),
        dp: calculate.dewPoint(temp, hum, config.units.temp)
    }
}