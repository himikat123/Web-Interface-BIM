import { useState, useEffect } from "react";
import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import device from "../../device";
import SelectSwitch from "../../atoms/selectSwitch";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";
import Forecast from "../../atoms/indications/forecast";
import BME280 from "../../atoms/indications/BME280";
import SHT21 from "../../atoms/indications/SHT21";
import DHT22 from "../../atoms/indications/DHT22";
import BME680 from "../../atoms/indications/BME680";

export default function SensorTypeHumIn() {
    const [prevSens, setPrevSens] = useState<number>(0);
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const sensors = [];
    sensors.push('--');
    sensors.push(`${i18n.t('forecast')} (${Forecast().hum})`);
    if(device() === 'WeatherMonitorBIM32') sensors.push(i18n.t('wirelessSensor.singular'));
    sensors.push('Thingspeak');
    if(device() === 'WeatherMonitorBIM32') sensors.push(i18n.t('sequence'));
    sensors.push(`BME280 (${BME280().hum})`);
    sensors.push(`SHT21 (${SHT21().hum})`);
    sensors.push(`DHT22 (${DHT22().hum})`);
    if(device() === 'WeatherMonitorBIM32') sensors.push(`BME680 (${BME680().hum})`);

    useEffect(() => {
        setPrevSens(config.display.source.humIn.sens);
    }, [config.display.source.humIn.sens]);

    return <SelectSwitch label={i18n.t('dataSource.singular')}
        options={sensors}
        value={config.display.source.humIn.sens}
        onChange={val => {
            dispatch(cf.displaySourceHumInSensChange(val));
            if(device() === 'WeatherMonitorBIM32') {
                if(val === 4) dispatch(cf.displaySourceTempInSensChange(val));
                if(prevSens === 4) dispatch(cf.displaySourceTempInSensChange(0));
            }
        }}
    />
}