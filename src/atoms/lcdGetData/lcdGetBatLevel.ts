import store from '../../redux/store';
import * as vl from "../validateValues";
import device from '../../device';
import { percentage } from '../indications/battery';

export default function lcdGetBatteryLevel() {
    const config = store.getState().config;
    const data = store.getState().data;

    let level = -1;
    if(config.display.source.bat.sens === 1 && device() === 'WeatherMonitorBIM32') { // Wsensor
        const wSensNum = config.display.source.bat.wsensNum ?? 0;
        if(vl.WsensorDataRelevance(wSensNum)) {
            if(vl.validateBatteryADC(data.wsensor?.bat[wSensNum] ?? 0)) {
                const percent = percentage(config.wsensor?.bat.type[wSensNum] ?? 0, data.wsensor?.bat[wSensNum] ?? 0, config.wsensor?.bat.k[wSensNum] ?? 0);
                level = Math.round(percent / 25);
                if(level < 1) level = 1;
                if(level > 4) level = 4;
            }
        }
    }
    if(config.display.source.bat.sens === (device() === 'WeatherMonitorBIM' ? 1 : 2)) { // Thingspeak
        if(vl.ThingspeakDataRelevance()) {
            level = data.thing.data ? data.thing.data[config.display.source.bat.thing] : -1;
            if(level === 5) level = 4;
        }
    }

    return level;
}