import store from '../redux/store';
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

export default function segGetData(dispNum: number, slot: number)  {
    const config = store.getState().config;
    const data = store.getState().data;
    let dispImg = [0, 0, 0, 0];
    let clockpoints = false;

    switch(config.display.timeSlot.sensor[slot][dispNum]) {
        case 0: clockpoints = true; dispImg = clock(); break;
        case 1: dispImg = cdate(); break;
        case 2: dispImg = segBME280(dispNum, slot); break;
        case 3: dispImg = segBMP180(dispNum, slot); break;
        case 4: dispImg = segSHT21(dispNum, slot); break;
        case 5: dispImg = segDHT22(dispNum, slot); break;
        case 6: dispImg = temp(data.ds18b20.temp + config.sensors.ds18b20.t); break;
        case 7: dispImg = temp(data.esp32.temp + config.sensors.esp32.t); break;
        case 8: dispImg = segThingspeak(dispNum, slot); break;
        case 9: dispImg = segWeather(dispNum, slot); break;
        case 10: dispImg = segWsensor(dispNum, slot); break;
        case 11: dispImg = segBME680(dispNum, slot); break;
        default: ; break;
    }

    return {
        dispImg: dispImg,
        clockpoints: clockpoints
    };
}