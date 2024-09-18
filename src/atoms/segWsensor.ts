import store from '../redux/store';
import temp from './segTempPrepare';
import hum from './segHumPrepare';
import pres from './segPresPrepare';
import co2 from './segCo2Prepare';
import { WsensorDataRelevance } from './validateValues';

export default function segWsensor(dispNum: number, slot: number, dispModel: string): number[] {
    const config = store.getState().config;
    const data = store.getState().data;
    let dispImg = [0, 0, 0, 0, 0, 0, 0, 0];
    const wsensNum = config.display.timeSlot.wsensor.num[slot][dispNum];
    const wsensType = config.display.timeSlot.wsensor.type[slot][dispNum];
    const wsnsRelevant = WsensorDataRelevance(wsensNum);

    if(wsensType >= 0 && wsensType <= 4) dispImg = temp(wsnsRelevant ? data.wsensor.temp.data[wsensType][wsensNum] + config.wsensor.temp.corr[wsensNum][wsensType] : 4040, dispModel);
    if(wsensType === 5) dispImg = hum(wsnsRelevant ? data.wsensor.hum.data[wsensNum] + config.wsensor.hum.corr[wsensNum] : 4040, dispModel);
    if(wsensType === 6) dispImg = pres(wsnsRelevant ? data.wsensor.pres.data[wsensNum] + config.wsensor.pres.corr[wsensNum] : 4040, dispModel);
    if(wsensType === 7) dispImg = co2(wsnsRelevant ? data.wsensor.co2.data[wsensNum] + config.wsensor.co2.corr[wsensNum] : 4040, dispModel);

    return dispImg;
}