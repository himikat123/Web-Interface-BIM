import i18n from "../../i18n/main";
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import device from "../../device";
import SelectSwitch from "../../atoms/selectSwitch";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as cf from "../../redux/slices/config";
import tempHumPresIaq from "../../atoms/indications/tempHumPresIaq";
import tempHumPres from "../../atoms/indications/tempHumPres";
import tempHum from "../../atoms/indications/tempHum";
import weather from "../../atoms/indications/forecast";

export default function SensorTypeVoltage() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const bme680indications = tempHumPresIaq(config.sensors.bme680, data.bme680);
    const bme280indications = tempHumPres(config.sensors.bme280, data.bme280);
    const sht21indications = tempHum(config.sensors.sht21, data.sht21);
    const dht22indications = tempHum(config.sensors.dht22, data.dht22);
    const weatherindications = weather(config.weather, data.weather);
    const locale = config.lang === 'ua' ? 'uk' : config.lang;

    const sensors = [];
    sensors.push("--");
    if(device() === 'WeatherMonitorBIM') sensors.push(i18n.t('battery'));
    if(device() === 'WeatherMonitorBIM32') sensors.push(i18n.t('wirelessSensor.singular'));
    sensors.push('Thingspeak');
    let date = moment().locale(locale).format('ll');
    date = date.replaceAll(' de', '');
    date = date.replace(/(?<!\d)\./g, '');
    date = date.replace(/\s[гр]$/, '');
    date = date.replace(/\p{L}{4,}/u, m => m.slice(0, 3));
    sensors.push(`${i18n.t('date')} (${date})`);
    if(device() === 'WeatherMonitorBIM32') {
        sensors.push(`BME680 (${bme680indications.iaq})`);
        sensors.push(`BME680 (${i18n.t('absHumidity')} ${bme680indications.aHum})`);
        sensors.push(`BME680 (${i18n.t('dewPoint')} ${bme680indications.dp})`);
    }
    sensors.push(`BME280 (${i18n.t('absHumidity')} ${bme280indications.aHum})`);
    sensors.push(`BME280 (${i18n.t('dewPoint')} ${bme280indications.dp})`);
    sensors.push(`DHT22 (${i18n.t('absHumidity')} ${dht22indications.aHum})`);
    sensors.push(`DHT22 (${i18n.t('dewPoint')} ${dht22indications.dp})`);
    sensors.push(`SHT21 (${i18n.t('absHumidity')} ${sht21indications.aHum})`);
    sensors.push(`SHT21 (${i18n.t('dewPoint')} ${sht21indications.dp})`);
    sensors.push(`${i18n.t('forecast')} (${i18n.t('absHumidity')} ${weatherindications.aHum})`);
    sensors.push(`${i18n.t('forecast')} (${i18n.t('dewPoint')} ${weatherindications.dp})`);

    return <SelectSwitch label={i18n.t('dataSource.singular')}
        options={sensors}
        value={config.display.source.volt.sens}
        onChange={val => dispatch(cf.displaySourceVoltSensChange(val))}
    />
}