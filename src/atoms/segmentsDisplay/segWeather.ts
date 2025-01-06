import store from '../../redux/store';
import temp from './segTempPrepare';
import hum from './segHumPrepare';
import pres from './segPresPrepare';

export default function segWeather(dispNum: number, slot: number, dispModel: string): number[] {
    const config = store.getState().config;
    const data = store.getState().data;
    let dispImg = [0, 0, 0, 0, 0, 0, 0, 0];
    const type = config.display.timeSlot ? config.display.timeSlot.data[slot][dispNum] : 0;
  
    const wthrRelevant = data.time - data.weather.time < 1200;
    if(type === 0) dispImg = temp(wthrRelevant ? (data.weather.temp + config.weather.corr.t) : 4040, dispModel);
    if(type === 1) dispImg = hum(wthrRelevant ? (data.weather.hum + config.weather.corr.h) : 4040, dispModel);
    if(type === 2) dispImg = pres(wthrRelevant ? (data.weather.pres + config.weather.corr.p) : 4040, dispModel);
    
    return dispImg;
}