import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";

export default function NarodmonSourceSensor(props: {num: number}) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    
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
        value={config.narodmonSend.sensors[props.num]}
        onChange={val => {
            dispatch(cf.narodmonSendSensorsChange({ num: props.num, val: val }));
            dispatch(cf.narodmonSendTypesChange({ num: props.num, val: 0 }))
        }}
    />
}