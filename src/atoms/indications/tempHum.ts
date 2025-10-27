import { iSensorTHconfig } from "../../redux/configTypes";
import { iSensorTHdata } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import * as calculate from "../calculate";

export default function tempHum(conf: iSensorTHconfig, data: iSensorTHdata) {
    const temp = data.temp + conf.t;
    const hum = data.hum + conf.h;

    return {
        temp: vl.validateTemperature(data.temp) ? temp.toFixed(1) + '°C' : '--',
        hum: vl.validateHumidity(data.hum) ? hum.toFixed(1) + '%' : '--',
        aHum: calculate.absoluteHum(temp, hum),
        dp: calculate.dewPoint(temp, hum)
    }
}