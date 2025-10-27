import { useState, useEffect } from "react";
import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import device from "../../device";
import SelectSwitch from "../../atoms/selectSwitch";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as cf from "../../redux/slices/config";
import forecast from "../../atoms/indications/forecast";
import tempHumPres from "../../atoms/indications/tempHumPres";
import tempPres from "../../atoms/indications/tempPres";
import tempHum from "../../atoms/indications/tempHum";
import temp from "../../atoms/indications/temp";
import tempHumPresIaq from "../../atoms/indications/tempHumPresIaq";

export default function SensorTypeTempIn() {
    const [prevSens, setPrevSens] = useState<number>(0);
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const bme280indications = tempHumPres(config.sensors.bme280, data.bme280, config.units.pres);
    const bmp180indications = tempPres(config.sensors.bmp180, data.bmp180, config.units.pres);
    const sht21indications = tempHum(config.sensors.sht21, data.sht21);
    const dht22indications = tempHum(config.sensors.dht22, data.dht22);
    const ds18b20indications = temp(config.sensors.ds18b20, data.ds18b20);
    const bme680indications = tempHumPresIaq(config.sensors.bme680, data.bme680, config.units.pres);
    const weatherIndications = forecast(config.weather, data.weather, config.units.pres);

    const sensors = [];
    sensors.push('--');
    sensors.push(`${i18n.t('forecast')} (${weatherIndications.temp})`);
    if(device() === 'WeatherMonitorBIM32') sensors.push(i18n.t('wirelessSensor.singular'));
    sensors.push('Thingspeak');
    if(device() === 'WeatherMonitorBIM32') sensors.push(i18n.t('sequence'));
    sensors.push(`BME280 (${bme280indications.temp})`);
    sensors.push(`BMP180 (${bmp180indications.temp})`);
    sensors.push(`SHT21 (${sht21indications.temp})`);
    sensors.push(`DHT22 (${dht22indications.temp})`);
    sensors.push(`DS18B20 (${ds18b20indications})`);
    if(device() === 'WeatherMonitorBIM32') sensors.push(`BME680 (${bme680indications.temp})`);

    useEffect(() => {
        setPrevSens(config.display.source.tempIn.sens);
    }, [config.display.source.tempIn.sens]);

    return <SelectSwitch label={i18n.t('dataSource.singular')}
        options={sensors}
        value={config.display.source.tempIn.sens}
        onChange={val => {
            dispatch(cf.displaySourceTempInSensChange(val));
            if(device() === 'WeatherMonitorBIM32') {
                if(val === 4) dispatch(cf.displaySourceHumInSensChange(val));
                if(prevSens === 4) dispatch(cf.displaySourceHumInSensChange(0));
            }
        }}
    />
}