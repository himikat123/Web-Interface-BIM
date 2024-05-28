import store from '../redux/store';
import * as vl from "./validateValues";

export default function lcdGetTempIn(sequenceTemp: number) {
    const config = store.getState().config;
    const data = store.getState().data;

    let temp = 40400.0;
    const wsensNum = config.display.source.tempIn.wsensNum;
    const wsensTempNum = config.display.source.tempIn.temp;
    const thingNum = config.display.source.tempIn.thing;

    switch(config.display.source.tempIn.sens) {
        case 1: temp = data.weather.temp; break;
        case 2: if(vl.WsensorDataRelevance(wsensNum)) {
            temp = vl.validateTemperature(data.wsensor.temp.data[wsensTempNum][wsensNum]) 
                ? data.wsensor.temp.data[wsensTempNum][wsensNum] + config.wsensor.temp.corr[wsensNum][wsensTempNum] 
                : 40400
        }; break;
        case 3: if(vl.ThingspeakDataRelevance()) {
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
        case 4: temp = sequenceTemp; break;
        case 5: temp = data.bme280.temp + config.sensors.bme280.t; break;
        case 6: temp = data.bmp180.temp + config.sensors.bmp180.t; break;
        case 7: temp = data.sht21.temp + config.sensors.sht21.t; break;
        case 8: temp = data.dht22.temp + config.sensors.dht22.t; break;
        case 9: temp = data.ds18b20.temp + config.sensors.ds18b20.t; break;
        case 10: temp = data.bme680.temp + config.sensors.bme680.t; break;
        default: ; break;
    }
    return Math.round(temp);
}