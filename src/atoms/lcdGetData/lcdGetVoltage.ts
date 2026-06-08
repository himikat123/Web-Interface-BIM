import i18n from '../../i18n/main';
import moment from 'moment';
import device from '../../device';
import * as vl from "../validateValues";
import * as calculate from '../calculate';
import * as bat from '../indications/battery';
import { iConf } from "../../redux/configTypes";
import { iDat } from '../../redux/dataTypes';

export default function lcdGetVoltage(config: iConf, data: iDat) {
    let value = '';
    let type = '';
    const wsensNum = config.display.source.volt.wsensNum ?? 0;
    const thingNum = config.display.source.volt.thing;
    const locale = config.lang === 'ua' ? 'uk' : config.lang;

    switch(config.display.source.volt.sens) {
        case 1: {
            if(device() === 'WeatherMonitorBIM32') { // Wireless sensor
                if(vl.WsensorDataRelevance(wsensNum)) {
                    switch(config.display.source.volt.volt) {
                        case 0: value = vl.validateBatteryADC(data.wsensor?.bat[wsensNum] ?? 0) // Battery voltage
                            ? bat.batVoltage(data.wsensor?.bat[wsensNum] ?? 0, config.wsensor?.bat.k[wsensNum] ?? 0).toFixed(2) + i18n.t('units.v')
                            : ''; break;
                        case 1: value = vl.validateBatteryADC(data.wsensor?.bat[wsensNum] ?? 0) // Battery percentage
                            ? Math.round(bat.batPercent(config.wsensor?.bat.type[wsensNum] ?? 0, data.wsensor?.bat[wsensNum] ?? 0, config.wsensor?.bat.k[wsensNum] ?? 0)) + '%'
                            : ''; break;
                        case 2: value = vl.validateHighVoltage(data.wsensor?.voltage.data[wsensNum] ?? 0) // High voltage
                            ? (data.wsensor?.voltage.data[wsensNum] ?? 0).toFixed(1) + i18n.t('units.v')
                            : ''; break;
                        case 3: value = vl.validateCO2(data.wsensor?.co2.data[wsensNum] ?? 0) // CO2
                            ? Math.round(data.wsensor?.co2.data[wsensNum] ?? 0) + 'ppm'
                            : ''; 
                            type = 'air'; break;
                    };
                }
            } 
            else {
                switch(config.display.source.volt.thingType) {
                    case 0: value = bat.batVoltageStr(data.adc ?? 0, config.batK ?? 0); break;
                    case 1: value = bat.batPercentStr(data.adc ?? 0, config.batK ?? 0); break;
                    default: value = "--"; break;
                }
            }
            break;
        }
        case 2: // Thingspeak
            if(vl.ThingspeakDataRelevance()) {
                value = vl.validateThingspeak(
                    data.thing?.data 
                        ? data.thing?.data[thingNum] 
                        : -40400
                )
                ? data.thing?.data 
                    ? config.display.source.volt.thingType
                        ? Math.round(data.thing?.data[thingNum]) + '%'
                        : (data.thing?.data[thingNum]).toFixed(2) + i18n.t('units.v')
                    : ''
                : ''
            }; 
            break;
        case 3: // Date
            value = moment().locale(locale).format('ll');
            value = value.replaceAll(' de', '');
            value = value.replace(/(?<!\d)\./g, '');
            value = value.replace(/\s[гр]$/, '');
            type = 'date';
            break;
        case (device() === 'WeatherMonitorBIM32' ? 4 : 104): // BME680 IAQ
            value = vl.validateIaq(data.bme680?.iaq ?? 0)
                ? 'IAQ ' + Math.round(data.bme680?.iaq ?? 0)
                : ''; 
            type = 'air'; 
            break; 
        case (device() === 'WeatherMonitorBIM32' ? 5 : 105): // BME680 Absolute humidity
            const bme680aHum = calculate.absoluteHumVal(data.bme680?.temp, data.bme680?.hum);
            value = vl.vaidateAbsHum(bme680aHum)
                ? bme680aHum.toFixed(1) + i18n.t('units.gpm')
                : '--';
            break;
        case (device() === 'WeatherMonitorBIM32' ? 6 : 106): // BME680 Dew Point
            const bme680dp = calculate.dewPointVal(data.bme680?.temp, data.bme680?.hum);
            value = vl.validateDewPoint(bme680dp, data.bme680?.temp)
                ? String(bme680dp.toFixed(1)) + '°C'
                : '--';
            break;
        case (device() === 'WeatherMonitorBIM32' ? 7 : 4): // BME280 Absolute humidity
            const bme280aHum = calculate.absoluteHumVal(data.bme280.temp, data.bme280.hum);
            value = vl.vaidateAbsHum(bme280aHum)
                ? bme280aHum.toFixed(1) + i18n.t('units.gpm')
                : '--';
            break;
        case (device() === 'WeatherMonitorBIM32' ? 8 : 5): // BME280 Dew Point
            const bme280dp = calculate.dewPointVal(data.bme280.temp, data.bme280.hum);
            value = vl.validateDewPoint(bme280dp, data.bme280.temp)
                ? String(bme280dp.toFixed(1)) + '°C'
                : '--';
            break;
        case (device() === 'WeatherMonitorBIM32' ? 9 : 6): // DHT22 Absolute humidity
            const dht22aHum = calculate.absoluteHumVal(data.dht22.temp, data.dht22.hum);
            value = vl.vaidateAbsHum(dht22aHum)
                ? dht22aHum.toFixed(1) + i18n.t('units.gpm')
                : '--';
            break;
        case (device() === 'WeatherMonitorBIM32' ? 10 : 7): // DHT22 Dew Point
            const dht22dp = calculate.dewPointVal(data.dht22.temp, data.dht22.hum);
            value = vl.validateDewPoint(dht22dp, data.dht22.temp)
                ? String(dht22dp.toFixed(1)) + '°C'
                : '--';
            break;
        case (device() === 'WeatherMonitorBIM32' ? 11 : 8): // SHT21 Absolute humidity
            const sht21aHum = calculate.absoluteHumVal(data.sht21.temp, data.sht21.hum);
            value = vl.vaidateAbsHum(sht21aHum)
                ? sht21aHum.toFixed(1) + i18n.t('units.gpm')
                : '--';
            break;
        case (device() === 'WeatherMonitorBIM32' ? 12 : 9): // SHT21 Dew Point
            const sht21dp = calculate.dewPointVal(data.sht21.temp, data.sht21.hum);
            value = vl.validateDewPoint(sht21dp, data.sht21.temp)
                ? String(sht21dp.toFixed(1)) + '°C'
                : '--';
            break;
        case (device() === 'WeatherMonitorBIM32' ? 13 : 10): // Weather Absolute humidity
            const weatheraHum = calculate.absoluteHumVal(data.weather.temp, data.weather.hum);
            value = vl.vaidateAbsHum(weatheraHum)
                ? weatheraHum.toFixed(1) + i18n.t('units.gpm')
                : '--';
            break;
        case (device() === 'WeatherMonitorBIM32' ? 14 : 11): // Weather Dew Point
            const weatherdp = calculate.dewPointVal(data.weather.temp, data.weather.hum);
            value = vl.validateDewPoint(weatherdp, data.weather.temp)
                ? String(weatherdp.toFixed(1)) + '°C'
                : '--';
            break;
        default: ; break;
    }

    const res = {
        val: value,
        type: type
    }
    return res;
}