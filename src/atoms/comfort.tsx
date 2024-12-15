import { useSelector } from 'react-redux';
import i18n from '../i18n/main';
import device from '../device';
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as vl from "./validateValues";

export default function Comfort() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const tWsensNum = config.comfort.temp.wsensNum ?? 0;
    const tSens = config.comfort.temp.sens ?? 0;
    const hWsensNum = config.comfort.hum.wsensNum ?? 0;

    let temp = 40400;
    let hum = 40400;
    let tempLevel = 0;
    let humLevel = 0;

    const tcs = device() === 'WeatherMonitorBIM'
        ? [1, -1, 2, 3, 4, 5, 6, 7, -2]
        : [1, 2, 3, 4, 5, 6, 7, 8, 9]; 

    switch(config.comfort.temp.source) {
        case tcs[0]: temp = data.weather.temp; break; // temperature from weather forecast
        case tcs[1]: // temperature from wireless sensor
            if(vl.WsensorDataRelevance(tWsensNum))
                temp = data.wsensor.temp.data[tSens][tWsensNum] + config.wsensor.temp.corr[tWsensNum][tSens];
            break;
        case tcs[2]: // temperature from thingspeak
            if(vl.ThingspeakDataRelevance())
                temp = data.thing?.data ? data.thing.data[config.comfort.temp.thing] : -40400;
            break;
        case tcs[3]: // temperature from BME280
            temp = data.bme280.temp + config.sensors.bme280.t; 
            break;
        case tcs[4]: // temperature from BMP180
            temp = data.bmp180.temp + config.sensors.bmp180.t; 
            break;
        case tcs[5]: // temperature from SHT21
            temp = data.sht21.temp + config.sensors.sht21.t; 
            break;
        case tcs[6]: // temperature from DHT22
            temp = data.dht22.temp + config.sensors.dht22.t; 
            break;
        case tcs[7]: // temperature from DS18B20 
            temp = data.ds18b20.temp + config.sensors.ds18b20.t; 
            break;
        case tcs[8]: // temperature from BME680
            temp = data.bme680.temp + config.sensors.bme680.t; 
            break;
    }

    switch(config.comfort.hum.source) {
        case 1: hum = data.weather.hum; break; // humidity from weather forecast
        case (device() === 'WeatherMonitorBIM32' ? 2 : 400): // humidity from wireless sensor
            if(vl.WsensorDataRelevance(hWsensNum))
                hum = data.wsensor.hum.data[hWsensNum] + config.wsensor.hum.corr[hWsensNum];
            break;
        case (device() === 'WeatherMonitorBIM32' ? 3 : 2): // humidity from thingspeak
            if(vl.ThingspeakDataRelevance())
                hum = data.thing?.data ? data.thing.data[config.comfort.hum.thing] : -40400;
            break;
        case (device() === 'WeatherMonitorBIM32' ? 4 : 3): // humidity from BME280 
            hum = data.bme280.hum + config.sensors.bme280.h; 
            break;
        case (device() === 'WeatherMonitorBIM32' ? 5 : 4): // humidity from SHT21 
            hum = data.sht21.hum + config.sensors.sht21.h; 
            break;
        case (device() === 'WeatherMonitorBIM32' ? 6 : 5): // humidity from DHT22 
            hum = data.dht22.hum + config.sensors.dht22.h; 
            break;
        case (device() === 'WeatherMonitorBIM32' ? 7 : 401): // humidity from BME680 
            hum = data.bme680.hum + config.sensors.bme680.h; 
            break;
    }
  
    if(vl.validateTemperature(temp)) {
        if(temp > (Array.isArray(config.comfort.temp.max)
            ? config.comfort.temp.max[0]
            : config.comfort.temp.max
        )) tempLevel = 1;
        if(temp < (Array.isArray(config.comfort.temp.min)
            ? config.comfort.temp.min[0]
            : config.comfort.temp.min
        )) tempLevel = 2;
    }
    else tempLevel = -1;

    if(vl.validateHumidity(hum)) {
        if(hum > (Array.isArray(config.comfort.hum.max)
            ? config.comfort.hum.max[0]
            : config.comfort.hum.max
        )) humLevel = 1;
        if(hum < (Array.isArray(config.comfort.hum.min)
            ? config.comfort.hum.min[0]
            : config.comfort.hum.min
        )) humLevel = 2;
    }
    else humLevel = -1;

    let comfort = i18n.t('comfortable');
    if(tempLevel === -1 && humLevel === -1) comfort = '';
    if(tempLevel === 1 && humLevel < 1) comfort = i18n.t('tooHot');
    if(tempLevel === 2 && humLevel < 1) comfort = i18n.t('tooCold');
    if(tempLevel < 1 && humLevel === 1) comfort = i18n.t('tooHumid');
    if(tempLevel < 1 && humLevel === 2) comfort = i18n.t('tooDry');
    if(tempLevel === 1 && humLevel === 1) comfort = i18n.t('hotAndHumid');
    if(tempLevel === 1 && humLevel === 2) comfort = i18n.t('hotAndDry');
    if(tempLevel === 2 && humLevel === 1) comfort = i18n.t('coldAndHumid');
    if(tempLevel === 2 && humLevel === 2) comfort = i18n.t('coldAndDry');

    if(config.comfort.iaq?.source === 1) {
        if(device() === 'WeatherMonitorBIM32') {
            const iaq = data.bme680.iaq + config.sensors.bme680.i;
            if(vl.validateIaq(iaq)) {
                let iaqLevel = i18n.t('cleanAir');
                if(iaq > 100.0) iaqLevel = i18n.t('polutedAir');
                if(iaq > 200.0) iaqLevel = i18n.t('havilyPolutedAir');
                if(comfort.length) comfort += ". ";
                comfort += iaqLevel;
            }
        } 
    }

    else if(config.comfort.co2?.source === 1) {
        if(device() === 'WeatherMonitorBIM32') {
            if(vl.WsensorDataRelevance(config.comfort.co2.wsensNum)) {
                const co2 = data.wsensor.co2.data[config.comfort.co2.wsensNum] + config.wsensor.co2.corr[config.comfort.co2.wsensNum];
                if(vl.validateCO2(co2)) {
                    let co2Level = i18n.t('cleanAir');
                    if(co2 > 800.0) co2Level = i18n.t('polutedAir');
                    if(co2 > 1400.0) co2Level = i18n.t('havilyPolutedAir');
                    if(comfort.length) comfort += ". ";
                    comfort += co2Level;
                }
            }
        } 
    }

    return comfort.length ? comfort : null;
}