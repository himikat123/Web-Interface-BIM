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
import displayLength from './displayLength';

export default function segGetData(dispNum: number, slot: number, pointsState: boolean)  {
    const config = store.getState().config;
    const data = store.getState().data;
    let dispImg = [0, 0, 0, 0, 0, 0, 0, 0];
    let clockpoints = false;
    const sens = config.display.timeSlot.data[slot][dispNum];
    const dispLength = displayLength(dispNum) + '-dig';

    switch(config.display.timeSlot.sensor[slot][dispNum]) {
        case 0: clockpoints = true; dispImg = clock(sens, dispLength, pointsState, dispNum); break;
        case 1: dispImg = cdate(sens, dispLength); break;
        case 2: dispImg = segBME280(dispNum, slot, dispLength); break;
        case 3: dispImg = segBMP180(dispNum, slot, dispLength); break;
        case 4: dispImg = segSHT21(dispNum, slot, dispLength); break;
        case 5: dispImg = segDHT22(dispNum, slot, dispLength); break;
        case 6: dispImg = temp(data.ds18b20.temp + config.sensors.ds18b20.t, dispLength); break;
        case 7: dispImg = temp(data.esp32.temp + config.sensors.esp32.t, dispLength); break;
        case 8: dispImg = segThingspeak(dispNum, slot, dispLength); break;
        case 9: dispImg = segWeather(dispNum, slot, dispLength); break;
        case 10: dispImg = segWsensor(dispNum, slot, dispLength); break;
        case 11: dispImg = segBME680(dispNum, slot, dispLength); break;
        default: ; break;
    }

    return {
        dispImg: dispImg,
        clockpoints: clockpoints
    };
}