import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import { useSelector } from 'react-redux';
import * as vl from "../validateValues";

export default function SHT21() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    return {
        temp: vl.validateTemperature(data.sht21.temp) 
            ? ((data.sht21.temp + config.sensors.sht21.t).toFixed(2) + '°C') 
            : '--',
        
        hum: vl.validateHumidity(data.sht21.hum) 
            ? ((data.sht21.hum + config.sensors.sht21.h).toFixed(2) + '%') 
            : '--'
    }
}