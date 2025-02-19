import store from '../../redux/store';
import temp from './segTempPrepare';
import hum from './segHumPrepare';
import pres from './segPresPrepare';
import iaq from './segIaqPrepare';

export default function segBME680(dispNum: number, slot: number, dispModel: string): number[] {
    const config = store.getState().config;
    const data = store.getState().data;
    let dispImg = [0, 0, 0, 0, 0, 0, 0, 0];
    const type = config.display.timeSlot ? config.display.timeSlot.data[slot][dispNum] : 0;
  
    if(type === 0) dispImg = temp((data.bme680?.temp ?? 0) + (config.sensors.bme680?.t ?? 0), dispModel);
    if(type === 1) dispImg = hum((data.bme680?.hum ?? 0) + (config.sensors.bme680?.h ?? 0), dispModel);
    if(type === 2) dispImg = pres((data.bme680?.pres ?? 0) + (config.sensors.bme680?.p ?? 0), dispModel);
    if(type === 3) dispImg = iaq((data.bme680?.iaq ?? 0) + (config.sensors.bme680?.i ?? 0), dispModel);

    return dispImg;
}