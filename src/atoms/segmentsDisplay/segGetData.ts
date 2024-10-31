import store from '../../redux/store';
import clock from './segClockPrepare';
import cdate from './segDatePrepare';
import temp from './segTempPrepare';
import segBME280 from './segBME280';
import segBME680 from './segBME680';
import segBMP180 from './segBMP180';
import segSHT21 from './segSHT21';
import segDHT22 from './segDHT22';
import segThingspeak from './segThingspeak';
import segWeather from './segWeather';
import segWsensor from './segWsensor';

export default function segGetData(dispNum: number, slot: number, pointsState: boolean)  {
    const config = store.getState().config;
    const data = store.getState().data;
    const dModel = config.display.model[dispNum];
    let dispImg = [0, 0, 0, 0, 0, 0, 0, 0];
    let clockpoints = false;
    const sens = config.display.timeSlot.data[slot][dispNum];
    const displayLength = config.display.type[dispNum] === 1
        ? dModel < 3
            ? '4-dig'
            : '6-dig'
        : (dModel === 0 ||dModel === 1 || dModel === 3)
            ? '4-dig'
            : (dModel === 2 ||dModel === 4)
                ? '6-dig'
                : '8-dig';

    switch(config.display.timeSlot.sensor[slot][dispNum]) {
        case 0: clockpoints = true; dispImg = clock(sens, displayLength, pointsState, dispNum); break;
        case 1: dispImg = cdate(sens, displayLength); break;
        case 2: dispImg = segBME280(dispNum, slot, displayLength); break;
        case 3: dispImg = segBMP180(dispNum, slot, displayLength); break;
        case 4: dispImg = segSHT21(dispNum, slot, displayLength); break;
        case 5: dispImg = segDHT22(dispNum, slot, displayLength); break;
        case 6: dispImg = temp(data.ds18b20.temp + config.sensors.ds18b20.t, displayLength); break;
        case 7: dispImg = temp(data.esp32.temp + config.sensors.esp32.t, displayLength); break;
        case 8: dispImg = segThingspeak(dispNum, slot, displayLength); break;
        case 9: dispImg = segWeather(dispNum, slot, displayLength); break;
        case 10: dispImg = segWsensor(dispNum, slot, displayLength); break;
        case 11: dispImg = segBME680(dispNum, slot, displayLength); break;
        default: ; break;
    }

    return {
        dispImg: dispImg,
        clockpoints: clockpoints
    };
}