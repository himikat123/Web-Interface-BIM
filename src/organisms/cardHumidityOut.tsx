import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import SensorData from "../atoms/sensorData";

const CardHumidityOut = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const sensors = [
        "--",
        i18n.t('forecast') + ' (' + SensorData().ForecastHum + ')',
        i18n.t('wirelessSensor.singular'),
        'Thingspeak',
        'BME280 (' + SensorData().BME280hum + ')',
        'SHT21 (' + SensorData().SHT21hum + ')',
        'DHT22 (' + SensorData().DHT22hum + ')',
        'BME680 (' + SensorData().BME680hum + ')'
    ];

    let wsensors: string[] = [];
    for(let i=0; i<2; i++) wsensors.push(`${i18n.t('wirelessSensor.singular')} ${i} (${SensorData().Wsensor[i].hum})`);

    let things: string[] = [];
    for(let i=0; i<8; i++) things.push(`${i18n.t('field')} ${i + 1} (${SensorData().Thingspeak[i]})`);

    return <>
        <Card header={i18n.t('humidityOut')}
            content={<>
                {/* Sensor type */}
                <SelectSwitch label={i18n.t('dataSource.singular')}
                    options={sensors}
                    value={config.display.source.humOut.sens}
                    onChange={val => dispatch(cf.DisplaySourceHumOutSensChange(val))}
                />

                {/* Wireless sensor number */}
                {config.display.source.humOut.sens === 2 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('wirelessSensorNumber')}
                        options={wsensors}
                        value={config.display.source.humOut.wsensNum}
                        onChange={val => dispatch(cf.DisplaySourceHumOutWsensNumChange(val))}
                    />
                </div>}

                {/* Thingspeak */}
                {config.display.source.humOut.sens === 3 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('field')}
                        options={things}
                        value={config.display.source.humOut.thing}
                        onChange={val => dispatch(cf.DisplaySourceHumOutThingChange(val))}
                    />
                </div>}
            </>} 
        />
    </>
}

export default CardHumidityOut;