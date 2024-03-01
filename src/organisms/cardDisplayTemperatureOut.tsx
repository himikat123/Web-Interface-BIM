import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as cf from "../redux/slices/config";
import * as vl from "../atoms/validateValues";

const CardDisplayTemperatureOut = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const sensors = [
        "--",
        `${i18n.t('forecast')} (${vl.validateTemperature(data.weather.temp) ? (data.weather.temp.toFixed(2) + '°C') : '--'})`,
        i18n.t('wirelessSensor.singular'),
        'Thingspeak',
        `BME280 (${vl.validateTemperature(data.bme280.temp) ? ((data.bme280.temp + config.sensors.bme280.t).toFixed(2) + '°C') : '--'})`,
        `BMP180 (${vl.validateTemperature(data.bmp180.temp) ? ((data.bmp180.temp + config.sensors.bmp180.t).toFixed(2) + '°C') : '--'})`,
        `SHT21 (${vl.validateTemperature(data.sht21.temp) ? ((data.sht21.temp + config.sensors.sht21.t).toFixed(2) + '°C') : '--'})`,
        `DHT22 (${vl.validateTemperature(data.dht22.temp) ? ((data.dht22.temp + config.sensors.dht22.t).toFixed(2) + '°C') : '--'})`,
        `DS18B20 (${vl.validateTemperature(data.ds18b20.temp) ? ((data.ds18b20.temp + config.sensors.ds18b20.t).toFixed(2) + '°C') : '--'})`,
        `BME680 (${vl.validateTemperature(data.bme680.temp) ? ((data.bme680.temp + config.sensors.bme680.t).toFixed(2) + '°C') : '--'})`
    ];

    let wsensors: string[] = [];
    for(let i=0; i<2; i++) wsensors.push(`${i18n.t('wirelessSensor.singular')} ${i}`);

    let temps: string[] = [];
    for(let i=0; i<5; i++) temps.push(`${i18n.t('temperature')} ${i} (${vl.WsensorDataRelevance(config.display.source.tempOut.wsensNum) 
        ? vl.validateTemperature(data.wsensor.temp.data[i][config.display.source.tempOut.wsensNum]) 
            ? ((data.wsensor.temp.data[i][config.display.source.tempOut.wsensNum] + config.wsensor.temp.corr[config.display.source.tempOut.wsensNum][i]).toFixed(2) + '°C') 
            : '--' 
        : i18n.t('dataExpired')})`);
    
    let things: string[] = [];
    for(let i=0; i<8; i++) things.push(`${i18n.t('field')} ${i + 1} (${vl.ThingspeakDataRelevance() 
        ? vl.validateThingspeak(data.thing?.data ? data.thing?.data[i] : -40400) ? data.thing?.data ? data.thing?.data[i] : '--' : '--'
        : i18n.t('dataExpired')})`
    );

    return <>
        <Card header={i18n.t('temperatureOut')}
            content={<>
                {/* Sensor type */}
                <SelectSwitch label={i18n.t('dataSource.singular')}
                    options={sensors}
                    value={config.display.source.tempOut.sens}
                    onChange={val => dispatch(cf.displaySourceTempOutSensChange(val))}
                />

                {/* Wireless sensor number */}
                {config.display.source.tempOut.sens === 2 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('wirelessSensorNumber')}
                        options={wsensors}
                        value={config.display.source.tempOut.wsensNum}
                        onChange={val => dispatch(cf.displaySourceTempOutWsensNumChange(val))}
                    />
                </div>}

                {/* Wireless sensor temperature sensor number */}
                {config.display.source.tempOut.sens === 2 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('temperatureSensorNumber')}
                        options={temps}
                        value={config.display.source.tempOut.temp}
                        onChange={val => dispatch(cf.displaySourceTempOutTempChange(val))}
                    />
                </div>}

                {/* Thingspeak */}
                {config.display.source.tempOut.sens === 3 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('field')}
                        options={things}
                        value={config.display.source.tempOut.thing}
                        onChange={val => dispatch(cf.displaySourceTempOutThingChange(val))}
                    />
                </div>}
            </>} 
        />
    </>
}

export default CardDisplayTemperatureOut;