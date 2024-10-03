import store from '../../redux/store';
import temp from './segTempPrepare';
import pres from './segPresPrepare';

export default function segBMP180(dispNum: number, slot: number, dispModel: string): number[] {
    const config = store.getState().config;
    const data = store.getState().data;
    let dispImg = [0, 0, 0, 0, 0, 0, 0, 0];
    const type = config.display.timeSlot.data[slot][dispNum];
  
    if(type === 0) dispImg = temp(data.bmp180.temp + config.sensors.bmp180.t, dispModel);
    if(type === 1) dispImg = pres(data.bmp180.pres + config.sensors.bmp180.p, dispModel);

    return dispImg;
}