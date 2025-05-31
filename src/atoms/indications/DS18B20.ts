import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import { TempLocale } from "./celsiusToFahrenheit";
import { useSelector } from 'react-redux';

export default function DS18B20() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    return {
        temp: vl.validateTemperature(data.ds18b20.temp) 
            ? TempLocale(data.ds18b20.temp + config.sensors.ds18b20.t)
            : '--'
    }
}