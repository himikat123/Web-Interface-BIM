import i18n from '../../i18n/main';
import store from '../../redux/store';
import device from '../../device';
import * as vl from "../validateValues";
import * as calculate from '../calculate';
import { voltage, percentage } from '../indications/battery';

interface iReturn {
    val: string,
    type: number
}

export default function lcdGetVoltage(): iReturn {
    const config = store.getState().config;
    const data = store.getState().data;

    let value = '';
    let type = 0;
    const wsensNum = config.display.source.volt.wsensNum ?? 0;
    const thingNum = config.display.source.volt.thing;

    if(device() === 'WeatherMonitorBIM') {
        if(config.display.source.volt.sens === 1 && vl.ThingspeakDataRelevance()) { // Thingspeak
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
        }
    }
    else {
        switch(config.display.source.volt.sens) {
            case 1: // Wireless sensor
                if(vl.WsensorDataRelevance(wsensNum)) {
                    switch(config.display.source.volt.volt) {
                        case 0: value = vl.validateBatteryADC(data.wsensor?.bat[wsensNum] ?? 0) // Battery voltage
                            ? voltage(data.wsensor?.bat[wsensNum] ?? 0, config.wsensor?.bat.k[wsensNum] ?? 0).toFixed(2) + i18n.t('units.v')
                            : ''; break;
                        case 1: value = vl.validateBatteryADC(data.wsensor?.bat[wsensNum] ?? 0) // Battery percentage
                            ? Math.round(percentage(config.wsensor?.bat.type[wsensNum] ?? 0, data.wsensor?.bat[wsensNum] ?? 0, config.wsensor?.bat.k[wsensNum] ?? 0)) + '%'
                            : ''; break;
                        case 2: value = vl.validateHighVoltage(data.wsensor?.voltage.data[wsensNum] ?? 0) // High voltage
                            ? (data.wsensor?.voltage.data[wsensNum] ?? 0).toFixed(2) + i18n.t('units.v')
                            : ''; break;
                        case 3: value = vl.validateCO2(data.wsensor?.co2.data[wsensNum] ?? 0) // CO2
                            ? Math.round(data.wsensor?.co2.data[wsensNum] ?? 0) + 'ppm'
                            : ''; 
                            type = 1; break;
                    };
                } 
                break;
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
            case 3: // BME680 IAQ
                value = vl.validateIaq(data.bme680?.iaq ?? 0)
                    ? 'IAQ ' + Math.round(data.bme680?.iaq ?? 0)
                    : ''; 
                type = 1; 
                break; 
            case 4: // BME680 Absolute humidity
                const bme680aHum = calculate.absoluteHumVal(data.bme680?.temp, data.bme680?.hum);
                value = vl.vaidateAbsHum(bme680aHum)
                    ? bme680aHum.toFixed(1) + i18n.t('units.gpm')
                    : '--';
                break;
            case 5: // BME680 Dew Point
                const bme680dp = calculate.dewPointVal(data.bme680?.temp, data.bme680?.hum);
                value = vl.validateDewPoint(bme680dp, data.bme680?.temp)
                    ? Math.round(bme680dp) + '°C'
                    : '--';
                break;
            case 6: // BME280 Absolute humidity
                const bme280aHum = calculate.absoluteHumVal(data.bme280.temp, data.bme280.hum);
                value = vl.vaidateAbsHum(bme280aHum)
                    ? bme280aHum.toFixed(1) + i18n.t('units.gpm')
                    : '--';
                break;
            case 7: // BME280 Dew Point
                const bme280dp = calculate.dewPointVal(data.bme280.temp, data.bme280.hum);
                value = vl.validateDewPoint(bme280dp, data.bme280.temp)
                    ? Math.round(bme280dp) + '°C'
                    : '--';
                break;
            case 8: // DHT22 Absolute humidity
                const dht22aHum = calculate.absoluteHumVal(data.dht22.temp, data.dht22.hum);
                value = vl.vaidateAbsHum(dht22aHum)
                    ? dht22aHum.toFixed(1) + i18n.t('units.gpm')
                    : '--';
                break;
            case 9: // DHT22 Dew Point
                const dht22dp = calculate.dewPointVal(data.dht22.temp, data.dht22.hum);
                value = vl.validateDewPoint(dht22dp, data.dht22.temp)
                    ? Math.round(dht22dp) + '°C'
                    : '--';
                break;
            case 10: // SHT21 Absolute humidity
                const sht21aHum = calculate.absoluteHumVal(data.sht21.temp, data.sht21.hum);
                value = vl.vaidateAbsHum(sht21aHum)
                    ? sht21aHum.toFixed(1) + i18n.t('units.gpm')
                    : '--';
                break;
            case 11: // SHT21 Dew Point
                const sht21dp = calculate.dewPointVal(data.sht21.temp, data.sht21.hum);
                value = vl.validateDewPoint(sht21dp, data.sht21.temp)
                    ? Math.round(sht21dp) + '°C'
                    : '--';
                break;
            case 12: // Weather Absolute humidity
                const weatheraHum = calculate.absoluteHumVal(data.weather.temp, data.weather.hum);
                value = vl.vaidateAbsHum(weatheraHum)
                    ? weatheraHum.toFixed(1) + i18n.t('units.gpm')
                    : '--';
                break;
            case 13: // Weather Dew Point
                const weatherdp = calculate.dewPointVal(data.weather.temp, data.weather.hum);
                value = vl.validateDewPoint(weatherdp, data.weather.temp)
                    ? Math.round(weatherdp) + '°C'
                    : '--';
                break;
            default: ; break;
        }
    }

    const res = {
        val: value,
        type: type
    }
    return res;
}