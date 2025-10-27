import { iSensorWsensConfig } from "../../redux/configTypes";
import { iSensorWsensData } from "../../redux/dataTypes";
import i18n from "../../i18n/main";
import { PresLocale } from "./hPaMM";
import { windDirStr } from './windDirStr';
import * as vl from "../validateValues";
import * as calculate from "../calculate";
import { iWsensIndications } from "../../interfaces";

export default function wsensor(conf: iSensorWsensConfig | undefined, data: iSensorWsensData | undefined) {
    const exp = i18n.t('dataExpired');

    function wsensData(num: number) {
        const temp = data?.temp.data ?? [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]];
        const hum = data?.hum.data[num] ?? -1;
        const pres = data?.pres.data[num] ?? -1;
        const wSpeed = data?.wind.speed.data[num] ?? -1;
        const wDir = data?.wind.dir.data[num] ?? -1;
        const volt = data?.voltage.data[num] ?? -1;
        const light = data?.light.data[num] ?? -1;
        const current = data?.current.data[num] ?? -1;
        const power = data?.power.data[num] ?? -1;
        const energy = data?.energy.data[num] ?? -1;
        const freq = data?.freq.data[num] ?? -1;
        const co2 = data?.co2.data[num] ?? -1;

        const sens: iWsensIndications = {
            temp: [],
            hum: vl.validateHumidity(hum) ? (hum + (conf?.hum[num] ?? 0)).toFixed(1) + '%' : '--',
            pres: vl.validatePressureHPA(pres) ? PresLocale(pres, conf?.pres[num] ?? 0) : '--',
            windSpeed: vl.validateWindSpeed(wSpeed) ? (wSpeed + (conf?.wind.speed[num] ?? 0)).toFixed(1) + i18n.t('units.mps') : '--',
            windDir: vl.validateWindDirection(wDir) ? (wDir + (conf?.wind.dir[num] ?? 0)).toFixed() + '°' : '--',
            windDirStr: vl.validateWindDirection(wDir) ? windDirStr(wDir + (conf?.wind.dir[num] ?? 0)) : '--',
            volt: vl.validateHighVoltage(volt) ? (volt + (conf?.volt[num] ?? 0)).toFixed(1) + i18n.t('units.v') : '--',
            light: vl.validateLight(light) ? (light + (conf?.light[num] ?? 0)).toFixed(1) + i18n.t('units.lux') : '--',
            hiVoltage: vl.validateHighVoltage(volt) ? (volt + (conf?.volt[num] ?? 0)).toFixed(1) + i18n.t('units.v') : '--',
            current: vl.validateCurrent(current) ? (current + (conf?.curr[num] ?? 0)).toFixed(2) + i18n.t('units.a') : '--',
            power: vl.validatePower(power) ? (power + (conf?.pow[num] ?? 0)).toFixed(1) + i18n.t('units.w') : '--',
            energy: vl.validateEnergy(energy) ? (energy + (conf?.enrg[num] ?? 0)).toFixed(1) + i18n.t('units.wh') : '--',
            frequency: vl.validateFrequency(freq) ? (freq + (conf?.freq[num] ?? 0)).toFixed(1) + i18n.t('units.hz') : '--',
            co2: vl.validateCO2(co2) ? (co2 + (conf?.co2[num] ?? 0)).toFixed(1) + 'ppm' : '--',
            ahum: calculate.absoluteHum(temp[0][num], hum),
            dp: calculate.dewPoint(temp[0][num], hum)
        };

        for(let i=0; i<5; i++) {
            sens.temp.push(
                vl.validateTemperature(temp[i][num] ?? 40400) ? (temp[i][num] + (conf?.temp[num][i] ?? 0)).toFixed(1) + '°C' : '--'
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