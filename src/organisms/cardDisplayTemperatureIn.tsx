import React, { useState } from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import RangeInput from "../atoms/rangeInput";
import TextInput from "../atoms/textInput";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import SensorData from "../atoms/sensorData";

const CardDisplayTemperatureIn = () => {
    const [tempWsensNum, setTempWsensNum] = useState<number>(0);
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const sensors = [
        "--",
        i18n.t('forecast') + ' (' + SensorData().ForecastTemp + ')',
        i18n.t('wirelessSensor.singular'),
        'Thingspeak',
        i18n.t('sequence'),
        'BME280 (' + SensorData().BME280temp + ')',
        'BMP180 (' + SensorData().BME280temp + ')',
        'SHT21 (' + SensorData().SHT21temp + ')',
        'DHT22 (' + SensorData().DHT22temp + ')',
        'DS18B20 (' + SensorData().DS18B20temp + ')',
        'BME680 (' + SensorData().BME680temp + ')'
    ];

    let wsensors: string[] = [];
    for(let i=0; i<2; i++) wsensors.push(`${i18n.t('wirelessSensor.singular')} ${i}`);

    let temps: string[] = [];
    for(let i=0; i<5; i++) temps.push(`${i18n.t('temperature')} ${i} (${SensorData().Wsensor[config.display.source.tempIn.wsensNum].temp[i]})`);

    let sequenceTemps: string[] = [];
    for(let i=0; i<5; i++) sequenceTemps.push(`${i18n.t('temperature')} ${i} (${SensorData().Wsensor[tempWsensNum].temp[i]})`);
    
    let things: string[] = [];
    for(let i=0; i<8; i++) things.push(`${i18n.t('field')} ${i + 1} (${SensorData().Thingspeak[i]})`);

    return <>
        <Card header={i18n.t('temperatureIn')}
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

                {/* Sequence */}
                {config.display.source.tempIn.sens === 4 && <div className="mt-8">
                    <RangeInput value={config.display.source.sequence.dur}
                        label={i18n.t('displayDuration')}
                        min={1}
                        max={20}
                        limitMin={1}
                        limitMax={20}
                        step={1}
                        indication={String(config.display.source.sequence.dur)}
                        onChange={val => dispatch(cf.DisplaySourceSequenceDurChange(val))}
                    />

                    {[...Array(4)].map((m, num) => <>
                        <hr className="mt-8" />

                        {/* Sensor type */}
                        <div className="mt-8">  
                            <SelectSwitch label={i18n.t('timeSlot') + ' ' + String(num + 1)}
                                options={sensors.filter(sens => sens != i18n.t('sequence'))}
                                value={config.display.source.sequence.temp[num]}
                                onChange={val => dispatch(cf.DisplaySourceSequenceTempChange({ num: num, val: val }))}
                            />
                        </div>

                        {/* Wireless sensor number */}
                        {config.display.source.sequence.temp[num] === 2 && <div className="mt-8">
                            <SelectSwitch label={i18n.t('wirelessSensorNumber')}
                                options={wsensors}
                                value={tempWsensNum}
                                onChange={val => {
                                    setTempWsensNum(val);
                                    dispatch(cf.DisplaySourceSequenceWsensTempChange({ num: num, wsens: 0, val: 0 }));
                                    dispatch(cf.DisplaySourceSequenceWsensTempChange({ num: num, wsens: 1, val: 0 }))
                                }}
                            />
                        </div>}

                        {/* Wireless sensor temperature sensor number */}
                        {config.display.source.sequence.temp[num] === 2 && <div className="mt-8">
                            <SelectSwitch label={i18n.t('temperatureSensorNumber')}
                                options={sequenceTemps}
                                value={config.display.source.sequence.wsenstemp[num][tempWsensNum]}
                                onChange={val => dispatch(cf.DisplaySourceSequenceWsensTempChange({ num: num, wsens: tempWsensNum, val: val }))}
                            />
                        </div>}

                        {/* Thingspeak */}
                        {config.display.source.sequence.temp[num] === 3 && <div className="mt-8">
                            <SelectSwitch label={i18n.t('field')}
                                options={things}
                                value={config.display.source.sequence.thngtemp[num]}
                                onChange={val => dispatch(cf.DisplaySourceSequenceThngTempChange({ num: num, val: val }))}
                            />
                        </div>}

                        {/* Slot name */}
                        <div className="mt-8">
                            <TextInput label={i18n.t('name')} 
                                value={config.display.source.sequence.name[num]}
                                maxLength={15}
                                onChange={val => dispatch(cf.DisplaySourceSequenceNameChange({ num: num, val: val.target.value})) }
                            />
                        </div>
                    </>)}
                </div>}
            </>} 
        />
    </>
}

export default CardDisplayTemperatureIn;