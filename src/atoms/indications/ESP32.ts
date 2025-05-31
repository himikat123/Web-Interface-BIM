import humanizeDuration from 'humanize-duration';
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import { TempLocale } from './celsiusToFahrenheit';
import { useSelector } from 'react-redux';

export default function ESP32() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const locale = config.lang === 'ua' ? 'uk' : config.lang;

    return {
        temp: vl.validateTemperature(data.esp32?.temp ?? 40400) 
            ? TempLocale((data.esp32?.temp ?? 0) + (config.sensors.esp32?.t ?? 0)) 
            : '--',
        runtime: humanizeDuration(data.runtime * 1000, {
            language: locale, 
            units: ["s"]
        }) 
    }
}