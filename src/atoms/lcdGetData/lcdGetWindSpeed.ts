import * as vl from "../validateValues";
import { iConf } from '../../redux/configTypes';
import { iDat } from '../../redux/dataTypes';

export default function lcdGetWindSpeed(config: iConf, data: iDat): number {
    const source = config.display.source.wind?.speed.sens ?? 0;
    const wsensNum = config.display.source.wind?.speed.wsensNum ?? 0;
    const wsensData = data.wsensor?.wind.speed.data[wsensNum] ?? 0;
    const thingNum = config.display.source.wind?.speed.thing ?? 0;
    const thingData = data.thing?.data ? data.thing?.data[thingNum] : -1;
    let val = -1.0;

    switch(source) {
        case 1: val = data.weather.wind.speed; break;
        case 2: if(vl.WsensorDataRelevance(wsensNum)) {
            val = vl.validateWindSpeed(wsensData) 
                ? (wsensData + (config.wsensor?.wind.speed[wsensNum] ?? 0)) 
                : -1
        }; break;
        case 3: if(vl.ThingspeakDataRelevance()) {
            val = vl.validateWindSpeed(thingData) 
                ? thingData 
                : -1;
        }; break;
        default: ; break;
    }
    return Math.round(val);
}