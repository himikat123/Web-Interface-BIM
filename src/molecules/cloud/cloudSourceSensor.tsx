import i18n from "../../i18n/main";
import device from "../../device";
import SelectSwitch from "../../atoms/selectSwitch";
import { iCloudSensor } from "../../interfaces";

export default function CloudSourceSensor(props: iCloudSensor) {
    const sensors = [];
    sensors.push('--');
    sensors.push(i18n.t('forecast'));
    if(device() === 'WeatherMonitorBIM32') sensors.push(i18n.t('wirelessSensor.singular'));
    sensors.push('BME280');
    sensors.push('BMP180');
    sensors.push('SHT21');
    sensors.push('DHT22');
    sensors.push('DS18B20');
    sensors.push('MAX44009');
    sensors.push('BH1750');
    if(device() === 'WeatherMonitorBIM') sensors.push('ESP8266');
    if(device() === 'WeatherMonitorBIM32') sensors.push(i18n.t('analogInput'));
    if(device() === 'WeatherMonitorBIM32') sensors.push('ESP32');
    if(device() === 'WeatherMonitorBIM32') sensors.push('BME680');

    return <SelectSwitch label={i18n.t('dataSource.singular')}
        options={sensors}
        value={props.value}
        onChange={props.onChange}
    />
}