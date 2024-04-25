import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import Forecast from "../atoms/indications/forecast";
import BME280 from "../atoms/indications/BME280";
import SHT21 from "../atoms/indications/SHT21";
import DHT22 from "../atoms/indications/DHT22";
import BME680 from "../atoms/indications/BME680";
import { iSensorTypeSequence } from "../interfaces";

export default function SensorTypeHumSequence(props: iSensorTypeSequence) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const sensors = [
        '--', 
        Forecast().hum, 
        i18n.t('wirelessSensor.singular'), 
        'Thingspeak',
        BME280().hum,
        SHT21().hum,
        DHT22().hum,
        BME680().hum
    ];

    return <SelectSwitch label={i18n.t('timeSlot') + ' ' + String(props.num + 1)}
        options={sensors}
        value={config.display.source.sequence.hum[props.num]}
        onChange={val => dispatch(cf.displaySourceSequenceHumChange({ num: props.num, val: val }))}
    />
}