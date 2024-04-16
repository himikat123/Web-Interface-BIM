import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import Forecast from "../atoms/data/forecast";
import BME280 from "../atoms/data/BME280";
import BMP180 from "../atoms/data/BMP180";
import SHT21 from "../atoms/data/SHT21";
import DHT22 from "../atoms/data/DHT22";
import DS18B20 from "../atoms/data/DS18B20";
import BME680 from "../atoms/data/BME680";
import { iSensorTypeSequence } from "../interfaces";

export default function SensorTypeTempIn(props: iSensorTypeSequence) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const sensors = [
        '--', 
        Forecast().temp, 
        i18n.t('wirelessSensor.singular'), 
        'Thingspeak',
        BME280().temp, 
        BMP180().temp, 
        SHT21().temp, 
        DHT22().temp, 
        DS18B20().temp, 
        BME680().temp
    ];

    return <SelectSwitch label={i18n.t('timeSlot') + ' ' + String(props.num + 1)}
        options={sensors}
        value={config.display.source.sequence.temp[props.num]}
        onChange={val => dispatch(cf.displaySourceSequenceTempChange({ num: props.num, val: val }))}
    />
}