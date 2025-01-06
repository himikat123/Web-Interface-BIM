import device from '../../device';
import store from '../../redux/store';
import * as vl from "../validateValues";

export default function lcdGetTempIn(sequenceTemp: number) {
    const config = store.getState().config;
    const data = store.getState().data;

    let temp = 40400.0;
    const wsensNum = config.display.source.tempIn.wsensNum ?? 0;
    const wsensTempNum = config.display.source.tempIn.temp ?? 0;
    const thingNum = config.display.source.tempIn.thing;
    const cs = device() === 'WeatherMonitorBIM' 
        ? [1, -1, 2, -2, 3, 4, 5, 6, 7, -3] 
        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    switch(config.display.source.tempIn.sens) {
        case cs[0]: temp = data.weather.temp + config.weather.corr.t; break;
        case cs[1]: if(vl.WsensorDataRelevance(wsensNum)) {
            temp = vl.validateTemperature(data.wsensor?.temp.data[wsensTempNum][wsensNum] ?? 0) 
                ? (data.wsensor?.temp.data[wsensTempNum][wsensNum] ?? 0) + (config.wsensor?.temp.corr[wsensNum][wsensTempNum] ?? 0) 
                : 40400
        }; break;
        case cs[2]: if(vl.ThingspeakDataRelevance()) {
            temp = vl.validateThingspeak(
                data.thing?.data 
                    ? data.thing?.data[thingNum] 
                    : -40400
            )
            ? data.thing?.data 
                ? data.thing?.data[thingNum] 
                : 40400 
            : 40400
        }; break;
        case cs[3]: temp = sequenceTemp; break;
        case cs[4]: temp = data.bme280.temp + config.sensors.bme280.t; break;
        case cs[5]: temp = data.bmp180.temp + config.sensors.bmp180.t; break;
        case cs[6]: temp = data.sht21.temp + config.sensors.sht21.t; break;
        case cs[7]: temp = data.dht22.temp + config.sensors.dht22.t; break;
        case cs[8]: temp = data.ds18b20.temp + config.sensors.ds18b20.t; break;
        case cs[9]: temp = (data.bme680?.temp ?? 0) + (config.sensors.bme680?.t ?? 0); break;
        default: ; break;
    }
    return Math.round(temp);
}