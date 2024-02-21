import { useSelector } from 'react-redux';
import i18n from '../i18n/main';
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as vl from "./validateValues";

function Comfort() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    let temp = 40400;
    let hum = 40400;
    let tempLevel = 0;
    let humLevel = 0;

    switch(config.comfort.temp.source) {
        case 1: temp = data.weather.temp; break; // temperature from weather forecast
        case 2: // temperature from wireless sensor
            if(vl.WsensorDataRelevance(config.comfort.temp.wsensNum))
                temp = data.wsensor.temp.data[config.comfort.temp.sens][config.comfort.temp.wsensNum] + config.wsensor.temp.corr[config.comfort.temp.wsensNum][config.comfort.temp.sens];
            break;
        case 3: // temperature from thingspeak
            if(vl.ThingspeakDataRelevance())
                temp = data.thing.data[config.comfort.temp.thing];
            break;
        case 4: temp = data.bme280.temp + config.sensors.bme280.t; break; // temperature from BME280
        case 5: temp = data.bmp180.temp + config.sensors.bmp180.t; break; // temperature from BMP180
        case 6: temp = data.sht21.temp + config.sensors.sht21.t; break; // temperature from SHT21
        case 7: temp = data.dht22.temp + config.sensors.dht22.t; break; // temperature from DHT22
        case 8: temp = data.ds18b20.temp + config.sensors.ds18b20.t; break; // temperature from DS18B20
        case 9: temp = data.bme680.temp + config.sensors.bme680.t; break; // temperature from BME680
    }

    switch(config.comfort.hum.source) {
        case 1: hum = data.weather.hum; break; // humidity from weather forecast
        case 2: // humidity from wireless sensor
            if(vl.WsensorDataRelevance(config.comfort.hum.wsensNum))
                hum = data.wsensor.hum.data[config.comfort.hum.wsensNum] + config.wsensor.hum.corr[config.comfort.hum.wsensNum];
            break;
        case 3: // humidity from thingspeak
            if(vl.ThingspeakDataRelevance())
                hum = data.thing.data[config.comfort.hum.thing];
            break;
        case 4: hum = data.bme280.hum + config.sensors.bme280.h; break; // humidity from BME280
        case 5: hum = data.sht21.hum + config.sensors.sht21.h; break; // humidity from SHT21
        case 6: hum = data.dht22.hum + config.sensors.dht22.h; break; // humidity from DHT22
        case 7: hum = data.bme680.hum + config.sensors.bme680.h; break; // humidity from BME680
    }
  
    if(vl.validateTemperature(temp)) {
        if(temp > config.comfort.temp.max[0]) tempLevel = 1;
        if(temp < config.comfort.temp.min[0]) tempLevel = 2;
    }
    else tempLevel = -1;

    if(vl.validateHumidity(hum)) {
        if(hum > config.comfort.hum.max[0]) humLevel = 1;
        if(hum < config.comfort.hum.min[0]) humLevel = 2;
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

    if(config.comfort.iaq.source === 1) {
        const iaq = data.bme680.iaq + config.sensors.bme680.i;
        if(vl.validateIaq(iaq)) {
            let iaqLevel = i18n.t('cleanAir');
            if(iaq > 100.0) iaqLevel = i18n.t('polutedAir');
            if(iaq > 200.0) iaqLevel = i18n.t('havilyPolutedAir');
            if(comfort.length) comfort += ". ";
            comfort += iaqLevel;
        } 
    }

    else if(config.comfort.co2.source === 1) {
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

    return comfort.length ? comfort : null;
}

export default Comfort;