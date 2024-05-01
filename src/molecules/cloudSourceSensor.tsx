import i18n from "../i18n/main";
import SelectSwitch from "../atoms/selectSwitch";
import { iCloudSensor } from "../interfaces";

export default function CloudSourceSensor(props: iCloudSensor) {
    const sensors = [
        '--',
        i18n.t('forecast'),
        i18n.t('wirelessSensor.singular'),
        'BME280',
        'BMP180',
        'SHT21',
        'DHT22',
        'DS18B20',
        'MAX44009',
        'BH1750',
        i18n.t('analogInput'),
        'ESP32',
        'BME680'
    ];

    return <SelectSwitch label={i18n.t('dataSource.singular')}
        options={sensors}
        value={props.value}
        onChange={props.onChange}
    />
}