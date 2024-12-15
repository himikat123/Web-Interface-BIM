import store from '../../redux/store';
import device from '../../device';
import * as vl from "../validateValues";

function lcdGetTemp(wsensNum: number, wsensTempNum: number, thingNum: number, source: number) {
    const config = store.getState().config;
    const data = store.getState().data;
    let temp = 40400.0;
    const cs = device() === 'WeatherMonitorBIM' 
        ? [1, -1, 2, 3, 4, 5, 6, 7, -2] 
        : [1, 2, 3, 4, 5, 6, 7, 8, 9];

    switch(source) {
        case cs[0]: temp = data.weather.temp; break;
        case cs[1]: if(vl.WsensorDataRelevance(wsensNum)) {
            temp = vl.validateTemperature(data.wsensor.temp.data[wsensTempNum][wsensNum]) 
                ? data.wsensor.temp.data[wsensTempNum][wsensNum] + config.wsensor.temp.corr[wsensNum][wsensTempNum] 
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
        case cs[3]: temp = data.bme280.temp + config.sensors.bme280.t; break;
        case cs[4]: temp = data.bmp180.temp + config.sensors.bmp180.t; break;
        case cs[5]: temp = data.sht21.temp + config.sensors.sht21.t; break;
        case cs[6]: temp = data.dht22.temp + config.sensors.dht22.t; break;
        case cs[7]: temp = data.ds18b20.temp + config.sensors.ds18b20.t; break;
        case cs[8]: temp = data.bme680.temp + config.sensors.bme680.t; break;
        default: ; break;
    }
    return Math.round(temp);
}

export function lcdGetTempOut(): number {
    const config = store.getState().config;
    const wsensNum = config.display.source.tempOut.wsensNum ?? 0;
    const wsensTempNum = config.display.source.tempOut.temp ?? 0;
    const thingNum = config.display.source.tempOut.thing;
    const source = config.display.source.tempOut.sens;
    return lcdGetTemp(wsensNum, wsensTempNum, thingNum, source);
}

export function lcdGetTempSequence(slot: number): number {
    const config = store.getState().config;
    const wsensNum = config.display.source.sequence?.wsenstemp[slot][0] ?? 0;
    const wsensTempNum = config.display.source.sequence?.wsenstemp[slot][1] ?? 0;
    const thingNum = config.display.source.sequence?.thngtemp[slot] ?? 0;
    const source = config.display.source.sequence?.temp[slot] ?? 0;
    return lcdGetTemp(wsensNum, wsensTempNum, thingNum, source);
}