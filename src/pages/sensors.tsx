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

    let content = [];
    content.push(<Card header="BME680" key="BME680"
        content={<>
            {sensorCorrection(false, "t", 
                config.sensors.bme680.t, 
                i18n.t('temperature'), 
                data.bme680.temp, 
                (val: number) => dispatch(cf.BME680TempCorrChange(val)), 
                -10, 10, 0.1
            )}
            {sensorCorrection(false, "h", 
                config.sensors.bme680.h, 
                i18n.t('humidity'), 
                data.bme680.hum, 
                (val: number) => dispatch(cf.BME680HumCorrChange(val)), 
                -10, 10, 0.1
            )}
            {sensorCorrection(false, "p", 
                config.sensors.bme680.p, 
                i18n.t('pressure'), 
                data.bme680.pres, 
                (val: number) => dispatch(cf.BME680PresCorrChange(val)), 
                -10, 10, 0.1
            )}
            {sensorCorrection(false, "i", 
                config.sensors.bme680.i,
                i18n.t('indexForAirQuality'), 
                data.bme680.iaq, 
                (val: number) => dispatch(cf.BME680IaqCorrChange(val)), 
                -10, 10, 0.1
            )}
            <div className="mt-2 text-center">
                {i18n.t('sensorAccuracy')}:
                <span className="ms-1 text-blue-700 dark:text-blue-400">
                    {vl.validateIaqArrc(data.bme680.iaqAccr) ? data.bme680.iaqAccr : '--'}
                </span>
            </div>
        </>}
        className={!vl.validateTemperature(data.bme680.temp) && !vl.validateHumidity(data.bme680.hum) && !vl.validatePressure(data.bme680.pres) && !vl.validateIaq(data.bme680.iaq)
            ? 'invalid' + (hideUnnecessary ? ' hide' : '')
            : ''
        }
    />);

    content.push(<Card header="BME280" key="BME280"
        content={<>
            {sensorCorrection(false, "t", 
                config.sensors.bme280.t, 
                i18n.t('temperature'), 
                data.bme280.temp, 
                (val: number) => dispatch(cf.BME280TempCorrChange(val)), 
                -10, 10, 0.1
            )}
            {sensorCorrection(false, "h", 
                config.sensors.bme280.h, 
                i18n.t('humidity'), 
                data.bme280.hum, 
                (val: number) => dispatch(cf.BME280HumCorrChange(val)), 
                -10, 10, 0.1
            )}
            {sensorCorrection(false, "p", 
                config.sensors.bme280.p, 
                i18n.t('pressure'), 
                data.bme280.pres, 
                (val: number) => dispatch(cf.BME280PresCorrChange(val)), 
                -10, 10, 0.1
            )}
        </>}
        className={!vl.validateTemperature(data.bme280.temp) && !vl.validateHumidity(data.bme280.hum) && !vl.validatePressure(data.bme280.pres)
            ? 'invalid' + (hideUnnecessary ? ' hide' : '')
            : ''
        }
    />);

    content.push(<Card header="BMP180" key="BMP180"
        content={<>
            {sensorCorrection(false, "t", 
                config.sensors.bmp180.t, 
                i18n.t('temperature'), 
                data.bmp180.temp, 
                (val: number) => dispatch(cf.BMP180TempCorrChange(val)), 
                -10, 10, 0.1
            )}
            {sensorCorrection(false, "p", 
                config.sensors.bmp180.p, 
                i18n.t('pressure'), 
                data.bmp180.pres, 
                (val: number) => dispatch(cf.BMP180PresCorrChange(val)), 
                -10, 10, 0.1
            )}
        </>}
        className={!vl.validateTemperature(data.bmp180.temp) && !vl.validatePressure(data.bmp180.pres)
            ? 'invalid' + (hideUnnecessary ? ' hide' : '')
            : ''
        }
    />);

    content.push(<Card header="SHT21" key="SHT21"
        content={<>
            {sensorCorrection(false, "t", 
                config.sensors.sht21.t, 
                i18n.t('temperature'), 
                data.sht21.temp, 
                (val: number) => dispatch(cf.SHT21TempCorrChange(val)), 
                -10, 10, 0.1
            )}
            {sensorCorrection(false, "h", 
                config.sensors.sht21.h, 
                i18n.t('humidity'), 
                data.sht21.hum, 
                (val: number) => dispatch(cf.SHT21HumCorrChange(val)), 
                -10, 10, 0.1
            )}
        </>}
        className={!vl.validateTemperature(data.sht21.temp) && !vl.validateHumidity(data.sht21.hum)
            ? 'invalid' + (hideUnnecessary ? ' hide' : '')
            : ''
        }
    />);

    content.push(<Card header="DHT22" key="DHT22"
        content={<>
            {sensorCorrection(false, "t", 
                config.sensors.dht22.t, 
                i18n.t('temperature'), 
                data.dht22.temp, 
                (val: number) => dispatch(cf.DHT22TempCorrChange(val)), 
                -10, 10, 0.1
            )}
            {sensorCorrection(false, "h", 
                config.sensors.dht22.h, 
                i18n.t('humidity'), 
                data.dht22.hum, 
                (val: number) => dispatch(cf.DHT22HumCorrChange(val)), 
                -10, 10, 0.1
            )}
        </>}
        className={!vl.validateTemperature(data.dht22.temp) && !vl.validateHumidity(data.dht22.hum)
            ? 'invalid' + (hideUnnecessary ? ' hide' : '')
            : ''
        }
    />);

    content.push(<Card header="MAX44009" key="MAX44009"
        content={<>
            {sensorCorrection(false, "l", 
                config.sensors.max44009.l, 
                i18n.t('ambientLight'), 
                data.max44009.light, 
                (val: number) => dispatch(cf.MAX44009LightCorrChange(val)), 
                -10, 10, 0.1
            )}
        </>}
        className={!vl.validateLight(data.max44009.light)
            ? 'invalid' + (hideUnnecessary ? ' hide' : '') 
            : ''
        }
    />);

    content.push(<Card header="BH1750" key="BH1750"
        content={<>
            {sensorCorrection(false, "l", 
                config.sensors.bh1750.l, 
                i18n.t('ambientLight'), 
                data.bh1750.light, 
                (val: number) => dispatch(cf.BH1750LightCorrChange(val)), 
                -10, 10, 0.1
            )}
        </>}
        className={!vl.validateLight(data.bh1750.light)
            ? 'invalid' + (hideUnnecessary ? ' hide' : '')
            : ''
        }
    />);

    content.push(<Card header="DS18B20" key="DS18B20"
        content={<>
            {sensorCorrection(false, "t", 
                config.sensors.ds18b20.t, 
                i18n.t('temperature'), 
                data.ds18b20.temp, 
                (val: number) => dispatch(cf.DS18B20TempCorrChange(val)), 
                -10, 10, 0.1
            )}
        </>}
        className={!vl.validateTemperature(data.ds18b20.temp)
            ? 'invalid' + (hideUnnecessary ? ' hide' : '')
            : ''
        }
    />);

    content.push(<Card header={i18n.t('analogInput')} key="analog"
        content={<>
            {sensorCorrection(false, "v", 
                config.sensors.analog.v, 
                i18n.t('voltage'), 
                data.analog.volt, 
                (val: number) => dispatch(cf.AnalogCorrChange(val)), 
                -10, 10, 0.1
            )}
        </>}
        className={!vl.validateAnalogVoltage(data.analog.volt)
            ? 'invalid' + (hideUnnecessary ? ' hide' : '')
            : ''
        }
    />);

    if(device() === 'WeatherMonitorBIM32') content.push(<Card header="ESP32" key="ESP32"
        content={<>
            {sensorCorrection(false, "t", 
                config.sensors.esp32.t, 
                i18n.t('temperature'), 
                data.esp32.temp, 
                (val: number) => dispatch(cf.ESP32TempCorrChange(val)), 
                -10, 10, 0.1
            )}
        </>}
        className={!vl.validateTemperature(data.esp32.temp)
            ? 'invalid' + (hideUnnecessary ? ' hide' : '')
            : ''
        }
    />);

    content = content.sort((a: any) => {
        return a.props.className.includes('invalid') ? 1 : -1;
    });

    return <ThreeColumns navbar={true}
        header={[i18n.t('sensor.plural')]} 
        content={[content]} 
        buttons={['save', 'reset']} 
        footer={<div className="text-center">
            <Button className="bg-green-600 hover:bg-green-700 text-text_dark"
                label={i18n.t(hideUnnecessary ? 'showAll' : 'hideUnused')}
                onClick={() => setHideUnnecessary(!hideUnnecessary)}
            />
        </div>}
    />
}

export default Sensors;