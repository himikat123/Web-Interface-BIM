import store from '../../redux/store';
import * as vl from "../validateValues";
import { percentage } from '../indications/battery';

export default function lcdGetBatteryLevel() {
    const config = store.getState().config;
    const data = store.getState().data;

    let level = -1;
    if(config.display.source.bat.sens === 1) { // Wsensor
        const wSensNum = config.display.source.bat.wsensNum;
        if(vl.WsensorDataRelevance(wSensNum)) {
            if(vl.validateBatteryADC(data.wsensor.bat[wSensNum])) {
                const percent = percentage(config.wsensor.bat.type[wSensNum], data.wsensor.bat[wSensNum], config.wsensor.bat.k[wSensNum]);
                level = Math.round(percent / 25);
                if(level < 1) level = 1;
                if(level > 4) level = 4;
            }
        }
    }
    if(config.display.source.bat.sens === 2) { // Thingspeak
        if(vl.ThingspeakDataRelevance()) {
            level = data.thing.data ? data.thing.data[config.display.source.bat.thing] : -1;
            if(level === 5) level = 4;
        }
    }
    return level;
}