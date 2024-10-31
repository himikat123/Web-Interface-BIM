import i18n from "../../i18n/main";
import device from "../../device";
import SelectSwitch from "../../atoms/selectSwitch";
import Forecast from "../../atoms/indications/forecast";
import BME280 from "../../atoms/indications/BME280";
import BMP180 from "../../atoms/indications/BMP180";
import SHT21 from "../../atoms/indications/SHT21";
import DHT22 from "../../atoms/indications/DHT22";
import DS18B20 from "../../atoms/indications/DS18B20";
import MAX44009 from "../../atoms/indications/MAX44009";
import BH1750 from "../../atoms/indications/BH1750";
import Analog from "../../atoms/indications/analog";
import ESP32 from "../../atoms/indications/ESP32";
import BME680 from "../../atoms/indications/BME680";
import { iCloudSensorType } from "../../interfaces";

export default function CloudSensorType(props: iCloudSensorType) {
    const t = i18n.t('temperature');
    const h = i18n.t('humidity');
    const p = i18n.t('pressure');
    const i = i18n.t('indexForAirQuality');
    const l = i18n.t('ambientLight');
    const a = i18n.t('voltage');
    const r = i18n.t('runtime');
    
    const sensors = [];
    sensors.push([]); /* -- */
    sensors.push([`${t} (${Forecast().temp})`, `${h} (${Forecast().hum})`, `${p} (${Forecast().pres})`]);
    if(device() === 'WeatherMonitorBIM32') sensors.push([]); /* Wireless sensor */
    sensors.push([`${t} (${BME280().temp})`, `${h} (${BME280().hum})`, `${p} (${BME280().pres})`]);
    sensors.push([`${t} (${BMP180().temp})`, `${p} (${BMP180().pres})`]);
    sensors.push([`${t} (${SHT21().temp})`, `${h} (${SHT21().hum})`]);
    sensors.push([`${t} (${DHT22().temp})`, `${h} (${DHT22().hum})`]);
    sensors.push([`${t} (${DS18B20().temp})`]);
    sensors.push([`${l} (${MAX44009().light})`]);
    sensors.push([`${l} (${BH1750().light})`]);
    if(device() === 'WeatherMonitorBIM') sensors.push([`${r} (${ESP32().runtime})`]);
    if(device() === 'WeatherMonitorBIM32') {
        sensors.push([`${a} (${Analog().volt})`]);
        sensors.push([`${t} (${ESP32().temp})`, `${r} (${ESP32().runtime})`]);
        sensors.push([`${t} (${BME680().temp})`, `${h} (${BME680().hum})`, `${p} (${BME680().pres})`, `${i} (${BME680().iaq})`]);
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