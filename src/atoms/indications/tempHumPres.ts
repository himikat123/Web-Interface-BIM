import type { iSensorTHPconfig } from "../../redux/configTypes/sensors";
import type { iSensorTHPdata } from "../../redux/dataTypes/sensors";
import * as vl from "../validateValues";
import * as calculate from "../calculate";
import { PresLocale } from "./hPaMM";

export default function tempHumPres(conf: iSensorTHPconfig, data: iSensorTHPdata, units:number) {
    const temp = data.temp + conf.t;
    const hum = data.hum + conf.h;

    return {
        temp: vl.validateTemperature(data.temp) ? temp.toFixed(1) + '°C' : '--',
        hum: vl.validateHumidity(data.hum)  ? hum.toFixed(1) + '%'  : '--',
        pres: vl.validatePressureHPA(data.pres) ? PresLocale(data.pres, conf.p, units) : '--',
        aHum: calculate.absoluteHum(temp, hum),
        dp: calculate.dewPoint(temp, hum)
    }
}