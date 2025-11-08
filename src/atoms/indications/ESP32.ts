import type { iSensorTconfig } from "../../redux/configTypes/sensors";
import type { iSensorTdata } from "../../redux/dataTypes";
import humanizeDuration from 'humanize-duration';
import * as vl from "../validateValues";

export default function ESP32(conf: iSensorTconfig | undefined, data: iSensorTdata | undefined, runtime: number, lang: string) {
    const locale = lang === 'ua' ? 'uk' : lang;
    const temp = data?.temp ?? 40400;

    return {
        temp: vl.validateTemperature(temp) ? (temp + (conf?.t ?? 0)).toFixed(1) + '°C' : '--',
        runtime: humanizeDuration(runtime * 1000, {
            language: locale, 
            units: ["s"]
        }) 
    }
}