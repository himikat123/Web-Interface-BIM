import store from '../redux/store';
import * as vl from "./validateValues";

export default function lcdGetTempOut() {
    const config = store.getState().config;
    const data = store.getState().data;

    let temp = 40400.0;
    const wsensNum = config.display.source.tempOut.wsensNum;
    const wsensTempNum = config.display.source.tempOut.temp;
    const thingNum = config.display.source.tempOut.thing;

    switch(config.display.source.tempOut.sens) {
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
        case 4: temp = data.bme280.temp + config.sensors.bme280.t; break;
        case 5: temp = data.bmp180.temp + config.sensors.bmp180.t; break;
        case 6: temp = data.sht21.temp + config.sensors.sht21.t; break;
        case 7: temp = data.dht22.temp + config.sensors.dht22.t; break;
        case 8: temp = data.ds18b20.temp + config.sensors.ds18b20.t; break;
        case 9: temp = data.bme680.temp + config.sensors.bme680.t; break;
        default: ; break;
    }
    return Math.round(temp);
}
