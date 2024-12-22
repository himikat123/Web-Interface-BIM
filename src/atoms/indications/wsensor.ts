import i18n from "../../i18n/main";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import { iWsensIndications } from "../../interfaces";
import * as vl from "../validateValues";
import { useSelector } from 'react-redux';

export default function Wsensor() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const exp = i18n.t('dataExpired');

    function wsensData(num: number) {
        const sens: iWsensIndications = {
            temp: [],
            hum: vl.validateHumidity(data.wsensor?.hum.data[num] ?? 0) 
                ? (((data.wsensor?.hum.data[num] ?? 0) + (config.wsensor?.hum.corr[num] ?? 0)).toFixed(2) + '%') 
                : '--',
            pres: vl.validatePressure(data.wsensor?.pres.data[num] ?? 0) 
                ? (((data.wsensor?.pres.data[num] ?? 0) + (config.wsensor?.pres.corr[num] ?? 0)).toFixed(2) + i18n.t('units.hpa') + ' / ' 
                    + (((data.wsensor?.pres.data[num] ?? 0) + (config.wsensor?.pres.corr[num] ?? 0)) * 0.75).toFixed(2) + i18n.t('units.mm')) 
                : '--',
            volt: vl.validateHighVoltage(data.wsensor?.voltage.data[num] ?? 0) 
                ? (((data.wsensor?.voltage.data[num] ?? 0) + (config.wsensor?.volt.corr[num] ?? 0)).toFixed(2) + i18n.t('units.v')) 
                : '--',
            light: vl.validateLight(data.wsensor?.light.data[num] ?? 0)
                ? (((data.wsensor?.light.data[num] ?? 0) + (config.wsensor?.light.corr[num] ?? 0)).toFixed(2) + i18n.t('units.lux'))
                : '--',
            hiVoltage: vl.validateHighVoltage(data.wsensor?.voltage.data[num] ?? 0)
                ? (((data.wsensor?.voltage.data[num] ?? 0) + (config.wsensor?.volt.corr[num] ?? 0)).toFixed(2) + i18n.t('units.v'))
                : '--',
            current: vl.validateCurrent(data.wsensor?.current.data[num] ?? 0)
                ? (((data.wsensor?.current.data[num] ?? 0) + (config.wsensor?.curr.corr[num] ?? 0)).toFixed(2) + i18n.t('units.a'))
                : '--',
            power: vl.validatePower(data.wsensor?.power.data[num] ?? 0)
                ? (((data.wsensor?.power.data[num] ?? 0) + (config.wsensor?.pow.corr[num] ?? 0)).toFixed(2) + i18n.t('units.w'))
                : '--',
            energy: vl.validateEnergy(data.wsensor?.energy.data[num] ?? 0)
                ? (((data.wsensor?.energy.data[num] ?? 0) + (config.wsensor?.enrg.corr[num] ?? 0)).toFixed(2) + i18n.t('units.wh'))
                : '--',
            frequency: vl.validateFrequency(data.wsensor?.freq.data[num] ?? 0)
                ? (((data.wsensor?.freq.data[num] ?? 0) + (config.wsensor?.freq.corr[num] ?? 0)).toFixed(2) + i18n.t('units.hz'))
                : '--',
            co2: vl.validateCO2(data.wsensor?.co2.data[num] ?? 0) 
                ? (((data.wsensor?.co2.data[num] ?? 0) + (config.wsensor?.co2.corr[num] ?? 0)).toFixed(2) + 'ppm') 
                : '--' 
        };

        for(let i=0; i<5; i++) {
            sens.temp.push(
                vl.validateTemperature(data.wsensor?.temp.data[i][num] ?? 0) 
                    ? (((data.wsensor?.temp.data[i][num] ?? 0) + (config.wsensor?.temp.corr[num][i] ?? 0)).toFixed(2) + '°C') 
                    : '--'
            );
        }

        return vl.WsensorDataRelevance(num)
            ? sens
            : {
                temp: [exp, exp, exp, exp, exp],
                hum: exp,
                pres: exp,
                volt: exp,
                light: exp,
                hiVoltage: exp,
                current: exp,
                power: exp,
                energy: exp,
                frequency: exp,
                co2: exp
            }
    }

    return [
        wsensData(0),
        wsensData(1)
    ]
}