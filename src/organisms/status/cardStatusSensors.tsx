import React from 'react';
import { useSelector } from 'react-redux';
import i18n from '../../i18n/main';
import tempHumPres from '../../atoms/indications/tempHumPres';
import tempPres from '../../atoms/indications/tempPres';
import tempHum from '../../atoms/indications/tempHum';
import temp from '../../atoms/indications/temp';
import light from '../../atoms/indications/light';
import analog from '../../atoms/indications/analog';
import * as vl from '../../atoms/validateValues';
import type { iConfig } from "../../redux/configTypes";
import type { iData } from "../../redux/dataTypes";

export default function CardStatusSensors() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const bme280indications = tempHumPres(config.sensors.bme280, data.bme280, config.units.pres);
    const bmp180indications = tempPres(config.sensors.bmp180, data.bmp180, config.units.pres);
    const sht21indications = tempHum(config.sensors.sht21, data.sht21);
    const dht22indications = tempHum(config.sensors.dht22, data.dht22);
    const ds18b20indications = temp(config.sensors.ds18b20, data.ds18b20);
    const max44009indications = light(config.sensors.max44009, data.max44009);
    const bh1750indications = light(config.sensors.bh1750, data.bh1750);
    const analogIndications = analog(config.sensors.analog, data.analog);

    return <div className='text-center'>
        <h2 className='text-xl'>{i18n.t('sensor.plural')}</h2>

        {(vl.validateTemperature(parseFloat(bme280indications.temp)) 
          || vl.validateHumidity(parseFloat(bme280indications.hum)) 
          || vl.validatePressureHPA(parseFloat(bme280indications.pres))
        ) && <div className='mt-4'>
            BME280: <span className="text-blue-700 dark:text-blue-400">
                {bme280indications.temp}, {bme280indications.hum}, {bme280indications.pres}
            </span>
        </div>}

        {(vl.validateTemperature(parseFloat(bmp180indications.temp)) 
          || vl.validatePressureHPA(parseFloat(bmp180indications.pres))
        ) && <div className='mt-4'>
            BMP180: <span className="text-blue-700 dark:text-blue-400">
                {bmp180indications.temp}, {bmp180indications.pres}
            </span>
        </div>}

        {(vl.validateTemperature(parseFloat(sht21indications.temp)) 
          || vl.validateHumidity(parseFloat(sht21indications.hum)) 
        ) && <div className='mt-4'>
            SHT21: <span className="text-blue-700 dark:text-blue-400">
                {sht21indications.temp}, {sht21indications.hum}
            </span>
        </div>}

        {(vl.validateTemperature(parseFloat(dht22indications.temp)) 
          || vl.validateHumidity(parseFloat(dht22indications.hum)) 
        ) && <div className='mt-4'>
            DHT22: <span className="text-blue-700 dark:text-blue-400">
                {dht22indications.temp}, {dht22indications.hum}
            </span>
        </div>}

        {vl.validateTemperature(parseFloat(ds18b20indications)) && <div className='mt-4'>
            DS18B20: <span className="text-blue-700 dark:text-blue-400">
                {ds18b20indications}
            </span>
        </div>}

        {vl.validateLight(parseFloat(max44009indications)) && <div className='mt-4'>
            MAX44009: <span className="text-blue-700 dark:text-blue-400">
                {max44009indications}
            </span>
        </div>}

        {vl.validateLight(parseFloat(bh1750indications)) && <div className='mt-4'>
            BH1750: <span className="text-blue-700 dark:text-blue-400">
                {bh1750indications}
            </span>
        </div>}

        <div className='mt-4'>
            {i18n.t('analogInput')}: <span className="text-blue-700 dark:text-blue-400">
                {analogIndications}
            </span>
        </div>
    </div>
}