import i18n from "../../i18n/main";
import { useSelector } from 'react-redux';
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../validateValues";

export const Voltage = (adc: number, k: number) => adc / (300.0 - k);

export const Percentage = (type: number, adc: number, k: number) => {
    const umin = 3.75;
    const umax = type === 0 ? 4.5 : 3.9;
    let percent = (Voltage(adc, k) - umin) * 100.0 / (umax - umin); 
    if(percent < 0) percent = 0;
    if(percent > 100) percent = 100;
    return percent;
}

export const Level = (prc: number) => {
    let level = Math.round(prc / 25);
    if(level < 1) level = 1;
    if(level > 4) level = 4;
    return `${level.toFixed()} ${i18n.t(`units.bar.${level === 1 ? 'singular' : 'plural'}`)}`;
}

export const BuiltInVoltage = () => {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    if(vl.validateBatteryADC(data.adc ?? -1)) {
        return (Math.round((Voltage(data.adc ?? 0, config.batK ?? 0)) * 1000) / 1000).toFixed(3) + i18n.t('units.v');
    }
    return '--';
}

export const BuiltInPercentage = () => {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    if(vl.validateBatteryADC(data.adc ?? -1)) {
        return Math.round(Percentage(1, data.adc ?? 0, config.batK ?? 0)) + "%";
    }
    return '--';
}

export const BuiltInLevel = () => {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    if(vl.validateBatteryADC(data.adc ?? -1)) {
        return Level(Percentage(1, data.adc ?? 0, config.batK ?? 0));
    }
    return '--';
}

export const BatVoltage = (num: number) => {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    if(vl.WsensorDataRelevance(num)) {
        if(vl.validateBatteryADC(data.wsensor?.bat[num] ?? 0))
            return '(' + Voltage(data.wsensor?.bat[num] ?? 0, (config.wsensor?.bat.k[num] ?? 0)).toFixed(2) + i18n.t('units.v') + ')';
        else return '(--)';
    }
    else return `(${i18n.t('dataExpired')})`;
}

export const BatPercent = (num: number) => {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    if(vl.WsensorDataRelevance(num)) {
        if(vl.validateBatteryADC(data.wsensor?.bat[num] ?? 0)) {
            return `(${Percentage(config.wsensor?.bat.type[num] ?? 0, data.wsensor?.bat[num] ?? 0, config.wsensor?.bat.k[num] ?? 0).toFixed(2)}%)`;
        }
        else return '(--)';
    }
    else return `(${i18n.t('dataExpired')})`;
}

export const BatLevel = (num: number) => {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    if(vl.WsensorDataRelevance(num)) {
        if(vl.validateBatteryADC(data.wsensor?.bat[num] ?? 0)) {
            return `(${Level(Percentage(config.wsensor?.bat.type[num] ?? 0, data.wsensor?.bat[num] ?? 0, config.wsensor?.bat.k[num] ?? 0))})`;
        }
        else return '(--)';
    }
    else return `(${i18n.t('dataExpired')})`;
}