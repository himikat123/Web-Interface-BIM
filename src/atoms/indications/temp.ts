import type { iSensorTconfig } from "../../redux/configTypes/sensors";
import type { iSensorTdata } from "../../redux/dataTypes";
import * as vl from "../validateValues";

export default function temp(conf: iSensorTconfig, data: iSensorTdata) {
    return vl.validateTemperature(data.temp) ? (data.temp + conf.t).toFixed(1) + '°C' : '--';
}