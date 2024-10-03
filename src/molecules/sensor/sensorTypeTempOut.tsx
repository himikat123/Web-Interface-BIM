import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../../atoms/selectSwitch";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";
import Forecast from "../../atoms/indications/forecast";
import BME280 from "../../atoms/indications/BME280";
import BMP180 from "../../atoms/indications/BMP180";
import SHT21 from "../../atoms/indications/SHT21";
import DHT22 from "../../atoms/indications/DHT22";
import DS18B20 from "../../atoms/indications/DS18B20";
import BME680 from "../../atoms/indications/BME680";

export default function SensorTypeTempOut() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const sensors = [
        '--', 
        `${i18n.t('forecast')} (${Forecast().temp})`, 
        i18n.t('wirelessSensor.singular'), 
        'Thingspeak',
        `BME280 (${BME280().temp})`, 
        `BMP180 (${BMP180().temp})`, 
        `SHT21 (${SHT21().temp})`, 
        `DHT22 (${DHT22().temp})`, 
        `DS18B20 (${DS18B20().temp})`, 
        `BME680 (${BME680().temp})`
    ];

    return <SelectSwitch label={i18n.t('dataSource.singular')}
        options={sensors}
        value={config.display.source.tempOut.sens}
        onChange={val => dispatch(cf.displaySourceTempOutSensChange(val))}
    />
}