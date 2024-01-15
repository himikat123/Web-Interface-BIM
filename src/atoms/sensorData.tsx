import { useSelector } from 'react-redux';
import i18n from '../i18n/main';
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as vl from "./validateValues";

function SensorData() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const sensors = {
        BME680temp: vl.validateTemperature(data.bme680.temp) ? ((data.bme680.temp + config.sensors.bme680.t).toFixed(2) + '°C') : '--',
        BME680hum: vl.validateHumidity(data.bme680.hum) ? ((data.bme680.hum + config.sensors.bme680.h).toFixed(2) + '%') : '--',
        BME680pres: vl.validatePressure(data.bme680.pres) ? ((data.bme680.pres + config.sensors.bme680.p).toFixed(2) + i18n.t('units.hpa') + ' / ' + ((data.bme680.pres + config.sensors.bme680.p) * 0.75).toFixed(2) + i18n.t('units.mm')) : '--',
        BME680iaq: vl.validateIaq(data.bme680.iaq) ? (data.bme680.iaq.toFixed(2)) : '--',

        BME280temp: vl.validateTemperature(data.bme280.temp) ? ((data.bme280.temp + config.sensors.bme280.t).toFixed(2) + '°C') : '--',
        BME280hum: vl.validateHumidity(data.bme280.hum) ? ((data.bme280.hum + config.sensors.bme280.h).toFixed(2) + '%') : '--',
        BME280pres: vl.validatePressure(data.bme280.pres) ? ((data.bme280.pres + config.sensors.bme280.p).toFixed(2) + i18n.t('units.hpa') + ' / ' + ((data.bme280.pres + config.sensors.bme280.p) * 0.75).toFixed(2) + i18n.t('units.mm')) : '--',

        BMP180temp: vl.validateTemperature(data.bmp180.temp) ? ((data.bmp180.temp + config.sensors.bmp180.t).toFixed(2) + '°C') : '--',
        BMP180pres: vl.validatePressure(data.bmp180.pres) ? ((data.bmp180.pres + config.sensors.bmp180.p).toFixed(2) + i18n.t('units.hpa') + ' / ' + ((data.bmp180.pres + config.sensors.bmp180.p) * 0.75).toFixed(2) + i18n.t('units.mm')) : '--',

        SHT21temp: vl.validateTemperature(data.sht21.temp) ? ((data.sht21.temp + config.sensors.sht21.t).toFixed(2) + '°C') : '--',
        SHT21hum: vl.validateHumidity(data.sht21.hum) ? ((data.sht21.hum + config.sensors.dht22.h).toFixed(2) + '%') : '--',

        DHT22temp: vl.validateTemperature(data.dht22.temp) ? ((data.dht22.temp + config.sensors.dht22.t).toFixed(2) + '°C') : '--',
        DHT22hum: vl.validateHumidity(data.dht22.hum) ? ((data.dht22.hum + config.sensors.dht22.h).toFixed(2) + '%') : '--',

        DS18B20temp: vl.validateTemperature(data.ds18b20.temp) ? ((data.ds18b20.temp + config.sensors.ds18b20.t).toFixed(2) + '°C') : '--',

        ESP32temp: vl.validateTemperature(data.esp32.temp) ? ((data.esp32.temp + config.sensors.esp32.t).toFixed(2) + '°C') : '--',

        MAX44009light: vl.validateLight(data.max44009.light) ? ((data.max44009.light + config.sensors.max44009.l).toFixed(2) + i18n.t('units.lux')) : '--',

        BH1750light: vl.validateLight(data.bh1750.light) ? ((data.bh1750.light + config.sensors.bh1750.l).toFixed(2) + i18n.t('units.lux')) : '--',

        AnalogVolt: vl.validateAnalogVoltage(data.analog.volt) ? ((data.analog.volt + config.sensors.analog.v).toFixed(2) + i18n.t('units.v')) : '--',

        ForecastTemp: vl.validateTemperature(data.weather.temp) ? (data.weather.temp.toFixed(2) + '°C') : '--',
        ForecastHum: vl.validateHumidity(data.weather.hum) ? (data.weather.hum.toFixed(2) + '%') : '--',
        ForecastPres: vl.validatePressure(data.weather.pres) ? (data.weather.pres.toFixed(2) + i18n.t('units.hpa') + ' / ' + (data.weather.pres * 0.75).toFixed(2) + i18n.t('units.mm')) : '--',

        Thingspeak: [
            vl.ThingspeakDataRelevance() ? data.thing.data[0] : i18n.t('dataExpired'),
            vl.ThingspeakDataRelevance() ? data.thing.data[1] : i18n.t('dataExpired'),
            vl.ThingspeakDataRelevance() ? data.thing.data[2] : i18n.t('dataExpired'),
            vl.ThingspeakDataRelevance() ? data.thing.data[3] : i18n.t('dataExpired'),
            vl.ThingspeakDataRelevance() ? data.thing.data[4] : i18n.t('dataExpired'),
            vl.ThingspeakDataRelevance() ? data.thing.data[5] : i18n.t('dataExpired'),
            vl.ThingspeakDataRelevance() ? data.thing.data[6] : i18n.t('dataExpired'),
            vl.ThingspeakDataRelevance() ? data.thing.data[7] : i18n.t('dataExpired')
        ],

        Wsensor: [
            {
                temp: [
                    vl.WsensorDataRelevance(0) 
                        ? vl.validateTemperature(data.wsensor.temp.data[0][0]) 
                            ? ((data.wsensor.temp.data[0][0] + config.wsensor.temp.corr[0][0]).toFixed(2) + '°C') 
                            : '--' 
                        : i18n.t('dataExpired'),
                    vl.WsensorDataRelevance(0) 
                        ? vl.validateTemperature(data.wsensor.temp.data[1][0]) 
                            ? ((data.wsensor.temp.data[1][0] + config.wsensor.temp.corr[0][1]).toFixed(2) + '°C') 
                            : '--' 
                        : i18n.t('dataExpired'),
                    vl.WsensorDataRelevance(0) 
                        ? vl.validateTemperature(data.wsensor.temp.data[2][0]) 
                            ? ((data.wsensor.temp.data[2][0] + config.wsensor.temp.corr[0][2]).toFixed(2) + '°C') 
                            : '--' 
                        : i18n.t('dataExpired'),
                    vl.WsensorDataRelevance(0) 
                        ? vl.validateTemperature(data.wsensor.temp.data[3][0]) 
                            ? ((data.wsensor.temp.data[3][0] + config.wsensor.temp.corr[0][3]).toFixed(2) + '°C') 
                            : '--' 
                        : i18n.t('dataExpired'),
                    vl.WsensorDataRelevance(0) 
                        ? vl.validateTemperature(data.wsensor.temp.data[4][0]) 
                            ? ((data.wsensor.temp.data[4][0] + config.wsensor.temp.corr[0][4]).toFixed(2) + '°C') 
                            : '--' 
                        : i18n.t('dataExpired'),
                ],
                hum: vl.WsensorDataRelevance(0) 
                    ? vl.validateHumidity(data.wsensor.hum.data[0]) 
                        ? ((data.wsensor.hum.data[0] + config.wsensor.hum.corr[0]).toFixed(2) + '%') 
                        : '--' 
                    : i18n.t('dataExpired'),
                pres: vl.WsensorDataRelevance(0) 
                    ? vl.validatePressure(data.wsensor.pres.data[0]) 
                        ? ((data.wsensor.pres.data[0] + config.wsensor.pres.corr[0]).toFixed(2) + i18n.t('units.hpa') + ' / ' + ((data.wsensor.pres.data[0] + config.wsensor.pres.corr[0]) * 0.75).toFixed(2) + i18n.t('units.mm')) 
                        : '--' 
                    : i18n.t('dataExpired'),
                co2: vl.WsensorDataRelevance(0) 
                    ? vl.validateCO2(data.wsensor.co2.data[0]) 
                        ? ((data.wsensor.co2.data[0] + config.wsensor.co2.corr[0]).toFixed(2) + 'ppm') 
                        : '--' 
                    : i18n.t('dataExpired')
            },
            {
                temp: [
                    vl.WsensorDataRelevance(1) 
                        ? vl.validateTemperature(data.wsensor.temp.data[0][1]) 
                            ? ((data.wsensor.temp.data[0][1] + config.wsensor.temp.corr[1][0]).toFixed(2) + '°C') 
                            : '--' 
                        : i18n.t('dataExpired'),
                    vl.WsensorDataRelevance(1) 
                        ? vl.validateTemperature(data.wsensor.temp.data[1][1]) 
                            ? ((data.wsensor.temp.data[1][1] + config.wsensor.temp.corr[1][1]).toFixed(2) + '°C') 
                            : '--' 
                        : i18n.t('dataExpired'),
                    vl.WsensorDataRelevance(1) 
                        ? vl.validateTemperature(data.wsensor.temp.data[2][1]) 
                            ? ((data.wsensor.temp.data[2][1] + config.wsensor.temp.corr[1][2]).toFixed(2) + '°C') 
                            : '--' 
                        : i18n.t('dataExpired'),
                    vl.WsensorDataRelevance(1) 
                        ? vl.validateTemperature(data.wsensor.temp.data[3][1]) 
                            ? ((data.wsensor.temp.data[3][1] + config.wsensor.temp.corr[1][3]).toFixed(2) + '°C') 
                            : '--' 
                        : i18n.t('dataExpired'),
                    vl.WsensorDataRelevance(1) 
                        ? vl.validateTemperature(data.wsensor.temp.data[4][1]) 
                            ? ((data.wsensor.temp.data[4][1] + config.wsensor.temp.corr[1][4]).toFixed(2) + '°C') 
                            : '--' 
                        : i18n.t('dataExpired'),
                ],
                hum: vl.WsensorDataRelevance(1) 
                    ? vl.validateHumidity(data.wsensor.hum.data[1]) 
                        ? ((data.wsensor.hum.data[1] + config.wsensor.hum.corr[1]).toFixed(2) + '%') 
                        : '--' 
                    : i18n.t('dataExpired'),
                pres: vl.WsensorDataRelevance(1) 
                    ? vl.validatePressure(data.wsensor.pres.data[1]) 
                        ? ((data.wsensor.pres.data[1] + config.wsensor.pres.corr[1]).toFixed(2) + i18n.t('units.hpa') + ' / ' + ((data.wsensor.pres.data[1] + config.wsensor.pres.corr[1]) * 0.75).toFixed(2) + i18n.t('units.mm')) 
                        : '--' 
                    : i18n.t('dataExpired'),
                co2: vl.WsensorDataRelevance(1) 
                    ? vl.validateCO2(data.wsensor.co2.data[1]) 
                        ? ((data.wsensor.co2.data[1] + config.wsensor.co2.corr[1]).toFixed(2) + 'ppm') 
                        : '--' 
                    : i18n.t('dataExpired')
            }
        ]
    }

    return sensors;
}

export default SensorData;