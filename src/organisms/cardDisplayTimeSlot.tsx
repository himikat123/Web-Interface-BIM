import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";
import hostUrl from "../atoms/hostUrl";
import Card from "../atoms/card";
import NumberInput from "../atoms/numberInput";
import ColorInput from "../atoms/colorInput";
import SelectSwitch from "../atoms/selectSwitch";
import SensorData from "../atoms/sensorData";
import { iConfig } from "../redux/configTypes";
import { iDisplayTimeSlot } from "../interfaces";
import { display1ValidChange } from "../redux/slices/valid";
import * as cf from "../redux/slices/config";

const CardDisplayTimeSlot = (props: iDisplayTimeSlot) => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const sensors = [
        i18n.t('time') + ' (' + moment().format('HH:mm:ss') + ')',
        i18n.t('date') + ' (' + moment().format('DD.MM.YYYY') + ')',
        'BME280',
        'BMP180',
        'SHT21',
        'DHT22',
        'DS18B20',
        'ESP32',
        'Thingspeak',
        i18n.t('forecast'),
        i18n.t('wirelessSensor.singular'),
        'BME680'
    ];

    const types = [
        [],
        [],
        [
            i18n.t('temperature') + ' (' + SensorData().BME280temp + ')',
            i18n.t('humidity') + ' (' + SensorData().BME280hum + ')',
            i18n.t('pressure') + ' (' + SensorData().BME280pres + ')'
        ],
        [
            i18n.t('temperature') + ' (' + SensorData().BMP180temp + ')',
            i18n.t('pressure') + ' (' + SensorData().BMP180pres + ')'
        ],
        [
            i18n.t('temperature') + ' (' + SensorData().SHT21temp + ')',
            i18n.t('humidity') + ' (' + SensorData().SHT21hum + ')'
        ],
        [
            i18n.t('temperature') + ' (' + SensorData().DHT22temp + ')',
            i18n.t('humidity') + ' (' + SensorData().DHT22hum + ')'
        ],
        [
            i18n.t('temperature') + ' (' + SensorData().DS18B20temp + ')',
        ],
        [
            i18n.t('temperature') + ' (' + SensorData().ESP32temp + ')',
        ],
        [],
        [
            i18n.t('temperature') + ' (' + SensorData().ForecastTemp + ')',
            i18n.t('humidity') + ' (' + SensorData().ForecastHum + ')',
            i18n.t('pressure') + ' (' + SensorData().ForecastPres + ')'
        ],
        [],
        [
            i18n.t('temperature') + ' (' + SensorData().BME680temp + ')',
            i18n.t('humidity') + ' (' + SensorData().BME680hum + ')',
            i18n.t('pressure') + ' (' + SensorData().BME680pres + ')',
            i18n.t('indexForAirQuality') + ' (' + SensorData().BME680iaq + ')'
        ]
    ];

    const wsensorTypes = [
        [
            i18n.t('temperature') + ' 0 (' + SensorData().Wsensor[0].temp[0] + ')',
            i18n.t('temperature') + ' 1 (' + SensorData().Wsensor[0].temp[1] + ')',
            i18n.t('temperature') + ' 2 (' + SensorData().Wsensor[0].temp[2] + ')',
            i18n.t('temperature') + ' 3 (' + SensorData().Wsensor[0].temp[3] + ')',
            i18n.t('temperature') + ' 4 (' + SensorData().Wsensor[0].temp[4] + ')',
            i18n.t('humidity') + ' (' + SensorData().Wsensor[0].hum + ')',
            i18n.t('pressure') + ' (' + SensorData().Wsensor[0].pres + ')',
            'CO2 (' + SensorData().Wsensor[0].co2 + ')'
        ],
        [
            i18n.t('temperature') + ' 0 (' + SensorData().Wsensor[1].temp[0] + ')',
            i18n.t('temperature') + ' 1 (' + SensorData().Wsensor[1].temp[1] + ')',
            i18n.t('temperature') + ' 2 (' + SensorData().Wsensor[1].temp[2] + ')',
            i18n.t('temperature') + ' 3 (' + SensorData().Wsensor[1].temp[3] + ')',
            i18n.t('temperature') + ' 4 (' + SensorData().Wsensor[1].temp[4] + ')',
            i18n.t('humidity') + ' (' + SensorData().Wsensor[1].hum + ')',
            i18n.t('pressure') + ' (' + SensorData().Wsensor[1].pres + ')',
            'CO2 (' + SensorData().Wsensor[1].co2 + ')'
        ],
    ];

    let things: string[] = [];
    for(let i=0; i<8; i++) things.push(`${i18n.t('field')} ${i + 1} (${SensorData().Thingspeak[i]})`);

    const sendSlotColor = (val: string) => {
        let url = `${hostUrl()}/esp/color`;
        url += `?hex=${val.replace('#', '')}`;
        url += `&slot=${props.slot}`;
        url += `&num=${props.num}`;
        fetch(url);
    }

    return <>
        <Card header={i18n.t('timeSlot') + ' ' + String(props.slot + 1)} 
            content={<>

                {/* Duration */}
                <NumberInput value={config.display.timeSlot.period[props.slot][props.num]}
                    min={0}
                    max={99}
                    label={i18n.t('displayDuration')}
                    onChange={val => dispatch(cf.DisplayTimeslotPeriodChange({slot: props.slot, num: props.num, val: val}))}
                    isValid={valid => dispatch(display1ValidChange(valid))}
                />

                {config.display.timeSlot.period[props.slot][props.num] > 0 && <>
                    {/* Color */}
                    {config.display.type[props.num] + props.num === 4 && <div className="mt-8">
                        <ColorInput value={config.display.timeSlot.color[props.slot][props.num]}
                            label={i18n.t('displayColor')} 
                            onChange={val => {
                                dispatch(cf.DisplayTimeslotColorChange({slot: props.slot, num: props.num, val: val}));
                                sendSlotColor(val);
                            }}
                        />
                    </div>}

                    {/* Data source */}
                    <div className="mt-8">
                        <SelectSwitch label={i18n.t('dataSource.singular')}
                            options={sensors}
                            value={config.display.timeSlot.sensor[props.slot][props.num]}
                            onChange={val => {
                                dispatch(cf.DisplayTimeslotSensorChange({slot: props.slot, num: props.num, val: val}));
                                dispatch(cf.DisplayTimeslotDataChange({slot: props.slot, num: props.num, val: 0}))
                            }}
                        />
                    </div>

                    {/* Sensor type */}
                    {types[config.display.timeSlot.sensor[props.slot][props.num]].length > 0 && <div className="mt-8">
                        <SelectSwitch label={i18n.t('sensorType')}
                            options={types[config.display.timeSlot.sensor[props.slot][props.num]]}
                            value={config.display.timeSlot.data[props.slot][props.num]}
                            onChange={val => dispatch(cf.DisplayTimeslotDataChange({slot: props.slot, num: props.num, val: val}))}
                        />
                    </div>}

                    {/* Thingspeak sensor type */}
                    {config.display.timeSlot.sensor[props.slot][props.num] === 8 && <div className="mt-8">
                        <SelectSwitch label={i18n.t('sensorType')}
                            options={[i18n.t('temperature'), i18n.t('humidity'), i18n.t('pressure')]}
                            value={config.display.timeSlot.data[props.slot][props.num]}
                            onChange={val => dispatch(cf.DisplayTimeslotDataChange({slot: props.slot, num: props.num, val: val}))}
                        />
                    </div>}

                    {/* Thingspeak field number */}
                    {config.display.timeSlot.sensor[props.slot][props.num] === 8 && <div className="mt-8">
                        <SelectSwitch label={i18n.t('field')}
                            options={things}
                            value={config.display.timeSlot.thing[props.slot][props.num]}
                            onChange={val => dispatch(cf.DisplayTimeslotThingChange({slot: props.slot, num: props.num, val: val}))}
                        />
                    </div>}

                    {/* Wireless sensor number */}
                    {config.display.timeSlot.sensor[props.slot][props.num] === 10 && <div className="mt-8">
                        <SelectSwitch label={i18n.t('wirelessSensor.singular')}
                            options={[...Array(2)].map((x, i) => i18n.t('wirelessSensor.singular') + ' ' + String(i))}
                            value={config.display.timeSlot.wsensor.num[props.slot][props.num]}
                            onChange={val => dispatch(cf.DisplayTimeslotWsensorNumChange({slot: props.slot, num: props.num, val: val}))}
                        />
                    </div>}

                    {/* Wireless sensor data type */}
                    {config.display.timeSlot.sensor[props.slot][props.num] === 10 && <div className="mt-8">
                        <SelectSwitch label={i18n.t('sensorType')}
                            options={wsensorTypes[config.display.timeSlot.wsensor.num[props.slot][props.num]]}
                            value={config.display.timeSlot.wsensor.type[props.slot][props.num]}
                            onChange={val => dispatch(cf.DisplayTimeslotWsensorTypeChange({slot: props.slot, num: props.num, val: val}))}
                        />
                    </div>}
                </>}
            </>}
        />
    </>
}

export default CardDisplayTimeSlot;