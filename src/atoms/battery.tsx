import i18n from "../i18n/main";
import { useSelector } from 'react-redux';
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as vl from "../atoms/validateValues";

const voltage = (adc: number, k: number) => adc / (300.0 - k);

const percentage = (type: number, adc: number, k: number) => {
    const umin = 3.75;
    const umax = type === 0 ? 4.5 : 3.9;
    let percent = (voltage(adc, k) - umin) * 100.0 / (umax - umin); 
    if(percent < 0) percent = 0;
    if(percent > 100) percent = 100;
    return percent;
}

export const BatVoltage = (num: number) => {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    if(vl.WsensorDataRelevance(num)) {
        if(vl.validateBatteryADC(data.wsensor.bat[num]))
            return voltage(data.wsensor.bat[num], config.wsensor.bat.k[num]).toFixed(2) + i18n.t('units.v');
        else return '--';
    }
    else return i18n.t('dataExpired');
}

export const BatPercent = (num: number) => {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    if(vl.WsensorDataRelevance(num)) {
        if(vl.validateBatteryADC(data.wsensor.bat[num])) {
            return percentage(config.wsensor.bat.type[num], data.wsensor.bat[num], config.wsensor.bat.k[num]).toFixed(2) + '%';
        }
        else return '--';
    }
    else return i18n.t('dataExpired');
}

export const BatLevel = (num: number) => {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    
    if(vl.WsensorDataRelevance(num)) {
        if(vl.validateBatteryADC(data.wsensor.bat[num])) {
            const percent = percentage(config.wsensor.bat.type[num], data.wsensor.bat[num], config.wsensor.bat.k[num]);
            let level = Math.round(percent / 25);
            if(level < 1) level = 1;
            if(level > 4) level = 4;
            return level.toFixed() + ' ' + i18n.t(`units.bar.${level === 1 ? 'singular' : 'plural'}`);
        }
        else return '--';
    }
    else return i18n.t('dataExpired');
}