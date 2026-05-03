import temp from './segTempPrepare';
import hum from './segHumPrepare';
import pres from './segPresPrepare';
import { ThingspeakDataRelevance } from '../validateValues';

export default function segThingspeak(dispNum: number, slot: number, dispModel: string, config: any, data: any): number[] {
    let dispImg = [0, 0, 0, 0, 0, 0, 0, 0];
    const type = config.display.timeSlot ? config.display.timeSlot.data[slot][dispNum] : 0;
    const thing = data.thing.data[config.display.timeSlot ? config.display.timeSlot.thing[slot][dispNum] : 0];
  
    const thngRelevant = ThingspeakDataRelevance();
    if(type === 0) dispImg = temp(thngRelevant ? thing : 4040, dispModel);
    if(type === 1) dispImg = hum(thngRelevant ? thing : 4040, dispModel);
    if(type === 2) dispImg = pres(thngRelevant ? thing : 4040, dispModel);

    return dispImg;
}