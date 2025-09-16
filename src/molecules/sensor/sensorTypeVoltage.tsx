import i18n from "../../i18n/main";
import moment from "moment";
import { useSelector, useDispatch } from 'react-redux';
import device from "../../device";
import SelectSwitch from "../../atoms/selectSwitch";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";
import BME680 from "../../atoms/indications/BME680";
import BME280 from "../../atoms/indications/BME280";
import DHT22 from "../../atoms/indications/DHT22";
import SHT21 from "../../atoms/indications/SHT21";
import Weather from "../../atoms/indications/forecast";

export default function SensorTypeVoltage() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
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
        sensors.push(`BME680 (${BME680().iaq})`);
        sensors.push(`BME680 (${i18n.t('absHumidity')} ${BME680().aHum})`);
        sensors.push(`BME680 (${i18n.t('dewPoint')} ${BME680().dp})`);
    }
    sensors.push(`BME280 (${i18n.t('absHumidity')} ${BME280().aHum})`);
    sensors.push(`BME280 (${i18n.t('dewPoint')} ${BME280().dp})`);
    sensors.push(`DHT22 (${i18n.t('absHumidity')} ${DHT22().aHum})`);
    sensors.push(`DHT22 (${i18n.t('dewPoint')} ${DHT22().dp})`);
    sensors.push(`SHT21 (${i18n.t('absHumidity')} ${SHT21().aHum})`);
    sensors.push(`SHT21 (${i18n.t('dewPoint')} ${SHT21().dp})`);
    sensors.push(`${i18n.t('forecast')} (${i18n.t('absHumidity')} ${Weather().aHum})`);
    sensors.push(`${i18n.t('forecast')} (${i18n.t('dewPoint')} ${Weather().dp})`);

    return <SelectSwitch label={i18n.t('dataSource.singular')}
        options={sensors}
        value={config.display.source.volt.sens}
        onChange={val => dispatch(cf.displaySourceVoltSensChange(val))}
    />
}