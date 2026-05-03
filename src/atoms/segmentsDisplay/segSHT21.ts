import temp from './segTempPrepare';
import hum from './segHumPrepare';

export default function segSHT21(dispNum: number, slot: number, dispModel: string, config: any, data: any): number[] {
    let dispImg = [0, 0, 0, 0, 0, 0, 0, 0];
    const type = config.display.timeSlot ? config.display.timeSlot.data[slot][dispNum] : 0;
  
    if(type === 0) dispImg = temp(data.sht21.temp + config.sensors.sht21.t, dispModel);
    if(type === 1) dispImg = hum(data.sht21.hum + config.sensors.sht21.h, dispModel);

    return dispImg;
}