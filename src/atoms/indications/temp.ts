import { iSensorTconfig } from "../../redux/configTypes";
import { iSensorTdata } from "../../redux/dataTypes";
import * as vl from "../validateValues";

export default function temp(conf: iSensorTconfig, data: iSensorTdata) {
    return vl.validateTemperature(data.temp) ? (data.temp + conf.t).toFixed(1) + '°C' : '--';
}