import { useSelector } from 'react-redux';
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import { PresLocale } from "./hPaMM";

export default function BMP180() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    return {
        temp: vl.validateTemperature(data.bmp180.temp) 
            ? (data.bmp180.temp + config.sensors.bmp180.t).toFixed(1) + '°C' 
            : '--',
        pres: vl.validatePressureHPA(data.bmp180.pres) 
            ? PresLocale(data.bmp180.pres, config.sensors.bmp180.p)
            : '--'
    }
}