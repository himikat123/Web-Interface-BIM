import { iSensorTPconfig } from "../../redux/configTypes";
import { iSensorTPdata } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import { PresLocale } from "./hPaMM";

export default function tempPres(conf: iSensorTPconfig, data: iSensorTPdata, units: number) {
    return {
        temp: vl.validateTemperature(data.temp) ? (data.temp + conf.t).toFixed(1) + '°C' : '--',
        pres: vl.validatePressureHPA(data.pres) ? PresLocale(data.pres, conf.p, units) : '--'
    }
}