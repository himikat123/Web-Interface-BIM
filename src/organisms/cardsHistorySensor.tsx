import React, { useEffect, useState } from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as cf from "../redux/slices/config";
import * as vl from "../atoms/validateValues";

const CardsHistorySensor = () => {
    const [chartWidth, setChartWidth] = useState<number>(100);

    const changeChartWidth = () => {
        const width = document.querySelector('.thchart')?.getBoundingClientRect().width ?? 100;
        setChartWidth(Math.round(width));
    }

    
    useEffect(() => {
        changeChartWidth();

        window.addEventListener('resize', changeChartWidth);

        return () => {
            window.removeEventListener('resize', changeChartWidth);
        }
    }, []);

    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const labels = [
        i18n.t('temperatureOut'), 
        i18n.t('humidityOut'), 
        i18n.t('pressure'), 
        i18n.t('temperatureIn'), 
        i18n.t('humidityIn'), 
        i18n.t('airQuality'), 
        i18n.t('CO2Level')
    ];

    const tempSensors = [
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

    const humSensors = [
        "--",
        `${i18n.t('forecast')} (${vl.validateHumidity(data.weather.hum) ? (data.weather.hum.toFixed(2) + '%') : '--'})`,
        i18n.t('wirelessSensor.singular'),
        'Thingspeak',
        `BME280 (${vl.validateHumidity(data.bme280.hum) ? ((data.bme280.hum + config.sensors.bme280.h).toFixed(2) + '%') : '--'})`,
        `SHT21 (${vl.validateHumidity(data.sht21.hum) ? ((data.sht21.hum + config.sensors.dht22.h).toFixed(2) + '%') : '--'})`,
        `DHT22 (${vl.validateHumidity(data.dht22.hum) ? ((data.dht22.hum + config.sensors.dht22.h).toFixed(2) + '%') : '--'})`,
        `BME680 (${vl.validateHumidity(data.bme680.hum) ? ((data.bme680.hum + config.sensors.bme680.h).toFixed(2) + '%') : '--'})`
    ];

    const presSensors = [
        "--",
        `${i18n.t('forecast')} (${vl.validatePressure(data.weather.pres) ? (data.weather.pres.toFixed(2) + i18n.t('units.hpa') + ' / ' + (data.weather.pres * 0.75).toFixed(2) + i18n.t('units.mm')) : '--'})`,
        i18n.t('wirelessSensor.singular'),
        'Thingspeak',
        `BME280 (${vl.validatePressure(data.bme280.pres) ? ((data.bme280.pres + config.sensors.bme280.p).toFixed(2) + i18n.t('units.hpa') + ' / ' + ((data.bme280.pres + config.sensors.bme280.p) * 0.75).toFixed(2) + i18n.t('units.mm')) : '--'})`,
        `BMP180 (${vl.validatePressure(data.bmp180.pres) ? ((data.bmp180.pres + config.sensors.bmp180.p).toFixed(2) + i18n.t('units.hpa') + ' / ' + ((data.bmp180.pres + config.sensors.bmp180.p) * 0.75).toFixed(2) + i18n.t('units.mm')) : '--'})`,
        `BME680 (${vl.validatePressure(data.bme680.pres) ? ((data.bme680.pres + config.sensors.bme680.p).toFixed(2) + i18n.t('units.hpa') + ' / ' + ((data.bme680.pres + config.sensors.bme680.p) * 0.75).toFixed(2) + i18n.t('units.mm')) : '--'})`
    ];

    const iaqSensors = [
        "--",
        `BME680 (IAQ ${vl.validateIaq(data.bme680.iaq) ? (data.bme680.iaq.toFixed(2)) : '--'})`
    ];

    const co2Sensors = [
        "--",
        i18n.t('wirelessSensor.singular')
    ];

    const sensors = [
        tempSensors,
        humSensors,
        presSensors,
        tempSensors,
        humSensors,
        iaqSensors,
        co2Sensors
    ];

    let wSensorNums: string[] = [];
    for(let i=0; i<2; i++) wSensorNums.push(`${i18n.t('wirelessSensor.singular')} ${i}`);

    let wSensorTemps: string[][] = [];
    for(let n=0; n<5; n++) {
        wSensorTemps.push([]);
        for(let i=0; i<5; i++) wSensorTemps[n].push(`${i18n.t('temperature')} ${i} (${vl.WsensorDataRelevance(n) 
            ? vl.validateTemperature(data.wsensor.temp.data[i][n]) 
                ? ((data.wsensor.temp.data[i][n] + config.wsensor.temp.corr[n][i]).toFixed(2) + '°C') 
                : '--' 
            : i18n.t('dataExpired')})`
        );
    }

    let wSensorHums: string[] = [];
    for(let i=0; i<2; i++) wSensorHums.push(`${i18n.t('wirelessSensor.singular')} ${i} (${vl.WsensorDataRelevance(i) 
        ? vl.validateHumidity(data.wsensor.hum.data[i]) 
            ? ((data.wsensor.hum.data[i] + config.wsensor.hum.corr[i]).toFixed(2) + '%') 
            : '--' 
        : i18n.t('dataExpired')})`
    );

    let wSensorPress: string[] = [];
    for(let i=0; i<2; i++) wSensorPress.push(`${i18n.t('wirelessSensor.singular')} ${i} (${vl.WsensorDataRelevance(i) 
        ? vl.validatePressure(data.wsensor.pres.data[i]) 
            ? ((data.wsensor.pres.data[i] + config.wsensor.pres.corr[i]).toFixed(2) + i18n.t('units.hpa') + ' / ' + ((data.wsensor.pres.data[i] + config.wsensor.pres.corr[i]) * 0.75).toFixed(2) + i18n.t('units.mm')) 
            : '--' 
        : i18n.t('dataExpired')})`
    );

    let wSensCo2s: string[] = [];
    for(let i=0; i<2; i++) wSensCo2s.push(`${i18n.t('wirelessSensor.singular')} ${i} (${vl.WsensorDataRelevance(i) 
        ? vl.validateCO2(data.wsensor.co2.data[i]) 
            ? ((data.wsensor.co2.data[i] + config.wsensor.co2.corr[i]).toFixed(2) + 'ppm') 
            : '--' 
        : i18n.t('dataExpired')})`
    );

    const wSensors = [
        wSensorNums,
        wSensorHums,
        wSensorPress,
        wSensorNums,
        wSensorHums,
        [],
        wSensCo2s
    ];

    let things: string[] = [];
    for(let i=0; i<8; i++) things.push(`${i18n.t('field')} ${i + 1} (${vl.ThingspeakDataRelevance() 
        ? vl.validateThingspeak(data.thing.data[i]) ? data.thing.data[i] : '--'
        : i18n.t('dataExpired')})`
    );

    const bgColor = window.document.documentElement.classList[0] === 'dark' ? '000000' : 'FFFFFF';
    const chartColors = ['FFCC00', '00FFFF', 'FF00FF', 'FFCC00', '00FFFF', 'FF7700', '0000FF'];

    return <>{[...Array(7)].map((x, i) =>
        <Card key={'t' + i} content={<div className="thchart">
            {/* History Chart */}
            <div className="w-100 text-center">
                <iframe title={`chart${i}`} 
                    width={chartWidth - 1} 
                    height="261" 
                    style={{border: '1px solid #cccccc'}} 
                    src={`https://thingspeak.com/channels/${config.history.channelID}/charts/${i+1}?bgcolor=%23${bgColor}&color=%23${chartColors[i]}&dynamic=true&results=72&round=2&title=${labels[i]}&type=line&api_key=${config.history.rdkey}&width=${chartWidth}`}>
                </iframe>
            </div>
    
            {/* Sensor type */}
            <div className="mt-8">
                <SelectSwitch label={<div dangerouslySetInnerHTML={{ __html: labels[i] }} />}
                    options={sensors[i]}
                    value={config.history.fields[i]}
                    onChange={val => dispatch(cf.historyFieldsChange({ num: i, val: val }))}
                />
            </div>

            {/* Wireless Sensor Number */}
            {(config.history.fields[i] === 2 || (i === 6 && config.history.fields[i] === 1)) && <div className="mt-8">
                <SelectSwitch label={i18n.t('wirelessSensorNumber')}
                    options={wSensors[i]}
                    value={config.history.wSensors[i]}
                    onChange={val => dispatch(cf.historyWsensorsChange({ num: i, val: val }))}
                />
            </div>}

            {/* Wireless Sensor Temperature */}
            {(config.history.fields[i] === 2 && (i === 0 || i === 3)) && <div className="mt-8">
                <SelectSwitch label={i18n.t('temperatureSensorNumber')}
                    options={wSensorTemps[config.history.wSensors[i]]}
                    value={config.history.wTypes[i]}
                    onChange={val => dispatch(cf.historyWtypesChange({ num: i, val: val }))}
                />
            </div>}

            {/* Thingspeak */}
            {config.history.fields[i] === 3 && <div className="mt-8">
                <SelectSwitch label="Thingspeak"
                    options={things}
                    value={config.history.tFields[i]}
                    onChange={val => dispatch(cf.historyTfieldsChange({ num: i, val: val }))}
                />
            </div>}
        </div>} />
    )}</>
}

export default CardsHistorySensor;