import React, { useEffect, useState } from "react";
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

const CardDisplayTemperatureIn = () => {
    const [tempWsensNum, setTempWsensNum] = useState<number>(0);
    const [prevSens, setPrevSens] = useState<number>(0);
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const sensors = [
        "--",
        `${i18n.t('forecast')} (${vl.validateTemperature(data.weather.temp) ? (data.weather.temp.toFixed(2) + '°C') : '--'})`,
        i18n.t('wirelessSensor.singular'),
        'Thingspeak',
        i18n.t('sequence'),
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

    let sequenceTemps: string[] = [];
    for(let i=0; i<5; i++) sequenceTemps.push(`${i18n.t('temperature')} ${i} (${vl.WsensorDataRelevance(tempWsensNum) 
        ? vl.validateTemperature(data.wsensor.temp.data[i][tempWsensNum]) 
            ? ((data.wsensor.temp.data[i][tempWsensNum] + config.wsensor.temp.corr[tempWsensNum][i]).toFixed(2) + '°C') 
            : '--' 
        : i18n.t('dataExpired')})`);
    
    let things: string[] = [];
    for(let i=0; i<8; i++) things.push(`${i18n.t('field')} ${i + 1} (${vl.ThingspeakDataRelevance() 
        ? vl.validateThingspeak(data.thing.data[i]) ? data.thing.data[i] : '--'
        : i18n.t('dataExpired')})`
    );

    useEffect(() => {
        setPrevSens(config.display.source.tempIn.sens);
    }, [config.display.source.tempIn.sens]);

    return <>
        <Card header={i18n.t('temperatureIn')}
            content={<>
                {/* Sensor type */}
                <SelectSwitch label={i18n.t('dataSource.singular')}
                    options={sensors}
                    value={config.display.source.tempIn.sens}
                    onChange={val => {
                        dispatch(cf.displaySourceTempInSensChange(val));
                        if(val === 4) dispatch(cf.displaySourceHumInSensChange(val));
                        if(prevSens === 4) dispatch(cf.displaySourceHumInSensChange(0));
                    }}
                />

                {/* Wireless sensor number */}
                {config.display.source.tempIn.sens === 2 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('wirelessSensorNumber')}
                        options={wsensors}
                        value={config.display.source.tempIn.wsensNum}
                        onChange={val => dispatch(cf.displaySourceTempInWsensNumChange(val))}
                    />
                </div>}

                {/* Wireless sensor temperature sensor number */}
                {config.display.source.tempIn.sens === 2 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('temperatureSensorNumber')}
                        options={temps}
                        value={config.display.source.tempIn.temp}
                        onChange={val => dispatch(cf.displaySourceTempInTempChange(val))}
                    />
                </div>}

                {/* Thingspeak */}
                {config.display.source.tempIn.sens === 3 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('field')}
                        options={things}
                        value={config.display.source.tempIn.thing}
                        onChange={val => dispatch(cf.displaySourceTempInThingChange(val))}
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
                        onChange={val => dispatch(cf.displaySourceSequenceDurChange(val))}
                    />

                    {[...Array(4)].map((m, num) => <>
                        <hr className="mt-8" />

                        {/* Sensor type */}
                        <div className="mt-8">  
                            <SelectSwitch label={i18n.t('timeSlot') + ' ' + String(num + 1)}
                                options={sensors.filter(sens => sens !== i18n.t('sequence'))}
                                value={config.display.source.sequence.temp[num]}
                                onChange={val => dispatch(cf.displaySourceSequenceTempChange({ num: num, val: val }))}
                            />
                        </div>

                        {/* Wireless sensor number */}
                        {config.display.source.sequence.temp[num] === 2 && <div className="mt-8">
                            <SelectSwitch label={i18n.t('wirelessSensorNumber')}
                                options={wsensors}
                                value={tempWsensNum}
                                onChange={val => {
                                    setTempWsensNum(val);
                                    dispatch(cf.displaySourceSequenceWsensTempChange({ num: num, wsens: 0, val: 0 }));
                                    dispatch(cf.displaySourceSequenceWsensTempChange({ num: num, wsens: 1, val: 0 }))
                                }}
                            />
                        </div>}

                        {/* Wireless sensor temperature sensor number */}
                        {config.display.source.sequence.temp[num] === 2 && <div className="mt-8">
                            <SelectSwitch label={i18n.t('temperatureSensorNumber')}
                                options={sequenceTemps}
                                value={config.display.source.sequence.wsenstemp[num][tempWsensNum]}
                                onChange={val => dispatch(cf.displaySourceSequenceWsensTempChange({ num: num, wsens: tempWsensNum, val: val }))}
                            />
                        </div>}

                        {/* Thingspeak */}
                        {config.display.source.sequence.temp[num] === 3 && <div className="mt-8">
                            <SelectSwitch label={i18n.t('field')}
                                options={things}
                                value={config.display.source.sequence.thngtemp[num]}
                                onChange={val => dispatch(cf.displaySourceSequenceThngTempChange({ num: num, val: val }))}
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

export default CardDisplayTemperatureIn;