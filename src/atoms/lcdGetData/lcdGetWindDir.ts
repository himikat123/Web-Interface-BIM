import * as vl from "../validateValues";
import type { iConf } from '../../redux/configTypes';
import type { iDat } from '../../redux/dataTypes';

export default function lcdGetWindDir(config: iConf, data: iDat): number {
    const source = config.display.source.wind?.dir.sens ?? 0;
    const wsensNum = config.display.source.wind?.dir.wsensNum ?? 0;
    const wsensData = data.wsensor?.wind.dir.data[wsensNum] ?? 0;
    const thingNum = config.display.source.wind?.dir.thing ?? 0;
    const thingData = data.thing?.data ? data.thing?.data[thingNum] : -1;
    let val = -1.0;

    switch(source) {
        case 1: val = data.weather.wind.dir; break;
        case 2: if(vl.WsensorDataRelevance(wsensNum)) {
            val = vl.validateWindDirection(wsensData) 
                ? (((wsensData + (config.wsensor?.wind.dir[wsensNum] ?? 0)) % 360 + 360) % 360)
                : -1
        }; break;
        case 3: if(vl.ThingspeakDataRelevance()) {
            val = vl.validateWindDirection(thingData) 
                ? thingData 
                : -1;
        }; break;
        default: ; break;
    }
    return Math.round(val);
}