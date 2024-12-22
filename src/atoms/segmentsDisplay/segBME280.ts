import store from '../../redux/store';
import temp from './segTempPrepare';
import hum from './segHumPrepare';
import pres from './segPresPrepare';

export default function segBME280(dispNum: number, slot: number, dispModel: string): number[] {
    const config = store.getState().config;
    const data = store.getState().data;
    let dispImg = [0, 0, 0, 0, 0, 0, 0, 0];
    const type = config.display.timeSlot ? config.display.timeSlot.data[slot][dispNum] : 0;
  
    if(type === 0) dispImg = temp(data.bme280.temp + config.sensors.bme280.t, dispModel);
    if(type === 1) dispImg = hum(data.bme280.hum + config.sensors.bme280.h, dispModel);
    if(type === 2) dispImg = pres(data.bme280.pres + config.sensors.bme280.p, dispModel);

    return dispImg;
}