import React, { useState, useEffect } from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import RangeInput from "../atoms/rangeInput";
import TextInput from "../atoms/textInput";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as cf from "../redux/slices/config";
import * as vl from "../atoms/validateValues";

const CardDisplayHumidityIn = () => {
    const [prevSens, setPrevSens] = useState<number>(0);
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const sensors = [
        "--",
        `${i18n.t('forecast')} (${vl.validateHumidity(data.weather.hum) ? (data.weather.hum.toFixed(2) + '%') : '--'})`,
        i18n.t('wirelessSensor.singular'),
        'Thingspeak',
        i18n.t('sequence'),
        `BME280 (${vl.validateHumidity(data.bme280.hum) ? ((data.bme280.hum + config.sensors.bme280.h).toFixed(2) + '%') : '--'})`,
        `SHT21 (${vl.validateHumidity(data.sht21.hum) ? ((data.sht21.hum + config.sensors.dht22.h).toFixed(2) + '%') : '--'})`,
        `DHT22 (${vl.validateHumidity(data.dht22.hum) ? ((data.dht22.hum + config.sensors.dht22.h).toFixed(2) + '%') : '--'})`,
        `BME680 (${vl.validateHumidity(data.bme680.hum) ? ((data.bme680.hum + config.sensors.bme680.h).toFixed(2) + '%') : '--'})`
    ];

    let wsensors: string[] = [];
    for(let i=0; i<2; i++) wsensors.push(`${i18n.t('wirelessSensor.singular')} ${i} (${vl.WsensorDataRelevance(i) 
        ? vl.validateHumidity(data.wsensor.hum.data[i]) 
            ? ((data.wsensor.hum.data[i] + config.wsensor.hum.corr[i]).toFixed(2) + '%') 
            : '--' 
        : i18n.t('dataExpired')})`);

    let things: string[] = [];
    for(let i=0; i<8; i++) things.push(`${i18n.t('field')} ${i + 1} (${vl.ThingspeakDataRelevance() 
        ? vl.validateThingspeak(data.thing.data[i]) ? data.thing.data[i] : '--' 
        : i18n.t('dataExpired')})`
    );

    useEffect(() => {
        setPrevSens(config.display.source.humIn.sens);
    }, [config.display.source.humIn.sens]);

    return <>
        <Card header={i18n.t('humidityIn')}
            content={<>
                {/* Sensor type */}
                <SelectSwitch label={i18n.t('dataSource.singular')}
                    options={sensors}
                    value={config.display.source.humIn.sens}
                    onChange={val => {
                        dispatch(cf.displaySourceHumInSensChange(val));
                        if(val === 4) dispatch(cf.displaySourceTempInSensChange(val));
                        if(prevSens === 4) dispatch(cf.displaySourceTempInSensChange(0));
                    }}
                />

                {/* Wireless sensor number */}
                {config.display.source.humIn.sens === 2 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('wirelessSensorNumber')}
                        options={wsensors}
                        value={config.display.source.humIn.wsensNum}
                        onChange={val => dispatch(cf.displaySourceHumInWsensNumChange(val))}
                    />
                </div>}

                {/* Thingspeak */}
                {config.display.source.humIn.sens === 3 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('field')}
                        options={things}
                        value={config.display.source.humIn.thing}
                        onChange={val => dispatch(cf.displaySourceHumInThingChange(val))}
                    />
                </div>}

                {/* Sequence */}
                {config.display.source.humIn.sens === 4 && <div className="mt-8">
                    <RangeInput value={config.display.source.sequence.dur}
                        label={i18n.t('displayDuration')}
                        min={1}
                        max={20}
                        limitMin={1}
                        limitMax={20}
                        step={1}
                        indication={String(config.display.source.sequence.dur)}
                        onChange={val => dispatch(cf.displaySourceSequenceDurChange(val))}
                    />

                    {[...Array(4)].map((m, num) => <>
                        <hr className="mt-8" />

                        {/* Sensor type */}
                        <div className="mt-8">  
                            <SelectSwitch label={i18n.t('timeSlot') + ' ' + String(num + 1)}
                                options={sensors.filter(sens => sens !== i18n.t('sequence'))}
                                value={config.display.source.sequence.hum[num]}
                                onChange={val => dispatch(cf.displaySourceSequenceHumChange({ num: num, val: val }))}
                            />
                        </div>

                        {/* Wireless sensor number */}
                        {config.display.source.sequence.hum[num] === 2 && <div className="mt-8">
                            <SelectSwitch label={i18n.t('wirelessSensorNumber')}
                                options={wsensors}
                                value={config.display.source.sequence.wsenshum[num]}
                                onChange={val => dispatch(cf.displaySourceSequenceWsensHumChange({ num: num, val: 0 }))}
                            />
                        </div>}

                        {/* Thingspeak */}
                        {config.display.source.sequence.hum[num] === 3 && <div className="mt-8">
                            <SelectSwitch label={i18n.t('field')}
                                options={things}
                                value={config.display.source.sequence.thnghum[num]}
                                onChange={val => dispatch(cf.displaySourceSequenceThngHumChange({ num: num, val: val }))}
                            />
                        </div>}

                        {/* Slot name */}
                        <div className="mt-8">
                            <TextInput label={i18n.t('name')} 
                                value={config.display.source.sequence.name[num]}
                                maxLength={15}
                                onChange={val => dispatch(cf.displaySourceSequenceNameChange({ num: num, val: val.target.value})) }
                            />
                        </div>
                    </>)}
                </div>}
            </>} 
        />
    </>
}

export default CardDisplayHumidityIn;