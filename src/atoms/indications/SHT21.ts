import { useSelector } from 'react-redux';
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import * as calculate from "../calculate";

export default function SHT21() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const temp = data.sht21.temp + config.sensors.sht21.t;
    const hum = data.sht21.hum + config.sensors.sht21.h;

    return {
        temp: vl.validateTemperature(data.sht21.temp) 
            ? temp.toFixed(1) + '°C'
            : '--',
        hum: vl.validateHumidity(data.sht21.hum) 
            ? hum.toFixed(1) + '%'
            : '--',
        aHum: calculate.absoluteHum(temp, hum),
        dp: calculate.dewPoint(temp, hum)
    }
}