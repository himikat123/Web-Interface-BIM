import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";
import hostUrl from "../atoms/hostUrl";
import Card from "../atoms/card";
import NumberInput from "../atoms/numberInput";
import ColorInput from "../atoms/colorInput";
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import { iDisplayTimeSlot } from "../interfaces";
import { display1ValidChange } from "../redux/slices/valid";
import * as cf from "../redux/slices/config";
import * as vl from "../atoms/validateValues";

const CardDisplayTimeSlot = (props: iDisplayTimeSlot) => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const sensors = [
        `${i18n.t('time')} (${moment().format('HH:mm:ss')})`,
        `${i18n.t('date')} (${moment().format('DD.MM.YYYY')})`,
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
        [], // Time
        [], // Data
        [   // BME280
            `${i18n.t('temperature')} (${vl.validateTemperature(data.bme280.temp) ? ((data.bme280.temp + config.sensors.bme280.t).toFixed(2) + '°C') : '--'})`,
            `${i18n.t('humidity')} (${vl.validateHumidity(data.bme280.hum) ? ((data.bme280.hum + config.sensors.bme280.h).toFixed(2) + '%') : '--'})`,
            `${i18n.t('pressure')} (${vl.validatePressure(data.bme280.pres) ? ((data.bme280.pres + config.sensors.bme280.p).toFixed(2) + i18n.t('units.hpa') + ' / ' + ((data.bme280.pres + config.sensors.bme280.p) * 0.75).toFixed(2) + i18n.t('units.mm')) : '--'})`
        ],
        [   // BMP180
            `${i18n.t('temperature')} (${vl.validateTemperature(data.bmp180.temp) ? ((data.bmp180.temp + config.sensors.bmp180.t).toFixed(2) + '°C') : '--'})`,
            `${i18n.t('pressure')} (${vl.validatePressure(data.bmp180.pres) ? ((data.bmp180.pres + config.sensors.bmp180.p).toFixed(2) + i18n.t('units.hpa') + ' / ' + ((data.bmp180.pres + config.sensors.bmp180.p) * 0.75).toFixed(2) + i18n.t('units.mm')) : '--'})`
        ],
        [   // SHT21
            `${i18n.t('temperature')} (${vl.validateTemperature(data.sht21.temp) ? ((data.sht21.temp + config.sensors.sht21.t).toFixed(2) + '°C') : '--'})`,
            `${i18n.t('humidity')} (${vl.validateHumidity(data.sht21.hum) ? ((data.sht21.hum + config.sensors.dht22.h).toFixed(2) + '%') : '--'})`
        ],
        [   // DHT22
            `${i18n.t('temperature')} (${vl.validateTemperature(data.dht22.temp) ? ((data.dht22.temp + config.sensors.dht22.t).toFixed(2) + '°C') : '--'})`,
            `${i18n.t('humidity')} (${vl.validateHumidity(data.dht22.hum) ? ((data.dht22.hum + config.sensors.dht22.h).toFixed(2) + '%') : '--'})`
        ],
        [   // DS18B20
            `${i18n.t('temperature')} (${vl.validateTemperature(data.ds18b20.temp) ? ((data.ds18b20.temp + config.sensors.ds18b20.t).toFixed(2) + '°C') : '--'})`
        ],
        [   // ESP32
            `${i18n.t('temperature')} (${vl.validateTemperature(data.esp32.temp) ? ((data.esp32.temp + config.sensors.esp32.t).toFixed(2) + '°C') : '--'})`
        ],
        [], // Thingspeak
        [   // Forecasr
            `${i18n.t('temperature')} (${vl.validateTemperature(data.weather.temp) ? (data.weather.temp.toFixed(2) + '°C') : '--'})`,
            `${i18n.t('humidity')} (${vl.validateHumidity(data.weather.hum) ? (data.weather.hum.toFixed(2) + '%') : '--'})`,
            `${i18n.t('pressure')} (${vl.validatePressure(data.weather.pres) ? (data.weather.pres.toFixed(2) + i18n.t('units.hpa') + ' / ' + (data.weather.pres * 0.75).toFixed(2) + i18n.t('units.mm')) : '--'})`
        ],
        [], // Wireless Sensor
        [   // BME680
            `${i18n.t('temperature')} (${vl.validateTemperature(data.bme680.temp) ? ((data.bme680.temp + config.sensors.bme680.t).toFixed(2) + '°C') : '--'})`,
            `${i18n.t('humidity')} (${vl.validateHumidity(data.bme680.hum) ? ((data.bme680.hum + config.sensors.bme680.h).toFixed(2) + '%') : '--'})`,
            `${i18n.t('pressure')} (${vl.validatePressure(data.bme680.pres) ? ((data.bme680.pres + config.sensors.bme680.p).toFixed(2) + i18n.t('units.hpa') + ' / ' + ((data.bme680.pres + config.sensors.bme680.p) * 0.75).toFixed(2) + i18n.t('units.mm')) : '--'})`,
            `${i18n.t('indexForAirQuality')} (${vl.validateIaq(data.bme680.iaq) ? (data.bme680.iaq.toFixed(2)) : '--'})`
        ]
    ];

    const wsensorTypes = [
        [
            `${i18n.t('temperature')} 0 (${vl.WsensorDataRelevance(0) 
                ? vl.validateTemperature(data.wsensor.temp.data[0][0]) 
                    ? ((data.wsensor.temp.data[0][0] + config.wsensor.temp.corr[0][0]).toFixed(2) + '°C') 
                    : '--' 
                : i18n.t('dataExpired')})`,
            `${i18n.t('temperature')} 1 (${vl.WsensorDataRelevance(0) 
                ? vl.validateTemperature(data.wsensor.temp.data[1][0]) 
                    ? ((data.wsensor.temp.data[1][0] + config.wsensor.temp.corr[0][1]).toFixed(2) + '°C') 
                    : '--' 
                : i18n.t('dataExpired')})`,
            `${i18n.t('temperature')} 2 (${vl.WsensorDataRelevance(0) 
                ? vl.validateTemperature(data.wsensor.temp.data[2][0]) 
                    ? ((data.wsensor.temp.data[2][0] + config.wsensor.temp.corr[0][2]).toFixed(2) + '°C') 
                    : '--' 
                : i18n.t('dataExpired')})`,
            `${i18n.t('temperature')} 3 (${vl.WsensorDataRelevance(0) 
                ? vl.validateTemperature(data.wsensor.temp.data[3][0]) 
                    ? ((data.wsensor.temp.data[3][0] + config.wsensor.temp.corr[0][3]).toFixed(2) + '°C') 
                    : '--' 
                : i18n.t('dataExpired')})`,
            `${i18n.t('temperature')} 4 (${vl.WsensorDataRelevance(0) 
                ? vl.validateTemperature(data.wsensor.temp.data[4][0]) 
                    ? ((data.wsensor.temp.data[4][0] + config.wsensor.temp.corr[0][4]).toFixed(2) + '°C') 
                    : '--' 
                : i18n.t('dataExpired')})`,
            `${i18n.t('humidity')} (${vl.WsensorDataRelevance(0) 
                ? vl.validateHumidity(data.wsensor.hum.data[0]) 
                    ? ((data.wsensor.hum.data[0] + config.wsensor.hum.corr[0]).toFixed(2) + '%') 
                    : '--' 
                : i18n.t('dataExpired')})`,
            `${i18n.t('pressure')} (${vl.WsensorDataRelevance(0) 
                ? vl.validatePressure(data.wsensor.pres.data[0]) 
                    ? ((data.wsensor.pres.data[0] + config.wsensor.pres.corr[0]).toFixed(2) + i18n.t('units.hpa') + ' / ' + ((data.wsensor.pres.data[0] + config.wsensor.pres.corr[0]) * 0.75).toFixed(2) + i18n.t('units.mm')) 
                    : '--' 
                : i18n.t('dataExpired')})`,
            `CO2 (${vl.WsensorDataRelevance(0) 
                ? vl.validateCO2(data.wsensor.co2.data[0]) 
                    ? ((data.wsensor.co2.data[0] + config.wsensor.co2.corr[0]).toFixed(2) + 'ppm') 
                    : '--' 
                : i18n.t('dataExpired')})`
        ],
        [
            `${i18n.t('temperature')} 0 (${vl.WsensorDataRelevance(1) 
                ? vl.validateTemperature(data.wsensor.temp.data[0][1]) 
                    ? ((data.wsensor.temp.data[0][1] + config.wsensor.temp.corr[1][0]).toFixed(2) + '°C') 
                    : '--' 
                : i18n.t('dataExpired')})`,
            `${i18n.t('temperature')} 1 (${vl.WsensorDataRelevance(1) 
                ? vl.validateTemperature(data.wsensor.temp.data[1][1]) 
                    ? ((data.wsensor.temp.data[1][1] + config.wsensor.temp.corr[1][1]).toFixed(2) + '°C') 
                    : '--' 
                : i18n.t('dataExpired')})`,
            `${i18n.t('temperature')} 2 (${vl.WsensorDataRelevance(1) 
                ? vl.validateTemperature(data.wsensor.temp.data[2][1]) 
                    ? ((data.wsensor.temp.data[2][1] + config.wsensor.temp.corr[1][2]).toFixed(2) + '°C') 
                    : '--' 
                : i18n.t('dataExpired')})`,
            `${i18n.t('temperature')} 3 (${vl.WsensorDataRelevance(1) 
                ? vl.validateTemperature(data.wsensor.temp.data[3][1]) 
                    ? ((data.wsensor.temp.data[3][1] + config.wsensor.temp.corr[1][3]).toFixed(2) + '°C') 
                    : '--' 
                : i18n.t('dataExpired')})`,
            `${i18n.t('temperature')} 4 (${vl.WsensorDataRelevance(1) 
                ? vl.validateTemperature(data.wsensor.temp.data[4][1]) 
                    ? ((data.wsensor.temp.data[4][1] + config.wsensor.temp.corr[1][4]).toFixed(2) + '°C') 
                    : '--' 
                : i18n.t('dataExpired')})`,
            `${i18n.t('humidity')} (${vl.WsensorDataRelevance(1) 
                ? vl.validateHumidity(data.wsensor.hum.data[1]) 
                    ? ((data.wsensor.hum.data[1] + config.wsensor.hum.corr[1]).toFixed(2) + '%') 
                    : '--' 
                : i18n.t('dataExpired')})`,
            `${i18n.t('pressure')} (${vl.WsensorDataRelevance(1) 
                ? vl.validatePressure(data.wsensor.pres.data[1]) 
                    ? ((data.wsensor.pres.data[1] + config.wsensor.pres.corr[1]).toFixed(2) + i18n.t('units.hpa') + ' / ' + ((data.wsensor.pres.data[1] + config.wsensor.pres.corr[1]) * 0.75).toFixed(2) + i18n.t('units.mm')) 
                    : '--' 
                : i18n.t('dataExpired')})`,
            `CO2 (${vl.WsensorDataRelevance(1) 
                ? vl.validateCO2(data.wsensor.co2.data[1]) 
                    ? ((data.wsensor.co2.data[1] + config.wsensor.co2.corr[1]).toFixed(2) + 'ppm') 
                    : '--' 
                : i18n.t('dataExpired')})`
        ],
    ];

    let things: string[] = [];
    for(let i=0; i<8; i++) things.push(`${i18n.t('field')} ${i + 1} (${vl.ThingspeakDataRelevance() ? data.thing.data[i] : i18n.t('dataExpired')})`);

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
                    onChange={val => dispatch(cf.displayTimeslotPeriodChange({slot: props.slot, num: props.num, val: val}))}
                    isValid={valid => dispatch(display1ValidChange(valid))}
                />

                {config.display.timeSlot.period[props.slot][props.num] > 0 && <>
                    {/* Color */}
                    {config.display.type[props.num] + props.num === 4 && <div className="mt-8">
                        <ColorInput value={config.display.timeSlot.color[props.slot][props.num]}
                            label={i18n.t('displayColor')} 
                            onChange={val => {
                                dispatch(cf.displayTimeslotColorChange({slot: props.slot, num: props.num, val: val}));
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
                                dispatch(cf.displayTimeslotSensorChange({slot: props.slot, num: props.num, val: val}));
                                dispatch(cf.displayTimeslotDataChange({slot: props.slot, num: props.num, val: 0}))
                            }}
                        />
                    </div>

                    {/* Sensor type */}
                    {types[config.display.timeSlot.sensor[props.slot][props.num]].length > 0 && <div className="mt-8">
                        <SelectSwitch label={i18n.t('sensorType')}
                            options={types[config.display.timeSlot.sensor[props.slot][props.num]]}
                            value={config.display.timeSlot.data[props.slot][props.num]}
                            onChange={val => dispatch(cf.displayTimeslotDataChange({slot: props.slot, num: props.num, val: val}))}
                        />
                    </div>}

                    {/* Thingspeak sensor type */}
                    {config.display.timeSlot.sensor[props.slot][props.num] === 8 && <div className="mt-8">
                        <SelectSwitch label={i18n.t('sensorType')}
                            options={[i18n.t('temperature'), i18n.t('humidity'), i18n.t('pressure')]}
                            value={config.display.timeSlot.data[props.slot][props.num]}
                            onChange={val => dispatch(cf.displayTimeslotDataChange({slot: props.slot, num: props.num, val: val}))}
                        />
                    </div>}

                    {/* Thingspeak field number */}
                    {config.display.timeSlot.sensor[props.slot][props.num] === 8 && <div className="mt-8">
                        <SelectSwitch label={i18n.t('field')}
                            options={things}
                            value={config.display.timeSlot.thing[props.slot][props.num]}
                            onChange={val => dispatch(cf.displayTimeslotThingChange({slot: props.slot, num: props.num, val: val}))}
                        />
                    </div>}

                    {/* Wireless sensor number */}
                    {config.display.timeSlot.sensor[props.slot][props.num] === 10 && <div className="mt-8">
                        <SelectSwitch label={i18n.t('wirelessSensor.singular')}
                            options={[...Array(2)].map((x, i) => i18n.t('wirelessSensor.singular') + ' ' + String(i))}
                            value={config.display.timeSlot.wsensor.num[props.slot][props.num]}
                            onChange={val => dispatch(cf.displayTimeslotWsensorNumChange({slot: props.slot, num: props.num, val: val}))}
                        />
                    </div>}

                    {/* Wireless sensor data type */}
                    {config.display.timeSlot.sensor[props.slot][props.num] === 10 && <div className="mt-8">
                        <SelectSwitch label={i18n.t('sensorType')}
                            options={wsensorTypes[config.display.timeSlot.wsensor.num[props.slot][props.num]]}
                            value={config.display.timeSlot.wsensor.type[props.slot][props.num]}
                            onChange={val => dispatch(cf.displayTimeslotWsensorTypeChange({slot: props.slot, num: props.num, val: val}))}
                        />
                    </div>}
                </>}
            </>}
        />
    </>
}

export default CardDisplayTimeSlot;