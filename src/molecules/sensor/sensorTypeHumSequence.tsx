import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../../atoms/selectSwitch";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as cf from "../../redux/slices/config";
import forecast from "../../atoms/indications/forecast";
import tempHumPres from "../../atoms/indications/tempHumPres";
import tempHum from "../../atoms/indications/tempHum";
import tempHumPresIaq from "../../atoms/indications/tempHumPresIaq";
import { iSensorTypeSequence } from "../../interfaces";

export default function SensorTypeHumSequence(props: iSensorTypeSequence) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const bme280indications = tempHumPres(config.sensors.bme280, data.bme280);
    const sht21indications = tempHum(config.sensors.sht21, data.sht21);
    const dht22indications = tempHum(config.sensors.dht22, data.dht22);
    const bme680indications = tempHumPresIaq(config.sensors.bme680, data.bme680);
    const weatherIndications = forecast(config.weather, data.weather);

    const sensors = [
        '--', 
        `${i18n.t('forecast')} (${weatherIndications.hum})`,
        i18n.t('wirelessSensor.singular'), 
        'Thingspeak',
        `BME280 (${bme280indications.hum})`, 
        `SHT21 (${sht21indications.hum})`, 
        `DHT22 (${dht22indications.hum})`, 
        `BME680 (${bme680indications.hum})`
    ];

    return <SelectSwitch label={i18n.t('timeSlot') + ' ' + String(props.num + 1)}
        options={sensors}
        value={config.display.source.sequence ? config.display.source.sequence.hum[props.num] : 0}
        onChange={val => dispatch(cf.displaySourceSequenceHumChange({ num: props.num, val: val }))}
    />
}