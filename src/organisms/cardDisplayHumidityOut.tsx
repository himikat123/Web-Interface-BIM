import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as cf from "../redux/slices/config";
import * as vl from "../atoms/validateValues";

const CardDisplayHumidityOut = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const sensors = [
        "--",
        `${i18n.t('forecast')} (${vl.validateHumidity(data.weather.hum) ? (data.weather.hum.toFixed(2) + '%') : '--'})`,
        i18n.t('wirelessSensor.singular'),
        'Thingspeak',
        `BME280 (${vl.validateHumidity(data.bme280.hum) ? ((data.bme280.hum + config.sensors.bme280.h).toFixed(2) + '%') : '--'})`,
        `SHT21 (${vl.validateHumidity(data.sht21.hum) ? ((data.sht21.hum + config.sensors.dht22.h).toFixed(2) + '%') : '--'})`,
        `DHT22 (${vl.validateHumidity(data.dht22.hum) ? ((data.dht22.hum + config.sensors.dht22.h).toFixed(2) + '%') : '--'})`,
        `BME680 (${vl.validateHumidity(data.bme680.hum) ? ((data.bme680.hum + config.sensors.bme680.h).toFixed(2) + '%') : '--'})`
    ];

    let wsensors: string[] = [];
    for(let i=0; i<2; i++) wsensors.push(`${i18n.t('wirelessSensor.singular')} ${i} (${vl.WsensorDataRelevance(i) 
        ? vl.validateHumidity(data.wsensor.hum.data[i]) 
            ? ((data.wsensor.hum.data[i] + config.wsensor.hum.corr[i]).toFixed(2) + '%') 
            : '--' 
        : i18n.t('dataExpired')})`);

    let things: string[] = [];
    for(let i=0; i<8; i++) things.push(`${i18n.t('field')} ${i + 1} (${vl.ThingspeakDataRelevance() 
        ? vl.validateThingspeak(data.thing.data[i]) ? data.thing.data[i] : '--'
        : i18n.t('dataExpired')})`
    );

    return <>
        <Card header={i18n.t('humidityOut')}
            content={<>
                {/* Sensor type */}
                <SelectSwitch label={i18n.t('dataSource.singular')}
                    options={sensors}
                    value={config.display.source.humOut.sens}
                    onChange={val => dispatch(cf.displaySourceHumOutSensChange(val))}
                />

                {/* Wireless sensor number */}
                {config.display.source.humOut.sens === 2 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('wirelessSensorNumber')}
                        options={wsensors}
                        value={config.display.source.humOut.wsensNum}
                        onChange={val => dispatch(cf.displaySourceHumOutWsensNumChange(val))}
                    />
                </div>}

                {/* Thingspeak */}
                {config.display.source.humOut.sens === 3 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('field')}
                        options={things}
                        value={config.display.source.humOut.thing}
                        onChange={val => dispatch(cf.displaySourceHumOutThingChange(val))}
                    />
                </div>}
            </>} 
        />
    </>
}

export default CardDisplayHumidityOut;