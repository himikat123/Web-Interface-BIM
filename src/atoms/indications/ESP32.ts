import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import { useSelector } from 'react-redux';

export default function ESP32() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    return {
        temp: vl.validateTemperature(data.esp32.temp) 
            ? ((data.esp32.temp + config.sensors.esp32.t).toFixed(2) + '°C') 
            : '--',

        runtime: data.runtime
    }
}