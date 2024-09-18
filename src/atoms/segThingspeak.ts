import store from '../redux/store';
import temp from './segTempPrepare';
import hum from './segHumPrepare';
import pres from './segPresPrepare';
import { ThingspeakDataRelevance } from './validateValues';

export default function segThingspeak(dispNum: number, slot: number, dispModel: string): number[] {
    const config = store.getState().config;
    const data = store.getState().data;
    let dispImg = [0, 0, 0, 0, 0, 0, 0, 0];
    const type = config.display.timeSlot.data[slot][dispNum];
  
    const thngRelevant = ThingspeakDataRelevance();
    if(type === 0) dispImg = temp(thngRelevant ? data.thing.data[config.display.timeSlot.thing[slot][dispNum]] : 4040, dispModel);
    if(type === 1) dispImg = hum(thngRelevant ? data.thing.data[config.display.timeSlot.thing[slot][dispNum]] : 4040, dispModel);
    if(type === 2) dispImg = pres(thngRelevant ? data.thing.data[config.display.timeSlot.thing[slot][dispNum]] : 4040, dispModel);

    return dispImg;
}