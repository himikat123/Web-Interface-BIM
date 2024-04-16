import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import { useSelector } from 'react-redux';
import * as vl from "../../atoms/validateValues";

export default function DHT22() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    return {
        temp: `DHT22 (${vl.validateTemperature(data.dht22.temp) 
            ? ((data.dht22.temp + config.sensors.dht22.t).toFixed(2) + '°C') 
            : '--'})`,
        
        hum: `DHT22 (${vl.validateHumidity(data.dht22.hum) 
            ? ((data.dht22.hum + config.sensors.dht22.h).toFixed(2) + '%') 
            : '--'})`
    }
}