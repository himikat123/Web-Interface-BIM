import store from '../../redux/store';
import temp from './segTempPrepare';
import hum from './segHumPrepare';
import pres from './segPresPrepare';
import co2 from './segCo2Prepare';
import { WsensorDataRelevance } from '../validateValues';

export default function segWsensor(dispNum: number, slot: number, dispModel: string): number[] {
    const config = store.getState().config;
    const data = store.getState().data;
    let dispImg = [0, 0, 0, 0, 0, 0, 0, 0];
    const wsensNum = config.display.timeSlot ? config.display.timeSlot.wsensor.num[slot][dispNum] : 0;
    const wsensType = config.display.timeSlot ? config.display.timeSlot.wsensor.type[slot][dispNum] : 0;
    const wsnsRelevant = WsensorDataRelevance(wsensNum);

    if(wsensType >= 0 && wsensType <= 4) {
        dispImg = temp(wsnsRelevant 
            ? (data.wsensor?.temp.data[wsensType][wsensNum] ?? 0) + (config.wsensor?.temp.corr[wsensNum][wsensType] ?? 0) 
            : 4040, dispModel
        );
    }
    if(wsensType === 5) {
        dispImg = hum(wsnsRelevant 
            ? (data.wsensor?.hum.data[wsensNum] ?? 0) + (config.wsensor?.hum.corr[wsensNum] ?? 0)
            : 4040, dispModel
        );
    }
    if(wsensType === 6) {
        dispImg = pres(wsnsRelevant 
            ? (data.wsensor?.pres.data[wsensNum] ?? 0) + (config.wsensor?.pres.corr[wsensNum] ?? 0) 
            : 4040, dispModel
        );
    }
    if(wsensType === 7) {
        dispImg = co2(wsnsRelevant 
            ? (data.wsensor?.co2.data[wsensNum] ?? 0) + (config.wsensor?.co2.corr[wsensNum] ?? 0) 
            : 4040, dispModel
        );
    }

    return dispImg;
}