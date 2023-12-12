import React, { useState } from "react";
import ThreeColumns from "../templates/threeColumns";
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../i18n/main';
import Card from "../atoms/card";
import Button from "../atoms/button";
import sensorCorrection from "../atoms/sensorCorrection";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import device from '../device';
import * as cf from "../redux/slices/config";
import * as vl from "../atoms/validateValues";

const Sensors = () => {
    const [hideUnnecessary, setHideUnnecessary] = useState<boolean>(true);

    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const content = <>
        <Card header="BME280"
            content={<>
                {sensorCorrection("t", 
                    config.sensors.bme280.t, 
                    i18n.t('temperature'), 
                    data.bme280.temp, 
                    (val: number) => dispatch(cf.BME280TempCorrChange(val)), 
                    -10, 10, 0.1
                )}
                {sensorCorrection("h", 
                    config.sensors.bme280.h, 
                    i18n.t('humidity'), 
                    data.bme280.hum, 
                    (val: number) => dispatch(cf.BME280HumCorrChange(val)), 
                    -10, 10, 0.1
                )}
                {sensorCorrection("p", 
                    config.sensors.bme280.p, 
                    i18n.t('pressure'), 
                    data.bme280.pres, 
                    (val: number) => dispatch(cf.BME280PresCorrChange(val)), 
                    -10, 10, 0.1
                )}
            </>}
            className={hideUnnecessary && 
                !vl.validateTemperature(data.bme280.temp) && !vl.validateHumidity(data.bme280.hum) && !vl.validatePressure(data.bme280.pres)
                ? 'hide'
                : ''
            }
        />

        <Card header="BMP180"
            content={<>
                {sensorCorrection("t", 
                    config.sensors.bmp180.t, 
                    i18n.t('temperature'), 
                    data.bmp180.temp, 
                    (val: number) => dispatch(cf.BMP180TempCorrChange(val)), 
                    -10, 10, 0.1
                )}
                {sensorCorrection("p", 
                    config.sensors.bmp180.p, 
                    i18n.t('pressure'), 
                    data.bmp180.pres, 
                    (val: number) => dispatch(cf.BMP180PresCorrChange(val)), 
                    -10, 10, 0.1
                )}
            </>}
            className={hideUnnecessary && 
                !vl.validateTemperature(data.bmp180.temp) && !vl.validatePressure(data.bmp180.pres)
                ? 'hide'
                : ''
            }
        />

        <Card header="SHT21"
            content={<>
                {sensorCorrection("t", 
                    config.sensors.sht21.t, 
                    i18n.t('temperature'), 
                    data.sht21.temp, 
                    (val: number) => dispatch(cf.SHT21TempCorrChange(val)), 
                    -10, 10, 0.1
                )}
                {sensorCorrection("h", 
                    config.sensors.sht21.h, 
                    i18n.t('humidity'), 
                    data.sht21.hum, 
                    (val: number) => dispatch(cf.SHT21HumCorrChange(val)), 
                    -10, 10, 0.1
                )}
            </>}
            className={hideUnnecessary && 
                !vl.validateTemperature(data.sht21.temp) && !vl.validateHumidity(data.sht21.hum)
                ? 'hide'
                : ''
            }
        />

        <Card header="DHT22"
            content={<>
                {sensorCorrection("t", 
                    config.sensors.dht22.t, 
                    i18n.t('temperature'), 
                    data.dht22.temp, 
                    (val: number) => dispatch(cf.DHT22TempCorrChange(val)), 
                    -10, 10, 0.1
                )}
                {sensorCorrection("h", 
                    config.sensors.dht22.h, 
                    i18n.t('humidity'), 
                    data.dht22.hum, 
                    (val: number) => dispatch(cf.DHT22HumCorrChange(val)), 
                    -10, 10, 0.1
                )}
            </>}
            className={hideUnnecessary && 
                !vl.validateTemperature(data.dht22.temp) && !vl.validateHumidity(data.dht22.hum)
                ? 'hide'
                : ''
            }
        />

        <Card header="MAX44009"
            content={<>
                {sensorCorrection("l", 
                    config.sensors.max44009.l, 
                    i18n.t('ambientLight'), 
                    data.max44009.light, 
                    (val: number) => dispatch(cf.MAX44009LightCorrChange(val)), 
                    -10, 10, 0.1
                )}
            </>}
            className={hideUnnecessary && 
                !vl.validateLight(data.max44009.light)
                ? 'hide' 
                : ''
            }
        />

        <Card header="BH1750"
            content={<>
                {sensorCorrection("l", 
                    config.sensors.bh1750.l, 
                    i18n.t('ambientLight'), 
                    data.bh1750.light, 
                    (val: number) => dispatch(cf.BH1750LightCorrChange(val)), 
                    -10, 10, 0.1
                )}
            </>}
            className={hideUnnecessary && 
                !vl.validateLight(data.bh1750.light)
                ? 'hide'
                : ''
            }
        />

        <Card header="DS18B20"
            content={<>
                {sensorCorrection("t", 
                    config.sensors.ds18b20.t, 
                    i18n.t('temperature'), 
                    data.ds18b20.temp, 
                    (val: number) => dispatch(cf.DS18B20TempCorrChange(val)), 
                    -10, 10, 0.1
                )}
            </>}
            className={hideUnnecessary && 
                !vl.validateTemperature(data.ds18b20.temp)
                ? 'hide'
                : ''
            }
        />

        <Card header={i18n.t('analogInput')}
            content={<>
                {sensorCorrection("v", 
                    config.sensors.analog.v, 
                    i18n.t('voltage'), 
                    data.analog.volt, 
                    (val: number) => dispatch(cf.AnalogCorrChange(val)), 
                    -10, 10, 0.1
                )}
            </>}
            className={hideUnnecessary && 
                !vl.validateAnalogVoltage(data.analog.volt)
                ? 'hide'
                : ''
            }
        />

        {device() === 'WeatherMonitorBIM32' && <Card header="ESP32"
            content={<>
                {sensorCorrection("t", 
                    config.sensors.esp32.t, 
                    i18n.t('temperature'), 
                    data.esp32.temp, 
                    (val: number) => dispatch(cf.ESP32TempCorrChange(val)), 
                    -10, 10, 0.1
                )}
            </>}
            className={hideUnnecessary && 
                !vl.validateTemperature(data.esp32.temp)
                ? 'hide'
                : ''
            }
        />}
    </>;

    return <ThreeColumns navbar={true}
        header={[i18n.t('sensor.plural')]} 
        content={[content]} 
        buttons={['save', 'reset']} 
        footer={<div className="text-center">
            <Button className="bg-green-600 hover:bg-green-700 text-text_dark"
                label={i18n.t(hideUnnecessary ? 'showAll' : 'hideUnused')}
                onClick={() => {setHideUnnecessary(!hideUnnecessary)}}
            />
        </div>}
    />
}

export default Sensors;