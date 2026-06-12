import { useSelector } from "react-redux";
import i18n from "../../i18n/main";
import device from "../../device";
import SelectSwitch from "../../atoms/selectSwitch";
import forecast from "../../atoms/indications/forecast";
import tempHumPres from "../../atoms/indications/tempHumPres";
import tempPres from "../../atoms/indications/tempPres";
import tempHum from "../../atoms/indications/tempHum";
import temp from "../../atoms/indications/temp";
import light from "../../atoms/indications/light";
import analog from "../../atoms/indications/analog";
import esp32 from "../../atoms/indications/ESP32";
import tempHumPresIaq from "../../atoms/indications/tempHumPresIaq";
import * as bat from "../../atoms/indications/battery";
import type { iCloudSensorType } from "../../interfaces";
import type { iConfig } from "../../redux/configTypes";
import type { iData } from "../../redux/dataTypes";

export default function CloudSensorType(props: iCloudSensorType) {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const bme280indications = tempHumPres(config.sensors.bme280, data.bme280, config.units.pres);
    const bmp180indications = tempPres(config.sensors.bmp180, data.bmp180, config.units.pres);
    const sht21indications = tempHum(config.sensors.sht21, data.sht21);
    const dht22indications = tempHum(config.sensors.dht22, data.dht22);
    const ds18b20indications = temp(config.sensors.ds18b20, data.ds18b20);
    const bme680indications = tempHumPresIaq(config.sensors.bme680, data.bme680, config.units.pres);
    const max44009indications = light(config.sensors.max44009, data.max44009);
    const bh1750indications = light(config.sensors.bh1750, data.bh1750);
    const esp32indications = esp32(config.sensors.esp32, data.esp32, data.runtime, config.lang);
    const analogIndications = analog(config.sensors.analog, data.analog);
    const weatherIndications = forecast(config.weather, data.weather, config.units.pres);

    const t = i18n.t('temperature');
    const h = i18n.t('humidity');
    const p = i18n.t('pressure');
    const ws = i18n.t('windSpeed');
    const wd = i18n.t('windDirection');
    const i = i18n.t('indexForAirQuality');
    const l = i18n.t('ambientLight');
    const a = i18n.t('voltage');
    const r = i18n.t('runtime');
    const ah = i18n.t('absHumidity');
    const dp = i18n.t('dewPoint');
    const bv = i18n.t('batteryVoltage');
    const bp = i18n.t('batteryPercentage');
    const bl = i18n.t('batteryLevel');
    
    const sensors = [];
    const row = [];

    sensors.push([]); /* -- */

    row.push(`${t} (${weatherIndications.temp})`);
    row.push(`${h} (${weatherIndications.hum})`);
    row.push(`${p} (${weatherIndications.pres})`);
    if(device() === 'WeatherMonitorBIM32') {
        row.push(`${ws} (${weatherIndications.windSpeed})`);
        row.push(`${wd} {${weatherIndications.windDirStr}} (${weatherIndications.windDir})`);
    }
    row.push(`${ah} (${weatherIndications.aHum})`);
    row.push(`${dp} (${weatherIndications.dp})`);
    sensors.push(row);

    if(device() === 'WeatherMonitorBIM32') sensors.push([]); /* Wireless sensor */
    sensors.push([
        `${t} (${bme280indications.temp})`, 
        `${h} (${bme280indications.hum})`, 
        `${p} (${bme280indications.pres})`, 
        `${ah} (${bme280indications.aHum})`, 
        `${dp} (${bme280indications.dp})`
    ]);
    sensors.push([
        `${t} (${bmp180indications.temp})`, 
        `${p} (${bmp180indications.pres})`
    ]);
    sensors.push([
        `${t} (${sht21indications.temp})`, 
        `${h} (${sht21indications.hum})`, 
        `${ah} (${sht21indications.aHum})`, 
        `${dp} (${sht21indications.dp})`
    ]);
    sensors.push([
        `${t} (${dht22indications.temp})`, 
        `${h} (${dht22indications.hum})`, 
        `${ah} (${dht22indications.aHum})`, 
        `${dp} (${dht22indications.dp})`
    ]);
    sensors.push([`${t} (${ds18b20indications})`]);
    sensors.push([`${l} (${max44009indications})`]);
    sensors.push([`${l} (${bh1750indications})`]);
    if(device() === 'WeatherMonitorBIM') {
        sensors.push([`${r} (${esp32indications.runtime})`]);
        sensors.push([
            `${bv} (${bat.batVoltageStr(data.adc ?? 0, config.batK ?? 0)})`, 
            `${bp} (${bat.batPercentStr(data.adc ?? 0, config.batK ?? 0)})`, 
            `${bl} (${bat.batLevelStr(data.adc ?? -1, config.batK ?? 0)})`
        ]);
    }
    if(device() === 'WeatherMonitorBIM32') {
        sensors.push([`${a} (${analogIndications})`]);
        sensors.push([`${t} (${esp32indications.temp})`, `${r} (${esp32indications.runtime})`]);
        sensors.push([
            `${t} (${bme680indications.temp})`, 
            `${h} (${bme680indications.hum})`, 
            `${p} (${bme680indications.pres})`, 
            `${i} (${bme680indications.iaq})`, 
            `${ah} (${bme680indications.aHum})`, 
            `${dp} (${bme680indications.dp})`
        ]);
    }

    return <>
        {sensors[props.sens].length > 0 && <div className="mt-8">
            <SelectSwitch label={i18n.t('sensorType')}
                options={sensors[props.sens]}
                value={props.value}
                onChange={val => props.onChange(val)}
            />
        </div>}
    </>
}