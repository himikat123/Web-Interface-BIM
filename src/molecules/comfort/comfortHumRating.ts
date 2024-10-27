import store from '../../redux/store';
import device from '../../device';
import * as vl from "../../atoms/validateValues";

export default function comfortHumRating() {
    const config = store.getState().config;
    const data = store.getState().data;

    let hum = 40400;
    switch(config.comfort.hum.source) {
        case 1: hum = data.weather.hum; break; // humidity from weather forecast
        case (device() === 'WeatherMonitorBIM32' ? 2 : 400): // humidity from wireless sensor
            hum = data.wsensor.hum.data[config.comfort.hum.wsensNum] + config.wsensor.hum.corr[config.comfort.temp.wsensNum];
            break;
        case (device() === 'WeatherMonitorBIM32' ? 3 : 2): // humidity from thingspeak
            hum = data.thing?.data ? data.thing?.data[config.comfort.hum.thing] : -40400;
            break;
        case (device() === 'WeatherMonitorBIM32' ? 4 : 3): // humidity from BME280
            hum = data.bme280.hum + config.sensors.bme280.h; 
            break;
        case (device() === 'WeatherMonitorBIM32' ? 5 : 4): // humidity from SHT21
            hum = data.sht21.hum + config.sensors.sht21.h; 
            break;
        case (device() === 'WeatherMonitorBIM32' ? 6 : 5): // humidity from DHT22
            hum = data.dht22.hum + config.sensors.dht22.h; 
            break;
        case (device() === 'WeatherMonitorBIM32' ? 7 : 401): // humidity from BME680
            hum = data.bme680.hum + config.sensors.bme680.h; 
            break;
    }

    let comfort = 0;
    if(vl.validateHumidity(hum)) {
        if(hum > config.comfort.hum.max[0]) comfort = 1;
        if(hum < config.comfort.hum.min[0]) comfort = 2;
    }
    else comfort = -1; //'--';

    return comfort;
}