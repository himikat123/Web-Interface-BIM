import store from '../../redux/store';
import * as vl from "../validateValues";

export default function lcdGetPres() {
    const config = store.getState().config;
    const data = store.getState().data;

    let pres = 40400.0;
    const wsensNum = config.display.source.presOut.wsensNum;
    const thingNum = config.display.source.presOut.thing;

    switch(config.display.source.presOut.sens) {
        case 1: pres = data.weather.pres; break;
        case 2: if(vl.WsensorDataRelevance(wsensNum)) {
            pres = vl.validatePressure(data.wsensor.pres.data[wsensNum]) 
                ? data.wsensor.pres.data[wsensNum] + config.wsensor.pres.corr[wsensNum] 
                : 40400
        }; break;
        case 3: if(vl.ThingspeakDataRelevance()) {
            pres = vl.validateThingspeak(
                data.thing?.data 
                    ? data.thing?.data[thingNum] 
                    : -40400
            )
            ? data.thing?.data 
                ? data.thing?.data[thingNum] 
                : 40400 
            : 40400
        }; break;
        case 4: pres = data.bme280.pres + config.sensors.bme280.p; break;
        case 5: pres = data.bmp180.pres + config.sensors.bmp180.p; break;
        case 6: pres = data.bme680.pres + config.sensors.bme680.p; break;
        default: ; break;
    }

    return pres;
}