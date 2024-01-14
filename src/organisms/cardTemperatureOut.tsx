import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import SensorData from "../atoms/sensorData";

const CardTemperature = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const sensors = [
        "--",
        i18n.t('forecast') + ' (' + SensorData().ForecastTemp + ')',
        i18n.t('wirelessSensor.singular') + ' (' + SensorData().Wsensor[config.display.source.tempIn.wsensNum].temp[config.display.source.tempIn.temp] + ')',
        'Thingspeak (' + SensorData().Thingspeak[config.display.source.tempIn.thing] + '°C)',
        'BME280 (' + SensorData().BME280temp + ')',
        'BMP180 (' + SensorData().BME280temp + ')',
        'SHT21 (' + SensorData().SHT21temp + ')',
        'DHT22 (' + SensorData().DHT22temp + ')',
        'DS18B20 (' + SensorData().DS18B20temp + ')',
        i18n.t('sequence') + ' (...)',
        'BME680 (' + SensorData().BME680temp + ')'
    ];

    let wsensors: string[] = [];
    for(let i=0; i<2; i++) wsensors.push(`${i18n.t('wirelessSensor.singular')} ${i} (${SensorData().Wsensor[i].temp[config.display.source.tempIn.temp]})`);

    let temps: string[] = [];
    for(let i=0; i<5; i++) temps.push(`${i18n.t('temperature')} ${i} (${SensorData().Wsensor[config.display.source.tempIn.wsensNum].temp[i]})`);
    
    let things: string[] = [];
    for(let i=0; i<8; i++) things.push(`${i18n.t('field')} ${i + 1} (${SensorData().Thingspeak[i]})`);

    return <>
        <Card header={i18n.t('temperatureOut')}
            content={<>
                {/* Sensor type */}
                <SelectSwitch label={i18n.t('dataSource.singular')}
                    options={sensors}
                    value={config.display.source.tempIn.sens}
                    onChange={val => dispatch(cf.DisplaySourceTempInSensChange(val))}
                />

                {/* Wireless sensor number */}
                {config.display.source.tempIn.sens === 2 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('wirelessSensorNumber')}
                        options={wsensors}
                        value={config.display.source.tempIn.wsensNum}
                        onChange={val => dispatch(cf.DisplaySourceTempInWsensNumChange(val))}
                    />
                </div>}

                {/* Wireless sensor temperature sensor number */}
                {config.display.source.tempIn.sens === 2 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('temperatureSensorNumber')}
                        options={temps}
                        value={config.display.source.tempIn.temp}
                        onChange={val => dispatch(cf.DisplaySourceTempInTempChange(val))}
                    />
                </div>}

                {/* Thingspeak */}
                {config.display.source.tempIn.sens === 3 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('field')}
                        options={things}
                        value={config.display.source.tempIn.thing}
                        onChange={val => dispatch(cf.DisplaySourceTempInThingChange(val))}
                    />
                </div>}
            </>} 
        />
    </>
}

export default CardTemperature;