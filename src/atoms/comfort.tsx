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
        case 0: temp = data.weather.temp; break; // temperature from weather forecast
        case 1: // temperature from wireless sensor
            if(vl.WsensorDataRelevance(config.comfort.temp.wsensNum))
                temp = data.wsensor.temp.data[config.comfort.temp.sens][config.comfort.temp.wsensNum] + config.wsensor.temp.corr[config.comfort.temp.wsensNum][config.comfort.temp.sens];
            break;
        case 2: // temperature from thingspeak
            if(vl.ThingspeakDataRelevance())
                temp = data.thing.data[config.comfort.temp.thing];
            break;
        case 3: temp = data.bme280.temp + config.sensors.bme280.t; break; // temperature from BME280
        case 4: temp = data.bmp180.temp + config.sensors.bmp180.t; break; // temperature from BMP180
        case 5: temp = data.sht21.temp + config.sensors.sht21.t; break; // temperature from SHT21
        case 6: temp = data.dht22.temp + config.sensors.dht22.t; break; // temperature from DHT22
        case 7: temp = data.ds18b20.temp + config.sensors.ds18b20.t; break; // temperature from DS18B20
        case 8: temp = data.bme680.temp + config.sensors.bme680.t; break; // temperature from BME680
    }

    switch(config.comfort.hum.source) {
        case 0: hum = data.weather.hum; break; // humidity from weather forecast
        case 1: // humidity from wireless sensor
            if(vl.WsensorDataRelevance(config.comfort.hum.wsensNum))
                hum = data.wsensor.hum.data[config.comfort.hum.wsensNum] + config.wsensor.hum.corr[config.comfort.hum.wsensNum];
            break;
        case 2: // humidity from thingspeak
            if(vl.ThingspeakDataRelevance())
                hum = data.thing.data[config.comfort.hum.thing];
            break;
        case 3: hum = data.bme280.hum + config.sensors.bme280.h; break; // humidity from BME280
        case 4: hum = data.sht21.hum + config.sensors.sht21.h; break; // humidity from SHT21
        case 5: hum = data.dht22.hum + config.sensors.dht22.h; break; // humidity from DHT22
        case 6: hum = data.bme680.hum + config.sensors.bme680.h; break; // humidity from BME680
    }
  
    if(vl.validateTemperature(temp)) {
        if(temp > config.comfort.temp.max) tempLevel = 1;
        if(temp < config.comfort.temp.min) tempLevel = 2;
    }

    if(vl.validateHumidity(hum)) {
        if(hum > config.comfort.hum.max) humLevel = 1;
        if(hum < config.comfort.hum.min) humLevel = 2;
    }

    let comfort = 'comfortable';
    if(tempLevel === 1 && humLevel === 0) comfort = 'hot';
    if(tempLevel === 2 && humLevel === 0) comfort = 'cold';
    if(tempLevel === 0 && humLevel === 1) comfort = 'humid';
    if(tempLevel === 0 && humLevel === 2) comfort = 'dry';
    if(tempLevel === 1 && humLevel === 1) comfort = 'hot and humid';
    if(tempLevel === 1 && humLevel === 2) comfort = 'hot and dry';
    if(tempLevel === 2 && humLevel === 1) comfort = 'cold and humid';
    if(tempLevel === 2 && humLevel === 2) comfort = 'cold and dry';

    if(config.comfort_iaq_source() == 1) {
        float iaq = sensors.get_bme680_iaq(config.bme680_iaq_corr());
        if(sensors.checkIaq(iaq)) {
          _iaq_level = AIR_CLEAN;
          if(iaq > 100.0) _iaq_level = AIR_POLLUTED;
          if(iaq > 200.0) _iaq_level = AIR_HEAVILY_POLLUTED;
          if(comfort.length()) comfort += ". ";
          comfort += lang.airQuality(_iaq_level);
        } 
      }
      if(config.comfort_co2_source() == 1) {
        if(now() - wsensor.get_updated(config.comfort_co2_wsensNum()) < config.wsensor_expire(config.comfort_co2_wsensNum()) * 60) {
          float co2 = wsensor.get_co2(config.comfort_co2_wsensNum(), config.wsensor_co2_corr(config.comfort_co2_wsensNum()));
          if(wsensor.checkCo2(co2)) {
            _co2_level = AIR_CLEAN;
            if(co2 > 800.0) _co2_level = AIR_POLLUTED;
            if(co2 > 1400.0) _co2_level = AIR_HEAVILY_POLLUTED;
            if(comfort.length()) comfort += ". ";
            comfort += lang.airQuality(_co2_level);
          }
        } 
      }

      String comfort(unsigned int level) {
        switch(level) {
          case 0: {
            if(config.lang() == "de") return "Gemütlich";
            if(config.lang() == "ru") return "Комфортно";
            if(config.lang() == "pl") return "Przyjemny";
            if(config.lang() == "ua") return "Комфортно";
            return "Comfortable";
          }; break;
          case 1: {
            if(config.lang() == "de") return "Zu heiß";
            if(config.lang() == "ru") return "Жарко";
            if(config.lang() == "pl") return "Gorąco";
            if(config.lang() == "ua") return "Жарко";
            return "Too hot";
          }; break;
          case 2: {
            if(config.lang() == "de") return "Zu kalt";
            if(config.lang() == "ru") return "Холодно";
            if(config.lang() == "pl") return "Zimno";
            if(config.lang() == "ua") return "Холодно";
            return "Too cold";
          }; break;
          case 3: {
            if(config.lang() == "de") return "Zu trocken";
            if(config.lang() == "ru") return "Слишком сухо";
            if(config.lang() == "pl") return "Zbyt sucho";
            if(config.lang() == "ua") return "Занадто сухо";
            return "Too dry";
          }; break;
          case 4: {
            if(config.lang() == "de") return "Zu feucht";
            if(config.lang() == "ru") return "Слишком влажно";
            if(config.lang() == "pl") return "Zbyt wilgotno";
            if(config.lang() == "ua") return "Занадто волого";
            return "Too humid";
          }; break;
          case 5: {
            if(config.lang() == "de") return "Heiß und feucht";
            if(config.lang() == "ru") return "Жарко и влажно";
            if(config.lang() == "pl") return "Gorąco i wilgotno";
            if(config.lang() == "ua") return "Жарко та волого";
            return "Hot and humid";
          }; break;
          case 6: {
            if(config.lang() == "de") return "Heiß und trocken";
            if(config.lang() == "ru") return "Жарко и сухо";
            if(config.lang() == "pl") return "Gorąco i sucho";
            if(config.lang() == "ua") return "Жарко та сухо";
            return "Hot and dry";
          }; break;
          case 7: {
            if(config.lang() == "de") return "Kalt und feucht";
            if(config.lang() == "ru") return "Холодно и влажно";
            if(config.lang() == "pl") return "Zimno i wilgotno";
            if(config.lang() == "ua") return "Холодно та волого";
            return "Cold and humid";
          }; break;
          case 8: {
            if(config.lang() == "de") return "Kalt und trocken";
            if(config.lang() == "ru") return "Холодно и сухо";
            if(config.lang() == "pl") return "Zimno i sucho";
            if(config.lang() == "ua") return "Холодно та сухо";
            return "Cold and dry";
          }; break;
          default: return "???"; break;
        }
      }
  
      String airQuality(unsigned int level) {
        switch(level) {
          case 0: {
            if(config.lang() == "de") return "Saubere Luft";
            if(config.lang() == "ru") return "Воздух чистый";
            if(config.lang() == "pl") return "Powietrze czyste";
            if(config.lang() == "ua") return "Повітря чисте";
            return "Clean Air";
          }; break;
          case 1: {
            if(config.lang() == "de") return "Luft ist verschmutzt";
            if(config.lang() == "ru") return "Воздух загрязнен";
            if(config.lang() == "pl") return "Powietrze zanieczyszczone";
            if(config.lang() == "ua") return "Повітря забруднене";
            return "Air is polluted";
          }; break;
          case 2: {
            if(config.lang() == "de") return "Luft ist stark verschmutzt";
            if(config.lang() == "ru") return "Воздух сильно загрязнен";
            if(config.lang() == "pl") return "Powietrze silnie zanieczyszczone";
            if(config.lang() == "ua") return "Повітря сильно забруднене";
            return "Air is heavily polluted";
          }; break;
          default: return "???"; break;
        }
      }
    
    return comfort;
}

export default Comfort;