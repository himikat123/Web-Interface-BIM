import store from '../../redux/store';
import device from '../../device';
import * as vl from "../../atoms/validateValues";

export default function comfortTempRating() {
    const config = store.getState().config;
    const data = store.getState().data;

    let temp = 40400;
    switch(config.comfort.temp.source) {
        case 1: temp = data.weather.temp; break; // temperature from weather forecast
        case (device() === 'WeatherMonitorBIM32' ? 2 : 400): // temperature from wireless sensor
            temp = data.wsensor.temp.data[config.comfort.temp.sens][config.comfort.temp.wsensNum] + config.wsensor.temp.corr[config.comfort.temp.wsensNum][config.comfort.temp.sens];
            break;
        case (device() === 'WeatherMonitorBIM32' ? 3 : 2): // temperature from thingspeak
            temp = data.thing?.data ? data.thing?.data[config.comfort.temp.thing] : -40400;
            break;
        case (device() === 'WeatherMonitorBIM32' ? 4 : 3): // temperature from BME280 
            temp = data.bme280.temp + config.sensors.bme280.t; 
            break;
        case (device() === 'WeatherMonitorBIM32' ? 5 : 4): // temperature from BMP180
            temp = data.bmp180.temp + config.sensors.bmp180.t; 
            break;
        case (device() === 'WeatherMonitorBIM32' ? 6 : 5): // temperature from SHT21
            temp = data.sht21.temp + config.sensors.sht21.t; 
            break;
        case (device() === 'WeatherMonitorBIM32' ? 7 : 6): // temperature from DHT22 
            temp = data.dht22.temp + config.sensors.dht22.t; 
            break;
        case (device() === 'WeatherMonitorBIM32' ? 8 : 7): // temperature from DS18B20 
            temp = data.ds18b20.temp + config.sensors.ds18b20.t; 
            break;
        case (device() === 'WeatherMonitorBIM32' ? 9 : 401): // temperature from BME680 
            temp = data.bme680.temp + config.sensors.bme680.t; 
            break;
    }

    let comfort = 0;
    if(vl.validateTemperature(temp)) {
        if(temp > config.comfort.temp.max[0]) comfort = 1;
        if(temp < config.comfort.temp.min[0]) comfort = 2;
    }
    else comfort = -1;

    return comfort;
}