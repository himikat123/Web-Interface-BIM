import * as vl from "../validateValues";
import device from '../../device';
import { batLevel, batPercent } from '../indications/battery';
import { iConf } from '../../redux/configTypes';
import { iDat } from '../../redux/dataTypes';

export default function lcdGetBatteryLevel(config: iConf, data: iDat) {
    let level = -1;
    if(config.display.source.bat.sens === 1) {
        if(device() === 'WeatherMonitorBIM32') { // Wsensor
            const wSensNum = config.display.source.bat.wsensNum ?? 0;
            if(vl.WsensorDataRelevance(wSensNum)) {
                if(vl.validateBatteryADC(data.wsensor?.bat[wSensNum] ?? 0)) {
                    level = batLevel(batPercent(
                        config.wsensor?.bat.type[wSensNum] ?? 0, 
                        data.wsensor?.bat[wSensNum] ?? 0, 
                        config.wsensor?.bat.k[wSensNum] ?? 0
                    ));
                }
            }
        }
        else {
            if(vl.validateBatteryADC(data.adc ?? 0)) {
                level = batLevel(batPercent(1, data.adc ?? 0, config.batK ?? 0));
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