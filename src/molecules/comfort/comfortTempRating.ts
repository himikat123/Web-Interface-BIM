import store from '../../redux/store';
import device from '../../device';
import * as vl from "../../atoms/validateValues";

export default function comfortTempRating() {
    const config = store.getState().config;
    const data = store.getState().data;
    const wsensNum = 'wsensNum' in config.comfort.temp ? config.comfort.temp.wsensNum : 0;
    const sens = 'sens' in config.comfort.temp ? config.comfort.temp.sens : 0;
    const cs = device() === 'WeatherMonitorBIM'
        ? [1, -1, 2, 3, 4, 5, 6, 7, -2]
        : [1, 2, 3, 4, 5, 6, 7, 8, 9] 

    let temp = 40400;
    switch(config.comfort.temp.source) {
        case cs[0]: temp = data.weather.temp + config.weather.corr.t; break; // temperature from weather forecast
        case cs[1]: temp = (data.wsensor?.temp.data[sens][wsensNum] ?? 0) + (config.wsensor?.temp.corr[wsensNum][sens] ?? 0); break; // temperature from wireless sensor
        case cs[2]: temp = data.thing?.data ? data.thing?.data[config.comfort.temp.thing] : -40400; break; // temperature from thingspeak
        case cs[3]: temp = data.bme280.temp + config.sensors.bme280.t; break; // temperature from BME280
        case cs[4]: temp = data.bmp180.temp + config.sensors.bmp180.t; break; // temperature from BMP180
        case cs[5]: temp = data.sht21.temp + config.sensors.sht21.t; break; // temperature from SHT21
        case cs[6]: temp = data.dht22.temp + config.sensors.dht22.t; break; // temperature from DHT22
        case cs[7]: temp = data.ds18b20.temp + config.sensors.ds18b20.t; break; // temperature from DS18B20
        case cs[8]: temp = (data.bme680?.temp ?? 0) + (config.sensors.bme680?.t ?? 0); break; // temperature from BME680
        default: ; break;
    }

    let comfort = 0;
    if(vl.validateTemperature(temp)) {
        if(temp > (Array.isArray(config.comfort.temp.max)
            ? config.comfort.temp.max[0]
            : config.comfort.temp.max
        )) comfort = 1;
        if(temp < (Array.isArray(config.comfort.temp.min)
            ? config.comfort.temp.min[0]
            : config.comfort.temp.min
        )) comfort = 2;
    }
    else comfort = -1;

    return comfort;
}