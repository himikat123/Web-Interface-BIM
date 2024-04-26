import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment";
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import { iDisplayTimeSlot } from "../interfaces"; 
import * as cf from "../redux/slices/config";

export default function TimeSlotDataSource(props: iDisplayTimeSlot) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const sensors = [
        `${i18n.t('time')} (${moment.unix(data.time).format('HH:mm:ss')})`,
        `${i18n.t('date')} (${moment.unix(data.time).format('DD.MM.YYYY')})`,
        'BME280',
        'BMP180',
        'SHT21',
        'DHT22',
        'DS18B20',
        'ESP32',
        'Thingspeak',
        i18n.t('forecast'),
        i18n.t('wirelessSensor.singular'),
        'BME680'
    ];

    return <SelectSwitch label={i18n.t('dataSource.singular')}
        options={sensors}
        value={config.display.timeSlot.sensor[props.slot][props.num]}
        onChange={val => {
            dispatch(cf.displayTimeslotSensorChange({slot: props.slot, num: props.num, val: val}));
            dispatch(cf.displayTimeslotDataChange({slot: props.slot, num: props.num, val: 0}))
        }}
    />
}