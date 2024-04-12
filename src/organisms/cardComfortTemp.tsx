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

export default function CardComfortTemp() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const sensors = [
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

    let wsensors: string[] = [];
    for(let i=0; i<2; i++) wsensors.push(`${i18n.t('wirelessSensor.singular')} ${i}`);

    let temps: string[] = [];
    for(let i=0; i<5; i++) temps.push(`${i18n.t('temperature')} ${i} (${vl.WsensorDataRelevance(config.comfort.temp.wsensNum) 
        ? vl.validateTemperature(data.wsensor.temp.data[i][config.comfort.temp.wsensNum]) 
            ? ((data.wsensor.temp.data[i][config.comfort.temp.wsensNum] + config.wsensor.temp.corr[config.comfort.temp.wsensNum][i]).toFixed(2) + '°C') 
            : '--' 
        : i18n.t('dataExpired')})`);
    
    let things: string[] = [];
    for(let i=0; i<8; i++) things.push(`${i18n.t('field')} ${i + 1} (${vl.ThingspeakDataRelevance() 
        ? vl.validateThingspeak(data.thing?.data ? data.thing?.data[i] : -40400) ? data.thing?.data ? data.thing?.data[i] : '--' : '--' 
        : i18n.t('dataExpired')})`
    );

    let temp = 40400;
    switch(config.comfort.temp.source) {
        case 1: temp = data.weather.temp; break; // temperature from weather forecast
        case 2: // temperature from wireless sensor
            temp = data.wsensor.temp.data[config.comfort.temp.sens][config.comfort.temp.wsensNum] + config.wsensor.temp.corr[config.comfort.temp.wsensNum][config.comfort.temp.sens];
            break;
        case 3: // temperature from thingspeak
            temp = data.thing?.data ? data.thing?.data[config.comfort.temp.thing] : -40400;
            break;
        case 4: temp = data.bme280.temp + config.sensors.bme280.t; break; // temperature from BME280
        case 5: temp = data.bmp180.temp + config.sensors.bmp180.t; break; // temperature from BMP180
        case 6: temp = data.sht21.temp + config.sensors.sht21.t; break; // temperature from SHT21
        case 7: temp = data.dht22.temp + config.sensors.dht22.t; break; // temperature from DHT22
        case 8: temp = data.ds18b20.temp + config.sensors.ds18b20.t; break; // temperature from DS18B20
        case 9: temp = data.bme680.temp + config.sensors.bme680.t; break; // temperature from BME680
    }

    let comfort = i18n.t('comfortable');
    if(vl.validateTemperature(temp)) {
        if(temp > config.comfort.temp.max[0]) comfort = i18n.t('tooHot');
        if(temp < config.comfort.temp.min[0]) comfort = i18n.t('tooCold');
    }
    else comfort = '--';

    return <Card header={i18n.t('temperature')}
        content={<>
            {/* Sensor type */}
            <SelectSwitch label={i18n.t('dataSource.singular')}
                options={sensors}
                value={config.comfort.temp.source}
                onChange={val => dispatch(cf.comfortTempSourceChange(val))}
            />

            {/* Wireless sensor number */}
            {config.comfort.temp.source === 2 && <div className="mt-8">
                <SelectSwitch label={i18n.t('wirelessSensorNumber')}
                    options={wsensors}
                    value={config.comfort.temp.wsensNum}
                    onChange={val => dispatch(cf.comfortTempWsensNumChange(val))}
                />

                {/* Wireless sensor temperature sensor number */}
                <div className="mt-8">
                    <SelectSwitch label={i18n.t('temperatureSensorNumber')}
                        options={temps}
                        value={config.comfort.temp.sens}
                        onChange={val => dispatch(cf.comfortTempSensChange(val))}
                    />
                </div>
            </div>}

            {/* Thingspeak */}
            {config.comfort.temp.source === 3 && <div className="mt-8">
                <SelectSwitch label={i18n.t('field')}
                    options={things}
                    value={config.comfort.temp.thing}
                    onChange={val => dispatch(cf.comfortTempThingChange(val))}
                />
            </div>}

            {<div className={'card-comfort ' + (config.comfort.temp.source > 0 ? 'show' : 'hide')}>
                <div className="mt-6"><Indication error={false} value={comfort} /></div>

                <div className="mt-8">
                    <Toggle label={i18n.t('soundNotification')}
                        checked={config.comfort.temp.sound}
                        onChange={() => dispatch(cf.comfortTempSoundChange(config.comfort.temp.sound ? 0 : 1))}
                    />
                </div>

                {/* Max temperature */}
                <RangeInput label={i18n.t('tempMax')}
                    value={config.comfort.temp.max[0]}
                    min={-50}
                    max={100}
                    limitMin={config.comfort.temp.min[0]}
                    limitMax={100}
                    step={0.1}
                    indication={`${config.comfort.temp.max[0].toFixed(1)}°C`}
                    onChange={val => dispatch(cf.comfortTempMaxChange({ num: 0, val: val }))}
                    className="mt-4"
                />

                {/* Max temperature hysteresis */}
                <RangeInput label={i18n.t('hysteresis')}
                    value={config.comfort.temp.max[1]}
                    min={0}
                    max={10}
                    limitMin={0}
                    limitMax={10}
                    step={0.1}
                    indication={`±${(config.comfort.temp.max[1] / 2).toFixed(2)}°C`}
                    onChange={val => dispatch(cf.comfortTempMaxChange({ num: 1, val: val }))}
                    className="mt-4"
                />
                <div className="mt-4 select-none text-green-500 dark:text-green-200">
                    <div>{i18n.t('conditioner')}</div>
                    <div>{i18n.t('on')}: {(config.comfort.temp.max[0] + (config.comfort.temp.max[1] / 2)).toFixed(2)}°C</div>
                    <div>{i18n.t('off')}: {(config.comfort.temp.max[0] - (config.comfort.temp.max[1] / 2)).toFixed(2)}°C</div>
                </div>

                <hr className="mt-8 mb-6" />

                {/* Min temperature */}
                <RangeInput label={i18n.t('tempMin')}
                    value={config.comfort.temp.min[0]}
                    min={-50}
                    max={100}
                    limitMin={-50}
                    limitMax={config.comfort.temp.max[0]}
                    step={0.1}
                    indication={`${config.comfort.temp.min[0].toFixed(1)}°C`}
                    onChange={val => dispatch(cf.comfortTempMinChange({ num: 0, val: val }))}
                    className="mt-4"
                />

                {/* Min temperature hysteresis */}
                <RangeInput label={i18n.t('hysteresis')}
                    value={config.comfort.temp.min[1]}
                    min={0}
                    max={10}
                    limitMin={0}
                    limitMax={10}
                    step={0.1}
                    indication={`±${(config.comfort.temp.min[1] / 2).toFixed(1)}°C`}
                    onChange={val => dispatch(cf.comfortTempMinChange({ num: 1, val: val }))}
                    className="mt-4"
                />

                <div className="mt-4 select-none text-green-500 dark:text-green-200">
                    <div>{i18n.t('heater')}</div>
                    <div>{i18n.t('on')}: {(config.comfort.temp.min[0] - (config.comfort.temp.min[1] / 2)).toFixed(2)}°C</div>
                    <div>{i18n.t('off')}: {(config.comfort.temp.min[0] + (config.comfort.temp.min[1] / 2)).toFixed(2)}°C</div>
                </div>
            </div>}
        </>} 
    />
}