import store from '../../redux/store';
import device from '../../device';
import * as vl from "../validateValues";

export default function lcdGetHumIn(sequenceHum: number) {
    const config = store.getState().config;
    const data = store.getState().data;

    let hum = 40400.0;
    const wsensNum = config.display.source.humIn.wsensNum ?? 0;
    const thingNum = config.display.source.humIn.thing;
    const cs = device() === 'WeatherMonitorBIM' 
        ? [1, -1, 2, -2, 3, 4, 5, -3] 
        : [1, 2, 3, 4, 5, 6, 7, 8];

    switch(config.display.source.humIn.sens) {
        case cs[0]: hum = data.weather.hum; break;
        case cs[1]: if(vl.WsensorDataRelevance(wsensNum)) {
            hum = vl.validateHumidity(data.wsensor.hum.data[wsensNum]) 
                ? data.wsensor.hum.data[wsensNum] + config.wsensor.hum.corr[wsensNum] 
                : 40400
        }; break;
        case cs[2]: if(vl.ThingspeakDataRelevance()) {
            hum = vl.validateThingspeak(
                data.thing?.data 
                    ? data.thing?.data[thingNum] 
                    : -40400
            )
            ? data.thing?.data 
                ? data.thing?.data[thingNum] 
                : 40400 
            : 40400
        }; break;
        case cs[3]: hum = sequenceHum; break;
        case cs[4]: hum = data.bme280.hum + config.sensors.bme280.h; break;
        case cs[5]: hum = data.sht21.hum + config.sensors.sht21.h; break;
        case cs[6]: hum = data.dht22.hum + config.sensors.dht22.h; break;
        case cs[7]: hum = data.bme680.hum + config.sensors.bme680.h; break;
        default: ; break;
    }
    return Math.round(hum);
}