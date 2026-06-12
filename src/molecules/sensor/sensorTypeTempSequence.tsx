import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../../atoms/selectSwitch";
import type { iConfig } from "../../redux/configTypes";
import type { iData } from "../../redux/dataTypes";
import * as cf from "../../redux/slices/config";
import forecast from "../../atoms/indications/forecast";
import tempHumPres from "../../atoms/indications/tempHumPres";
import tempPres from "../../atoms/indications/tempPres";
import tempHum from "../../atoms/indications/tempHum";
import temp from "../../atoms/indications/temp";
import tempHumPresIaq from "../../atoms/indications/tempHumPresIaq";
import { iSensorTypeSequence } from "../../interfaces";

export default function SensorTypeTempSequence(props: iSensorTypeSequence) {
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

    const sensors = [
        '--', 
        `${i18n.t('forecast')} (${weatherIndications.temp})`,
        i18n.t('wirelessSensor.singular'), 
        'Thingspeak',
        `BME280 (${bme280indications.temp})`, 
        `BMP180 (${bmp180indications.temp})`, 
        `SHT21 (${sht21indications.temp})`, 
        `DHT22 (${dht22indications.temp})`, 
        `DS18B20 (${ds18b20indications})`, 
        `BME680 (${bme680indications.temp})`
    ];

    return <SelectSwitch label={i18n.t('timeSlot') + ' ' + String(props.num + 1)}
        options={sensors}
        value={config.display.source.sequence ? config.display.source.sequence.temp[props.num] : 0}
        onChange={val => dispatch(cf.displaySourceSequenceTempChange({ num: props.num, val: val }))}
    />
}