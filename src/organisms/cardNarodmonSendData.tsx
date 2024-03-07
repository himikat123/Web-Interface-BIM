import React from "react";
import i18n from "../i18n/main";
import moment from "moment";
import 'moment/locale/de';
import 'moment/locale/ru';
import 'moment/locale/pl';
import 'moment/locale/uk';
import { useSelector, useDispatch } from 'react-redux';
import { BatVoltage, BatPercent, BatLevel } from "../atoms/battery";
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import TextInput from "../atoms/textInput";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import { iCardSend, iTypesList, iSensor, iSensors } from "../interfaces";
import * as cf from "../redux/slices/config";
import * as vl from "../atoms/validateValues";

const CardNarodmonSendData = (props: iCardSend) => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    let locale = 'en';
    
    switch(config.lang) {
        case 'de': locale = 'de'; break;
        case 'ru': locale = 'ru'; break;
        case 'pl': locale = 'pl'; break;
        case 'ua': locale = 'uk'; break;
        default: locale = 'en'; break; 
    }
    
    const sensors: iSensors = [
        {title: '--', types: [], data: []},
        {title: i18n.t('forecast'), types: ['t', 'h', 'p'], data: [data.weather.temp, data.weather.hum, data.weather.pres]},
        {title: i18n.t('wirelessSensor.singular'), types: [], data: []},
        {title: 'BME280', types: ['t', 'h', 'p'], data: [data.bme280.temp + config.sensors.bme280.t, data.bme280.hum + config.sensors.bme280.h, data.bme280.pres + config.sensors.bme280.p]},
        {title: 'BMP180', types: ['t', 'p'], data: [data.bmp180.temp + config.sensors.bmp180.t, data.bmp180.pres + config.sensors.bmp180.p]},
        {title: 'SHT21', types: ['t', 'h'], data: [data.sht21.temp + config.sensors.sht21.t, data.sht21.hum + config.sensors.sht21.h]},
        {title: 'DHT22', types: ['t', 'h'], data: [data.dht22.temp + config.sensors.dht22.t, data.dht22.hum + config.sensors.dht22.h]},
        {title: 'DS18B20', types: ['t'], data: [data.ds18b20.temp + config.sensors.ds18b20.t]},
        {title: 'MAx44009', types: ['l'], data: [data.max44009.light + config.sensors.max44009.l]},
        {title: 'BH1750', types: ['l'], data: [data.bh1750.light + config.sensors.bh1750.l]},
        {title: i18n.t('analogInput'), types: ['a'], data: [data.analog.volt + config.sensors.analog.v]},
        {title: 'ESP32', types: ['t', 'r'], data: [data.esp32.temp + config.sensors.esp32.t, Number(data.runtime)]},
        {title: 'BME680', types: ['t', 'h', 'p', 'i'], data: [data.bme680.temp + config.sensors.bme680.t, data.bme680.hum + config.sensors.bme680.h, data.bme680.pres + config.sensors.bme680.p, data.bme680.iaq + config.sensors.bme680.i]}
    ];

    const sensorTypes = (sens: iSensor) => {
        const typesList: iTypesList = {
            t: i18n.t('temperature'),
            h: i18n.t('humidity'),
            p: i18n.t('pressure'),
            i: i18n.t('indexForAirQuality'),
            l: i18n.t('ambientLight'),
            a: i18n.t('voltage'),
            r: i18n.t('runtime')
        };
        const list = sens.types.map((type, i) => {
            return `${typesList[type]} (${
                type === 't' ? vl.validateTemperature(sens.data[i]) ? (sens.data[i].toFixed(2) + '°C') : '--'
              : type === 'h' ? vl.validateHumidity(sens.data[i]) ? (sens.data[i].toFixed(2) + '%') : '--'
              : type === 'p' ? vl.validatePressure(sens.data[i]) ? (sens.data[i].toFixed(2) + i18n.t('units.hpa') + ' / ' + (sens.data[i] * 0.75).toFixed(2) + i18n.t('units.mm')) : '--'
              : type === 'i' ? vl.validateIaq(sens.data[i]) ? ('IAQ ' + sens.data[i].toFixed(2)) : '--'
              : type === 'l' ? vl.validateLight(sens.data[i]) ? (sens.data[i].toFixed(2) + i18n.t('units.lux')) : '--'
              : type === 'a' ? vl.validateAnalogVoltage(sens.data[i]) ? (sens.data[i].toFixed(2) + i18n.t('units.v')) : '--'
              : type === 'r' ? moment.duration(sens.data[i], 'seconds').locale(locale).humanize()
              : '???'
            })`;
        });
        return list;
    }

    let wsensors: string[] = [];
    for(let i=0; i<2; i++) wsensors.push(`${i18n.t('wirelessSensor.singular')} ${i}`);

    let wTypes: string[] = [];
    for(let i=0; i<5; i++) wTypes.push(`${i18n.t('temperature')} ${i} (${vl.WsensorDataRelevance(config.narodmonSend.wsensors[props.num]) 
        ? vl.validateTemperature(data.wsensor.temp.data[i][config.narodmonSend.wsensors[props.num]]) 
            ? ((data.wsensor.temp.data[i][config.narodmonSend.wsensors[props.num]] + config.wsensor.temp.corr[config.narodmonSend.wsensors[props.num]][i]).toFixed(2) + '°C') 
            : '--' 
        : i18n.t('dataExpired')})`
    );
    wTypes.push(`${i18n.t('humidity')} (${vl.WsensorDataRelevance(config.narodmonSend.wsensors[props.num]) 
        ? vl.validateHumidity(data.wsensor.hum.data[config.narodmonSend.wsensors[props.num]]) 
            ? ((data.wsensor.hum.data[config.narodmonSend.wsensors[props.num]] + config.wsensor.hum.corr[config.narodmonSend.wsensors[props.num]]).toFixed(2) + '%') 
            : '--' 
        : i18n.t('dataExpired')})`
    );
    wTypes.push(`${i18n.t('pressure')} (${vl.WsensorDataRelevance(config.narodmonSend.wsensors[props.num]) 
        ? vl.validatePressure(data.wsensor.pres.data[config.narodmonSend.wsensors[props.num]]) 
            ? ((data.wsensor.pres.data[config.narodmonSend.wsensors[props.num]] + config.wsensor.pres.corr[config.narodmonSend.wsensors[props.num]]).toFixed(2) + i18n.t('units.hpa') + ' / ' + ((data.wsensor.pres.data[config.narodmonSend.wsensors[props.num]] + config.wsensor.pres.corr[config.narodmonSend.wsensors[props.num]]) * 0.75).toFixed(2) + i18n.t('units.mm')) 
            : '--' 
        : i18n.t('dataExpired')})`
    );
    wTypes.push(`${i18n.t('ambientLight')} (${vl.WsensorDataRelevance(config.narodmonSend.wsensors[props.num]) 
        ? vl.validateLight(data.wsensor.light.data[config.narodmonSend.wsensors[props.num]]) 
            ? ((data.wsensor.light.data[config.narodmonSend.wsensors[props.num]] + config.wsensor.light.corr[config.narodmonSend.wsensors[props.num]]).toFixed(2) + i18n.t('units.lux')) 
            : '--' 
        : i18n.t('dataExpired')})`
    );
    wTypes.push(`${i18n.t('voltage')} (${vl.WsensorDataRelevance(config.narodmonSend.wsensors[props.num]) 
        ? vl.validateHighVoltage(data.wsensor.voltage.data[config.narodmonSend.wsensors[props.num]]) 
            ? ((data.wsensor.voltage.data[config.narodmonSend.wsensors[props.num]] + config.wsensor.volt.corr[config.narodmonSend.wsensors[props.num]]).toFixed(2) + i18n.t('units.v')) 
            : '--' 
        : i18n.t('dataExpired')})`
    );
    wTypes.push(`${i18n.t('current')} (${vl.WsensorDataRelevance(config.narodmonSend.wsensors[props.num]) 
        ? vl.validateCurrent(data.wsensor.current.data[config.narodmonSend.wsensors[props.num]]) 
            ? ((data.wsensor.current.data[config.narodmonSend.wsensors[props.num]] + config.wsensor.curr.corr[config.narodmonSend.wsensors[props.num]]).toFixed(2) + i18n.t('units.a')) 
            : '--' 
        : i18n.t('dataExpired')})`
    );
    wTypes.push(`${i18n.t('power')} (${vl.WsensorDataRelevance(config.narodmonSend.wsensors[props.num]) 
        ? vl.validateLight(data.wsensor.power.data[config.narodmonSend.wsensors[props.num]]) 
            ? ((data.wsensor.power.data[config.narodmonSend.wsensors[props.num]] + config.wsensor.pow.corr[config.narodmonSend.wsensors[props.num]]).toFixed(2) + i18n.t('units.w')) 
            : '--' 
        : i18n.t('dataExpired')})`
    );
    wTypes.push(`${i18n.t('energy')} (${vl.WsensorDataRelevance(config.narodmonSend.wsensors[props.num]) 
        ? vl.validateLight(data.wsensor.energy.data[config.narodmonSend.wsensors[props.num]]) 
            ? ((data.wsensor.energy.data[config.narodmonSend.wsensors[props.num]] + config.wsensor.enrg.corr[config.narodmonSend.wsensors[props.num]]).toFixed(2) + i18n.t('units.wh')) 
            : '--' 
        : i18n.t('dataExpired')})`
    );
    wTypes.push(`${i18n.t('frequency')} (${vl.WsensorDataRelevance(config.narodmonSend.wsensors[props.num]) 
        ? vl.validateLight(data.wsensor.freq.data[config.narodmonSend.wsensors[props.num]]) 
            ? ((data.wsensor.freq.data[config.narodmonSend.wsensors[props.num]] + config.wsensor.freq.corr[config.narodmonSend.wsensors[props.num]]).toFixed(2) + i18n.t('units.hz')) 
            : '--' 
        : i18n.t('dataExpired')})`
    );
    wTypes.push(`${i18n.t('batteryVoltage')} (${BatVoltage(config.narodmonSend.wsensors[props.num])})`);
    wTypes.push(`${i18n.t('batteryPercentage')} (${BatPercent(config.narodmonSend.wsensors[props.num])})`);
    wTypes.push(`${i18n.t('batteryLevel')} (${BatLevel(config.narodmonSend.wsensors[props.num])})`);
    wTypes.push(`CO2 (${vl.WsensorDataRelevance(config.narodmonSend.wsensors[props.num]) 
        ? vl.validateLight(data.wsensor.co2.data[config.narodmonSend.wsensors[props.num]]) 
            ? ((data.wsensor.co2.data[config.narodmonSend.wsensors[props.num]] + config.wsensor.co2.corr[config.narodmonSend.wsensors[props.num]]).toFixed(2) + 'ppm') 
            : '--' 
        : i18n.t('dataExpired')})`
    );

    return <Card header={`${i18n.t('sensor.singular')} ${props.num + 1}`}
        content={<>
            {/* Data source */}
            <SelectSwitch label={i18n.t('dataSource.singular')}
                options={sensors.map(sensor => sensor.title)}
                value={config.narodmonSend.sensors[props.num]}
                onChange={val => {
                    dispatch(cf.narodmonSendSensorsChange({ num: props.num, val: val }));
                    dispatch(cf.narodmonSendTypesChange({ num: props.num, val: 0 }))
                }}
            />

            {/* Sensor type */}
            {sensorTypes(sensors[config.narodmonSend.sensors[props.num]]).length > 0 && <div className="mt-8">
                <SelectSwitch label={i18n.t('sensorType')}
                    options={sensorTypes(sensors[config.narodmonSend.sensors[props.num]])}
                    value={config.narodmonSend.types[props.num]}
                    onChange={val => dispatch(cf.narodmonSendTypesChange({ num: props.num, val: val }))}
                />
            </div>}

            {/* Wireless sensor number */}
            {config.narodmonSend.sensors[props.num] === 2 && <div className="mt-8">
                <SelectSwitch label={i18n.t('wirelessSensorNumber')}
                    options={wsensors}
                    value={config.narodmonSend.wsensors[props.num]}
                    onChange={val => dispatch(cf.narodmonSendWsensorsChange({ num: props.num, val: val }))}
                />

                {/* Wireless sensor type of sensor */}
                <div className="mt-8">
                    <SelectSwitch label={i18n.t('sensorType')}
                        options={wTypes}
                        value={config.narodmonSend.wtypes[props.num]}
                        onChange={val => dispatch(cf.narodmonSendWtypesChange({ num: props.num, val: val }))}
                    />
                </div>
            </div>}

            {/* Wireless sensor number */}
            {config.narodmonSend.sensors[props.num] > 0 && <div className="mt-8">
                <TextInput label={i18n.t('sensorMetric')}
                    value={config.narodmonSend.metrics[props.num]}
                    maxLength={16}
                    onChange={val => dispatch(cf.narodmonSendMetricsChange({ num: props.num, val: val.target.value }))}
                />
            </div>}
        </>} 
    />
}

export default CardNarodmonSendData;