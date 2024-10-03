import store from '../../redux/store';
import * as vl from "../validateValues";

function lcdGetHum(wsensNum: number, thingNum: number, source: number) {
    const config = store.getState().config;
    const data = store.getState().data;
    let hum = 40400.0;

    switch(source) {
        case 1: hum = data.weather.hum; break;
        case 2: if(vl.WsensorDataRelevance(wsensNum)) {
            hum = vl.validateHumidity(data.wsensor.hum.data[wsensNum]) 
                ? data.wsensor.hum.data[wsensNum] + config.wsensor.hum.corr[wsensNum] 
                : 40400
        }; break;
        case 3: if(vl.ThingspeakDataRelevance()) {
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
        case 4: hum = data.bme280.hum + config.sensors.bme280.h; break;
        case 5: hum = data.sht21.hum + config.sensors.sht21.h; break;
        case 6: hum = data.dht22.hum + config.sensors.dht22.h; break;
        case 7: hum = data.bme680.hum + config.sensors.bme680.h; break;
        default: ; break;
    }
    return Math.round(hum);
}

export function lcdGetHumOut() {
    const config = store.getState().config;
    const wsensNum = config.display.source.humOut.wsensNum;
    const thingNum = config.display.source.humOut.thing;
    const source = config.display.source.humOut.sens;
    return lcdGetHum(wsensNum, thingNum, source);
}

export function lcdGetHumSequence(slot: number) {
    const config = store.getState().config;
    const wsensNum = config.display.source.sequence.wsenshum[slot];
    const thingNum = config.display.source.sequence.thnghum[slot];
    const source = config.display.source.sequence.hum[slot];
    return lcdGetHum(wsensNum, thingNum, source);
}