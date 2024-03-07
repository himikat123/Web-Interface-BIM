import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import { BatVoltage, BatPercent } from "../atoms/battery";
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as cf from "../redux/slices/config";
import * as vl from "../atoms/validateValues";

const CardDisplayVoltage = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const sensors = [
        "--",
        i18n.t('wirelessSensor.singular'),
        'Thingspeak',
        `BME680 (IAQ ${vl.validateIaq(data.bme680.iaq) ? (data.bme680.iaq.toFixed(2)) : '--'})`
    ];

    let wsensors: string[] = [];
    for(let i=0; i<2; i++) wsensors.push(`${i18n.t('wirelessSensor.singular')} ${i}`);

    let wsensTypes = [
        `${i18n.t('batteryVoltage')} (${BatVoltage(config.display.source.volt.wsensNum)})`,
        `${i18n.t('batteryPercentage')} (${BatPercent(config.display.source.volt.wsensNum)})`,
        `${i18n.t('voltage')} (${vl.WsensorDataRelevance(config.display.source.volt.wsensNum) 
            ? vl.validateHighVoltage(data.wsensor.voltage.data[config.display.source.volt.wsensNum]) 
                ? ((data.wsensor.voltage.data[config.display.source.volt.wsensNum] + config.wsensor.volt.corr[config.display.source.volt.wsensNum]).toFixed(2) + i18n.t('units.v')) 
                : '--' 
            : i18n.t('dataExpired')})`,
        `CO2 (${vl.WsensorDataRelevance(config.display.source.volt.wsensNum) 
            ? vl.validateCO2(data.wsensor.co2.data[config.display.source.volt.wsensNum]) 
                ? ((data.wsensor.co2.data[config.display.source.volt.wsensNum] + config.wsensor.co2.corr[config.display.source.volt.wsensNum]).toFixed(2) + 'ppm') 
                : '--' 
            : i18n.t('dataExpired')})`,
    ];

    let things: string[] = [];
    for(let i=0; i<8; i++) things.push(`${i18n.t('field')} ${i + 1} (${vl.ThingspeakDataRelevance() 
        ? vl.validateThingspeak(data.thing?.data ? data.thing?.data[i] : -40400) ? data.thing?.data ? data.thing?.data[i] : '--' : '--'
        : i18n.t('dataExpired')})`
    );

    return <>
        <Card header={<div>{`${i18n.t('voltage')} / ${i18n.t('air')}`}</div>}
            content={<>
                {/* Sensor type */}
                <SelectSwitch label={i18n.t('dataSource.singular')}
                    options={sensors}
                    value={config.display.source.volt.sens}
                    onChange={val => dispatch(cf.displaySourceVoltSensChange(val))}
                />

                {/* Wireless sensor number */}
                {config.display.source.volt.sens === 1 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('wirelessSensorNumber')}
                        options={wsensors}
                        value={config.display.source.volt.wsensNum}
                        onChange={val => dispatch(cf.displaySourceVoltWsensNumChange(val))}
                    />

                    {/* Wireless sensor type of sensor */}
                    <div className="mt-8">
                        <SelectSwitch label={i18n.t('sensor.singular')}
                            options={wsensTypes}
                            value={config.display.source.volt.volt}
                            onChange={val => dispatch(cf.displaySourceVoltVoltChange(val))}
                        />
                    </div>
                </div>}

                {/* Thingspeak */}
                {config.display.source.volt.sens === 2 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('sensorType')}
                        options={[i18n.t('voltage'), i18n.t('batteryPercentage')]}
                        value={config.display.source.volt.thingType}
                        onChange={val => dispatch(cf.displaySourceVoltThingTypeChange(val))}
                    />
                    <div className="mt-8">
                        <SelectSwitch label={i18n.t('field')}
                            options={things}
                            value={config.display.source.volt.thing}
                            onChange={val => dispatch(cf.displaySourceVoltThingChange(val))}
                        />
                    </div>
                </div>}
            </>} 
        />
    </>
}

export default CardDisplayVoltage;