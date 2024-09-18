import store from '../redux/store';
import temp from './segTempPrepare';
import hum from './segHumPrepare';

export default function segDHT22(dispNum: number, slot: number, dispModel: string): number[] {
    const config = store.getState().config;
    const data = store.getState().data;
    let dispImg = [0, 0, 0, 0, 0, 0, 0, 0];
    const type = config.display.timeSlot.data[slot][dispNum];
  
    if(type === 0) dispImg = temp(data.dht22.temp + config.sensors.dht22.t, dispModel);
    if(type === 1) dispImg = hum(data.dht22.hum + config.sensors.dht22.h, dispModel);

    return dispImg;
}