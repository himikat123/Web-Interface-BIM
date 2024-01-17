import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import SensorData from "../atoms/sensorData";

const CardDisplayVoltage = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const sensors = [
        "--",
        i18n.t('wirelessSensor.singular'),
        'Thingspeak',
        `BME680 (iaq ${SensorData().BME680iaq})`
    ];

    let wsensors: string[] = [];
    for(let i=0; i<2; i++) wsensors.push(`${i18n.t('wirelessSensor.singular')} ${i}`);

    let wsensTypes = [
        `${i18n.t('batteryVoltage')} (${SensorData().Wsensor[config.display.source.volt.wsensNum].batVoltage})`,
        `${i18n.t('batteryPercentage')} (${SensorData().Wsensor[config.display.source.volt.wsensNum].batPercent})`,
        `${i18n.t('voltage')} PZEM-004t (${SensorData().Wsensor[config.display.source.volt.wsensNum].hiVoltage})`,
        `${i18n.t('CO2Level')} (${SensorData().Wsensor[config.display.source.volt.wsensNum].co2})`,
    ];

    let things: string[] = [];
    for(let i=0; i<8; i++) things.push(`${i18n.t('field')} ${i + 1} (${SensorData().Thingspeak[i]})`);

    return <>
        <Card header={i18n.t('voltage') + ' / ' + i18n.t('indexForAirQuality') + ' / ' + i18n.t('CO2Level')}
            content={<>
                {/* Sensor type */}
                <SelectSwitch label={i18n.t('dataSource.singular')}
                    options={sensors}
                    value={config.display.source.volt.sens}
                    onChange={val => dispatch(cf.DisplaySourceVoltSensChange(val))}
                />

                {/* Wireless sensor number */}
                {config.display.source.volt.sens === 1 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('wirelessSensorNumber')}
                        options={wsensors}
                        value={config.display.source.volt.wsensNum}
                        onChange={val => dispatch(cf.DisplaySourceVoltWsensNumChange(val))}
                    />

                    {/* Wireless sensor type of sensor */}
                    <SelectSwitch label={i18n.t('sensor.singular')}
                        options={wsensTypes}
                        value={config.display.source.volt.volt}
                        onChange={val => dispatch(cf.DisplaySourceVoltVoltChange(val))}
                    />
                </div>}

                {/* Thingspeak */}
                {config.display.source.volt.sens === 2 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('sensorType')}
                        options={[i18n.t('voltage'), i18n.t('batteryPercentage')]}
                        value={config.display.source.volt.thingType}
                        onChange={val => dispatch(cf.DisplaySourceVoltThingTypeChange(val))}
                    />
                    <div className="mt-8">
                        <SelectSwitch label={i18n.t('field')}
                            options={things}
                            value={config.display.source.volt.thing}
                            onChange={val => dispatch(cf.DisplaySourceVoltThingChange(val))}
                        />
                    </div>
                </div>}
            </>} 
        />
    </>
}

export default CardDisplayVoltage;