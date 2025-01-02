import store from '../../redux/store';
import device from '../../device';
import * as vl from "../../atoms/validateValues";

export default function comfortHumRating() {
    const config = store.getState().config;
    const data = store.getState().data;
    const wsensNum = 'wsensNum' in config.comfort.hum ? config.comfort.hum.wsensNum : 0;
    const cs = device() === 'WeatherMonitorBIM'
        ? [1, -1, 2, 3, 4, 5, -2]
        : [1, 2, 3, 4, 5, 6, 7]

    let hum = 40400;
    switch(config.comfort.hum.source) {
        case cs[0]: hum = data.weather.hum + config.weather.corr.h; break; // humidity from weather forecast
        case cs[1]: hum = (data.wsensor?.hum.data[wsensNum] ?? 0) + (config.wsensor?.hum.corr[wsensNum] ?? 0); break; // humidity from wireless sensor
        case cs[2]: hum = data.thing?.data ? data.thing?.data[config.comfort.hum.thing] : -40400; break; // humidity from thingspeak
        case cs[3]: hum = data.bme280.hum + config.sensors.bme280.h; break; // humidity from BME280
        case cs[4]: hum = data.sht21.hum + config.sensors.sht21.h; break; // humidity from SHT21
        case cs[5]: hum = data.dht22.hum + config.sensors.dht22.h; break; // humidity from DHT22
        case cs[6]: hum = (data.bme680?.hum ?? 0) + (config.sensors.bme680?.h ?? 0); break; // humidity from BME680
        default: ; break;
    }

    let comfort = 0;
    if(vl.validateHumidity(hum)) {
        if(hum > (Array.isArray(config.comfort.hum.max)
            ? config.comfort.hum.max[0]
            : config.comfort.hum.max
        )) comfort = 1;
        if(hum < (Array.isArray(config.comfort.hum.min)
            ? config.comfort.hum.min[0]
            : config.comfort.hum.min
        )) comfort = 2;
    }
    else comfort = -1; //'--';

    return comfort;
}