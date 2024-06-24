import store from '../redux/store';
import temp from './segTempPrepare';
import hum from './segHumPrepare';
import pres from './segPresPrepare';

export default function segWeather(dispNum: number, slot: number): number[] {
    const config = store.getState().config;
    const data = store.getState().data;
    let dispImg = [0, 0, 0, 0];
    const type = config.display.timeSlot.data[slot][dispNum];
  
    const wthrRelevant = data.time - data.weather.time < 1200;
    if(type === 0) dispImg = temp(wthrRelevant ? data.weather.temp : 4040);
    if(type === 1) dispImg = hum(wthrRelevant ? data.weather.hum : 4040);
    if(type === 2) dispImg = pres(wthrRelevant ? data.weather.pres : 4040);
    
    return dispImg;
}