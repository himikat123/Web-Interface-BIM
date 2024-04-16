import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../../atoms/validateValues";
import { useSelector } from 'react-redux';

export default function DS18B20() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    return {
        temp: `DS18B20 (${vl.validateTemperature(data.ds18b20.temp) 
            ? ((data.ds18b20.temp + config.sensors.ds18b20.t).toFixed(2) + '°C') 
            : '--'})`
    }
}