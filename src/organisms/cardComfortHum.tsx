import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import RangeInput from "../atoms/rangeInput";
import Toggle from "../atoms/toggle";
import Indication from "../atoms/indication";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as cf from "../redux/slices/config";
import * as vl from "../atoms/validateValues";
import "./cardComfort.scss";

const CardComfortHum = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const sensors = [
        "--",
        `${i18n.t('forecast')} (${vl.validateHumidity(data.weather.hum) ? (data.weather.hum.toFixed(2) + '%') : '--'})`,
        i18n.t('wirelessSensor.singular'),
        'Thingspeak',
        `BME280 (${vl.validateHumidity(data.bme280.hum) ? ((data.bme280.hum + config.sensors.bme280.h).toFixed(2) + '%') : '--'})`,
        `SHT21 (${vl.validateHumidity(data.sht21.hum) ? ((data.sht21.hum + config.sensors.sht21.h).toFixed(2) + '%') : '--'})`,
        `DHT22 (${vl.validateHumidity(data.dht22.hum) ? ((data.dht22.hum + config.sensors.dht22.h).toFixed(2) + '%') : '--'})`,
        `BME680 (${vl.validateHumidity(data.bme680.hum) ? ((data.bme680.hum + config.sensors.bme680.h).toFixed(2) + '%') : '--'})`
    ];

    let wsensors: string[] = [];
    for(let i=0; i<2; i++) {
        wsensors.push(`${i18n.t('wirelessSensor.singular')} ${i} (${vl.WsensorDataRelevance(i) 
            ? vl.validateHumidity(data.wsensor.hum.data[i]) 
                ? ((data.wsensor.hum.data[i] + config.wsensor.hum.corr[i]).toFixed(2) + '%') 
                : '--' 
            : i18n.t('dataExpired')})`
        );
    }
    
    let things: string[] = [];
    for(let i=0; i<8; i++) things.push(`${i18n.t('field')} ${i + 1} (${vl.ThingspeakDataRelevance() ? data.thing.data[i] : i18n.t('dataExpired')})`);

    let hum = 40400;
    switch(config.comfort.hum.source) {
        case 1: hum = data.weather.hum; break; // humidity from weather forecast
        case 2: // humidity from wireless sensor
            hum = data.wsensor.hum.data[config.comfort.hum.wsensNum] + config.wsensor.hum.corr[config.comfort.temp.wsensNum];
            break;
        case 3: // humidity from thingspeak
            hum = data.thing.data[config.comfort.hum.thing];
            break;
        case 4: hum = data.bme280.hum + config.sensors.bme280.h; break; // humidity from BME280
        case 5: hum = data.sht21.hum + config.sensors.sht21.h; break; // humidity from SHT21
        case 6: hum = data.dht22.hum + config.sensors.dht22.h; break; // humidity from DHT22
        case 7: hum = data.bme680.hum + config.sensors.bme680.h; break; // humidity from BME680
    }

    let comfort = i18n.t('comfortable');
    if(vl.validateHumidity(hum)) {
        if(hum > ((config.comfort.hum.max[0] + config.comfort.hum.max[1]) / 2)) comfort = i18n.t('tooHumid');
        if(hum < ((config.comfort.hum.min[0] + config.comfort.hum.min[1]) / 2)) comfort = i18n.t('tooDry');
    }
    else comfort = '--';

    return <>
        <Card header={i18n.t('humidity')}
            content={<>
                {/* Sensor type */}
                <SelectSwitch label={i18n.t('dataSource.singular')}
                    options={sensors}
                    value={config.comfort.hum.source}
                    onChange={val => dispatch(cf.comfortHumSourceChange(val))}
                />

                {/* Wireless sensor number */}
                {config.comfort.hum.source === 2 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('wirelessSensorNumber')}
                        options={wsensors}
                        value={config.comfort.hum.wsensNum}
                        onChange={val => dispatch(cf.comfortHumWsensNumChange(val))}
                    />
                </div>}

                {/* Thingspeak */}
                {config.comfort.hum.source === 3 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('field')}
                        options={things}
                        value={config.comfort.hum.thing}
                        onChange={val => dispatch(cf.comfortHumThingChange(val))}
                    />
                </div>}

                {<div className={'card-comfort ' + (config.comfort.hum.source > 0 ? 'show' : 'hide')}>
                    <div className="mt-6"><Indication error={false} value={comfort} /></div>

                    <div className="mt-8">
                        <Toggle label={i18n.t('soundNotification')}
                            checked={config.comfort.hum.sound}
                            onChange={() => dispatch(cf.comfortHumSoundChange(config.comfort.hum.sound ? 0 : 1))}
                        />
                    </div>

                    {/* Max humidity */}
                    <RangeInput label={i18n.t('humMax')}
                        value={config.comfort.hum.max[0]}
                        min={0}
                        max={100}
                        limitMin={config.comfort.hum.min[0]}
                        limitMax={100}
                        step={0.1}
                        indication={`${config.comfort.hum.max[0].toFixed(1)}%`}
                        onChange={val => dispatch(cf.comfortHumMaxChange({ num: 0, val: val }))}
                        className="mt-4"
                    />

                    {/* Max humidity hysteresis */}
                    <RangeInput label={i18n.t('hysteresis')}
                        value={config.comfort.hum.max[1]}
                        min={0}
                        max={10}
                        limitMin={0}
                        limitMax={10}
                        step={0.1}
                        indication={`±${(config.comfort.hum.max[1] / 2).toFixed(2)}%`}
                        onChange={val => dispatch(cf.comfortHumMaxChange({ num: 1, val: val }))}
                        className="mt-4"
                    />

                    <div className="mt-4 select-none text-green-500 dark:text-green-200">
                        <div>{i18n.t('dryer')}</div>
                        <div>{i18n.t('on')}: {(config.comfort.hum.max[0] + (config.comfort.hum.max[1] / 2)).toFixed(2)}%</div>
                        <div>{i18n.t('off')}: {(config.comfort.hum.max[0] - (config.comfort.hum.max[1] / 2)).toFixed(2)}%</div>
                    </div>

                    <hr className="mt-8 mb-6" />

                    {/* Min Humidity */}
                    <RangeInput label={i18n.t('humMin')}
                        value={config.comfort.hum.min[0]}
                        min={0}
                        max={100}
                        limitMin={0}
                        limitMax={config.comfort.hum.max[0]}
                        step={0.1}
                        indication={`${config.comfort.hum.min[0].toFixed(1)}%`}
                        onChange={val => dispatch(cf.comfortHumMinChange({ num: 0, val: val }))}
                        className="mt-4"
                    />

                    {/* Min Humidity hysteresis */}
                    <RangeInput label={i18n.t('hysteresis')}
                        value={config.comfort.hum.min[1]}
                        min={0}
                        max={10}
                        limitMin={0}
                        limitMax={10}
                        step={0.1}
                        indication={`±${(config.comfort.hum.min[1] / 2).toFixed(2)}%`}
                        onChange={val => dispatch(cf.comfortHumMinChange({ num: 1, val: val }))}
                        className="mt-4"
                    />

                    <div className="mt-4 select-none text-green-500 dark:text-green-200">
                        <div>{i18n.t('humidifier')}</div>
                        <div>{i18n.t('on')}: {(config.comfort.hum.min[0] - (config.comfort.hum.min[1] / 2)).toFixed(2)}%</div>
                        <div>{i18n.t('off')}: {(config.comfort.hum.min[0] + (config.comfort.hum.min[1] / 2)).toFixed(2)}%</div>
                    </div>
                </div>}
            </>} 
        />
    </>
}

export default CardComfortHum;