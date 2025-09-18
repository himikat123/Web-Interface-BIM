import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import { TempLocale } from "./celsiusToFahrenheit";
import { PresLocale } from "./hPaMM";
import { useSelector } from 'react-redux';

export default function BMP180() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    return {
        temp: vl.validateTemperature(data.bmp180.temp) 
            ? TempLocale(data.bmp180.temp + config.sensors.bmp180.t, config.units.temp) 
            : '--',
        pres: vl.validatePressureHPA(data.bmp180.pres) 
            ? PresLocale(data.bmp180.pres + config.sensors.bmp180.p)
            : '--'
    }
}