import React, { useEffect, useState} from "react";
import ThreeColumns from "../templates/threeColumns";
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../i18n/main';
import Card from "../atoms/card";
import RangeInput from "../atoms/rangeInput";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import { validateTemp, validateHum, validatePres, validateLight, validateLowVoltage } from "../atoms/validateValues";
import device from '../device';
import { 
    BME280TempCorrChange,
    BME280HumCorrChange,
    BME280PresCorrChange,
    BMP180TempCorrChange,
    BMP180PresCorrChange,
    SHT21TempCorrChange,
    SHT21HumCorrChange,
    DHT22TempCorrChange,
    DHT22HumCorrChange,
    MAX44009LightCorrChange,
    BH1750LightCorrChange,
    DS18B20TempCorrChange,
    ESP32TempCorrChange,
    AnalogCorrChange
} from "../redux/slices/config";

const Sensors = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const correction = (type: string, val: number, lblType: string, lblData: number, onChange: any) => {
        let units: string = "";
        let label: string = "";
        switch(type) {
            case 't': { // Temperature
                units = "°C";
                label = (validateTemp(lblData) ? (Math.round((lblData + val) * 10) / 10).toFixed(1) : "--") + units;
            }; break;
            case 'h': { // Humidity
                units = "%";
                label = (validateHum(lblData) ? (Math.round((lblData + val) * 10) / 10).toFixed(1) : "--") + units;
            }; break;
            case 'p': { // Pressure
                const hpa = (Math.round((lblData + val) * 10) / 10).toFixed(1);
                const mm = (Math.round((lblData + val) * 7.5) / 10).toFixed(1);
                units = i18n.t('units.hpa');
                label = (validatePres(lblData) ? hpa : "--") + units + (validatePres(lblData) ? ` (~${mm}${i18n.t('units.mm')})` : '');
            }; break;
            case 'l': { // Ambient light
                units = i18n.t('units.lux');
                label = (validateLight(lblData) ? (Math.round((lblData + val) * 10) / 10).toFixed(1) : "--") + units;
            }; break;

            case 'v': { // Voltage
                units = i18n.t('units.v');
                label = (validateLowVoltage(lblData) ? (Math.round((lblData + val) * 10) / 10).toFixed(1) : "--") + units;
            }; break;
        }

        return <RangeInput value={val}
            label={<>
                {lblType}:
                <span className="ms-1 text-blue-700 dark:text-blue-400">
                    {label}
                </span>
            </>} 
            min={-10}
            max={10}
            limitMin={-10}
            limitMax={10}
            step={0.1}
            indication={(val > 0 ? ("+" + val.toFixed(1)) : val.toFixed(1)) + units}
            onChange={onChange}
        />
    }

    const content1 = <>
        <Card header="BME280"
            content={<>
                {correction("t", config.sensors.bme280.t, i18n.t('temperature'), data.bme280.temp, (val: number) => dispatch(BME280TempCorrChange(val)))}
                {correction("h", config.sensors.bme280.h, i18n.t('humidity'), data.bme280.hum, (val: number) => dispatch(BME280HumCorrChange(val)))}
                {correction("p", config.sensors.bme280.p, i18n.t('pressure'), data.bme280.pres, (val: number) => dispatch(BME280PresCorrChange(val)))}
            </>}
        />

        <Card header="BMP180"
            content={<>
                {correction("t", config.sensors.bmp180.t, i18n.t('temperature'), data.bmp180.temp, (val: number) => dispatch(BMP180TempCorrChange(val)))}
                {correction("p", config.sensors.bmp180.p, i18n.t('pressure'), data.bmp180.pres, (val: number) => dispatch(BMP180PresCorrChange(val)))}
            </>}
        />

        <Card header="SHT21"
            content={<>
                {correction("t", config.sensors.sht21.t, i18n.t('temperature'), data.sht21.temp, (val: number) => dispatch(SHT21TempCorrChange(val)))}
                {correction("h", config.sensors.sht21.h, i18n.t('humidity'), data.sht21.hum, (val: number) => dispatch(SHT21HumCorrChange(val)))}
            </>}
        />
    </>;

    const content2 = <>
        <Card header="DHT22"
            content={<>
                {correction("t", config.sensors.dht22.t, i18n.t('temperature'), data.dht22.temp, (val: number) => dispatch(DHT22TempCorrChange(val)))}
                {correction("h", config.sensors.dht22.h, i18n.t('humidity'), data.dht22.hum, (val: number) => dispatch(DHT22HumCorrChange(val)))}
            </>}
        />

        <Card header="MAX44009"
            content={<>
                {correction("l", config.sensors.max44009.l, i18n.t('ambientLight'), data.max44009.light, (val: number) => dispatch(MAX44009LightCorrChange(val)))}
            </>}
        />

        <Card header="BH1750"
            content={<>
                {correction("l", config.sensors.bh1750.l, i18n.t('ambientLight'), data.bh1750.light, (val: number) => dispatch(BH1750LightCorrChange(val)))}
            </>}
        />
    </>;

    const content3 = <>
        <Card header="DS18B20"
            content={<>
                {correction("t", config.sensors.ds18b20.t, i18n.t('temperature'), data.ds18b20.temp, (val: number) => dispatch(DS18B20TempCorrChange(val)))}
            </>}
        />

        <Card header={i18n.t('analogInput')}
            content={<>
                {correction("v", config.sensors.analog.v, i18n.t('voltage'), data.analog.volt, (val: number) => dispatch(AnalogCorrChange(val)))}
            </>}
        />

        {device() === 'WeatherMonitorBIM32' && <Card header="ESP32"
            content={<>
                {correction("t", config.sensors.esp32.t, i18n.t('temperature'), data.esp32.temp, (val: number) => dispatch(ESP32TempCorrChange(val)))}
            </>}
        />}
    </>;

    return <ThreeColumns navbar={true}
        header={[i18n.t('sensor.plural')]} 
        content={[content1, content2, content3]} 
        buttons={['save', 'reset']} 
    />
}

export default Sensors;