import { useSelector } from 'react-redux';
import i18n from "../../i18n/main";
import { TempLocale } from "./celsiusToFahrenheit";
import { PresLocale } from "./hPaMM";
import { windDirStr } from './windDirStr';
import * as vl from "../validateValues";
import * as calculate from "../calculate";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import { iWsensIndications } from "../../interfaces";

export default function Wsensor() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const exp = i18n.t('dataExpired');

    function wsensData(num: number) {
        const sens: iWsensIndications = {
            temp: [],
            hum: vl.validateHumidity(data.wsensor?.hum.data[num] ?? 40400) 
                ? (((data.wsensor?.hum.data[num] ?? 0) + (config.wsensor?.hum[num] ?? 0)).toFixed(1) + '%') 
                : '--',
            pres: vl.validatePressureHPA(data.wsensor?.pres.data[num] ?? 40400) 
                ? PresLocale((data.wsensor?.pres.data[num] ?? 0) + (config.wsensor?.pres[num] ?? 0)) 
                : '--',
            windSpeed: vl.validateWindSpeed(data.wsensor?.wind.speed.data[num] ?? -1)
                ? (((data.wsensor?.wind.speed.data[num] ?? 0) + (config.wsensor?.wind.speed[num] ?? 0)).toFixed(1) + i18n.t('units.mps')) 
                : '--',
            windDir: vl.validateWindDirection(data.wsensor?.wind.dir.data[num] ?? -1)
                ? (((data.wsensor?.wind.dir.data[num] ?? 0) + (config.wsensor?.wind.dir[num] ?? 0)).toFixed() + '°') 
                : '--',
            windDirStr: vl.validateWindDirection(data.wsensor?.wind.dir.data[num] ?? -1)
                ? windDirStr((data.wsensor?.wind.dir.data[num] ?? 0) + (config.wsensor?.wind.dir[num] ?? 0)) 
                : '--',
            volt: vl.validateHighVoltage(data.wsensor?.voltage.data[num] ?? 40400) 
                ? (((data.wsensor?.voltage.data[num] ?? 0) + (config.wsensor?.volt[num] ?? 0)).toFixed(1) + i18n.t('units.v')) 
                : '--',
            light: vl.validateLight(data.wsensor?.light.data[num] ?? -40400)
                ? (((data.wsensor?.light.data[num] ?? 0) + (config.wsensor?.light[num] ?? 0)).toFixed(1) + i18n.t('units.lux'))
                : '--',
            hiVoltage: vl.validateHighVoltage(data.wsensor?.voltage.data[num] ?? 40400)
                ? (((data.wsensor?.voltage.data[num] ?? 0) + (config.wsensor?.volt[num] ?? 0)).toFixed(1) + i18n.t('units.v'))
                : '--',
            current: vl.validateCurrent(data.wsensor?.current.data[num] ?? 40400)
                ? (((data.wsensor?.current.data[num] ?? 0) + (config.wsensor?.curr[num] ?? 0)).toFixed(2) + i18n.t('units.a'))
                : '--',
            power: vl.validatePower(data.wsensor?.power.data[num] ?? 40400)
                ? (((data.wsensor?.power.data[num] ?? 0) + (config.wsensor?.pow[num] ?? 0)).toFixed(1) + i18n.t('units.w'))
                : '--',
            energy: vl.validateEnergy(data.wsensor?.energy.data[num] ?? -40400)
                ? (((data.wsensor?.energy.data[num] ?? 0) + (config.wsensor?.enrg[num] ?? 0)).toFixed(1) + i18n.t('units.wh'))
                : '--',
            frequency: vl.validateFrequency(data.wsensor?.freq.data[num] ?? 40400)
                ? (((data.wsensor?.freq.data[num] ?? 0) + (config.wsensor?.freq[num] ?? 0)).toFixed(1) + i18n.t('units.hz'))
                : '--',
            co2: vl.validateCO2(data.wsensor?.co2.data[num] ?? 40400) 
                ? (((data.wsensor?.co2.data[num] ?? 0) + (config.wsensor?.co2[num] ?? 0)).toFixed(1) + 'ppm') 
                : '--',
            ahum: calculate.absoluteHum(data.wsensor?.temp?.data[0][num], data.wsensor?.hum?.data[num]),
            dp: calculate.dewPoint(data.wsensor?.temp?.data[0][num], data.wsensor?.hum?.data[num], config.units.temp)
        };

        for(let i=0; i<5; i++) {
            sens.temp.push(
                vl.validateTemperature(data.wsensor?.temp.data[i][num] ?? 40400) 
                    ? TempLocale((data.wsensor?.temp.data[i][num] ?? 0) + (config.wsensor?.temp[num][i] ?? 0), config.units.temp) 
                    : '--'
            );
        }

        return vl.WsensorDataRelevance(num)
            ? sens
            : {
                temp: [exp, exp, exp, exp, exp],
                hum: exp,
                pres: exp,
                windSpeed: exp,
                windDir: exp,
                windDirStr: exp,
                volt: exp,
                light: exp,
                hiVoltage: exp,
                current: exp,
                power: exp,
                energy: exp,
                frequency: exp,
                co2: exp,
                ahum: exp,
                dp: exp
            }
    }

    return [
        wsensData(0),
        wsensData(1)
    ]
}