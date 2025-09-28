import { useSelector } from 'react-redux';
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import * as calculate from "../calculate";

export default function DHT22() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const temp = data.dht22.temp + config.sensors.dht22.t;
    const hum = data.dht22.hum + config.sensors.dht22.h;

    return {
        temp: vl.validateTemperature(data.dht22.temp) 
            ? temp.toFixed(1) + '°C'
            : '--',
        hum: vl.validateHumidity(data.dht22.hum) 
            ? hum.toFixed(1) + '%'
            : '--',
        aHum: calculate.absoluteHum(temp, hum),
        dp: calculate.dewPoint(temp, hum)
    }
}