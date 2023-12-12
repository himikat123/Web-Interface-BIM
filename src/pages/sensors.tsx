import React from "react";
import ThreeColumns from "../templates/threeColumns";
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../i18n/main';
import Card from "../atoms/card";
import sensorCorrection from "../atoms/sensorCorrection";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import device from '../device';
import * as cf from "../redux/slices/config";

const Sensors = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const content1 = <>
        <Card header="BME280"
            content={<>
                {sensorCorrection("t", config.sensors.bme280.t, i18n.t('temperature'), data.bme280.temp, (val: number) => dispatch(cf.BME280TempCorrChange(val)), -10, 10, 0.1)}
                {sensorCorrection("h", config.sensors.bme280.h, i18n.t('humidity'), data.bme280.hum, (val: number) => dispatch(cf.BME280HumCorrChange(val)), -10, 10, 0.1)}
                {sensorCorrection("p", config.sensors.bme280.p, i18n.t('pressure'), data.bme280.pres, (val: number) => dispatch(cf.BME280PresCorrChange(val)), -10, 10, 0.1)}
            </>}
        />

        <Card header="BMP180"
            content={<>
                {sensorCorrection("t", config.sensors.bmp180.t, i18n.t('temperature'), data.bmp180.temp, (val: number) => dispatch(cf.BMP180TempCorrChange(val)), -10, 10, 0.1)}
                {sensorCorrection("p", config.sensors.bmp180.p, i18n.t('pressure'), data.bmp180.pres, (val: number) => dispatch(cf.BMP180PresCorrChange(val)), -10, 10, 0.1)}
            </>}
        />

        <Card header="SHT21"
            content={<>
                {sensorCorrection("t", config.sensors.sht21.t, i18n.t('temperature'), data.sht21.temp, (val: number) => dispatch(cf.SHT21TempCorrChange(val)), -10, 10, 0.1)}
                {sensorCorrection("h", config.sensors.sht21.h, i18n.t('humidity'), data.sht21.hum, (val: number) => dispatch(cf.SHT21HumCorrChange(val)), -10, 10, 0.1)}
            </>}
        />
    </>;

    const content2 = <>
        <Card header="DHT22"
            content={<>
                {sensorCorrection("t", config.sensors.dht22.t, i18n.t('temperature'), data.dht22.temp, (val: number) => dispatch(cf.DHT22TempCorrChange(val)), -10, 10, 0.1)}
                {sensorCorrection("h", config.sensors.dht22.h, i18n.t('humidity'), data.dht22.hum, (val: number) => dispatch(cf.DHT22HumCorrChange(val)), -10, 10, 0.1)}
            </>}
        />

        <Card header="MAX44009"
            content={<>
                {sensorCorrection("l", config.sensors.max44009.l, i18n.t('ambientLight'), data.max44009.light, (val: number) => dispatch(cf.MAX44009LightCorrChange(val)), -10, 10, 0.1)}
            </>}
        />

        <Card header="BH1750"
            content={<>
                {sensorCorrection("l", config.sensors.bh1750.l, i18n.t('ambientLight'), data.bh1750.light, (val: number) => dispatch(cf.BH1750LightCorrChange(val)), -10, 10, 0.1)}
            </>}
        />
    </>;

    const content3 = <>
        <Card header="DS18B20"
            content={<>
                {sensorCorrection("t", config.sensors.ds18b20.t, i18n.t('temperature'), data.ds18b20.temp, (val: number) => dispatch(cf.DS18B20TempCorrChange(val)), -10, 10, 0.1)}
            </>}
        />

        <Card header={i18n.t('analogInput')}
            content={<>
                {sensorCorrection("v", config.sensors.analog.v, i18n.t('voltage'), data.analog.volt, (val: number) => dispatch(cf.AnalogCorrChange(val)), -10, 10, 0.1)}
            </>}
        />

        {device() === 'WeatherMonitorBIM32' && <Card header="ESP32"
            content={<>
                {sensorCorrection("t", config.sensors.esp32.t, i18n.t('temperature'), data.esp32.temp, (val: number) => dispatch(cf.ESP32TempCorrChange(val)), -10, 10, 0.1)}
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