import i18n from "../../i18n/main";
import * as vl from "../validateValues";

export const batVoltage = (adc: number, k: number) => adc / (300.0 - k);

export const batPercent = (type: number, adc: number, k: number) => {
    const umin = 3.75;
    const umax = type === 0 ? 4.5 : 3.9;
    let percent = (batVoltage(adc, k) - umin) * 100.0 / (umax - umin); 
    if(percent < 0) percent = 0;
    if(percent > 100) percent = 100;
    return percent;
}

export const batLevel = (prc: number) => {
    let level = Math.round(prc / 25);
    if(level < 1) level = 1;
    if(level > 4) level = 4;
    return level;
}

export const batVoltageStr = (adc: number, k: number) => {
    if(vl.validateBatteryADC(adc)) {
        return (Math.round((batVoltage(adc, k)) * 1000) / 1000).toFixed(3) + i18n.t('units.v');
    }
    return '--';
}

export const batPercentStr = (adc: number, k: number) => {
    if(vl.validateBatteryADC(adc)) {
        return Math.round(batPercent(1, adc, k)) + "%";
    }
    return '--';
}

export const batLevelStr = (adc: number, k: number) => {
    if(vl.validateBatteryADC(adc)) {
        const level = batLevel(batPercent(1, adc, k));
        return `${level.toFixed()} ${i18n.t(`units.bar.${level === 1 ? 'singular' : 'plural'}`)}`;
    }
    return '--';
}

export const batVoltageWsensor = (num: number, adc: number, k: number) => {
    if(vl.WsensorDataRelevance(num)) {
        return `(${batVoltageStr(adc, k)})`;
    }
    return `(${i18n.t('dataExpired')})`;
}

export const batPercentWsensor = (num: number, adc: number, k: number) => {
    if(vl.WsensorDataRelevance(num)) {
        return `(${batPercentStr(adc, k)})`;
    }
    return `(${i18n.t('dataExpired')})`;
}

export const batLevelWsensor = (num: number, adc: number, type: number, k: number) => {
    if(vl.WsensorDataRelevance(num)) {
        return `(${batLevelStr(adc, k)})`;
    }
    return `(${i18n.t('dataExpired')})`;
}