import store from '../redux/store';
import * as vl from "./validateValues";
import { percentage } from './indications/battery';

export default function lcdGetBatteryLevel() {
    const config = store.getState().config;
    const data = store.getState().data;

    let level = -1;
    if(config.display.source.bat.sens === 1) { // Wsensor
        const wSensNum = config.display.source.bat.wsensNum;
        if(Math.floor(Date.now() / 1000) - data.wsensor.time[wSensNum] < config.wsensor.expire[wSensNum] * 60) {
            if(vl.validateBatteryADC(data.wsensor.bat[wSensNum])) {
                const percent = percentage(config.wsensor.bat.type[wSensNum], data.wsensor.bat[wSensNum], config.wsensor.bat.k[wSensNum]);
                level = Math.round(percent / 25);
                if(level < 1) level = 1;
                if(level > 4) level = 4;
            }
        }
    }
    if(config.display.source.bat.sens === 2) { // Thingspeak
        if(data.thing?.time && (Math.floor(Date.now() / 1000) - data.thing.time < config.thingspeakReceive.expire * 60)) {
            level = data.thing.data ? data.thing.data[config.display.source.bat.thing] : -1;
        }
    }
    return level;
}