import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import { iDisplayTimeSlot } from "../interfaces";
import Forecast from "../atoms/indications/forecast";
import BME280 from "../atoms/indications/BME280";
import BMP180 from "../atoms/indications/BMP180";
import SHT21 from "../atoms/indications/SHT21";
import DHT22 from "../atoms/indications/DHT22";
import DS18B20 from "../atoms/indications/DS18B20";
import ESP32 from "../atoms/indications/ESP32";
import BME680 from "../atoms/indications/BME680";

export default function TimeSlotSensorType(props: iDisplayTimeSlot) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const types = [
        /* Time */ [],
        /* Data */ [],
        /* BME280 */ [`${i18n.t('temperature')} (${BME280().temp})`, `${i18n.t('humidity')} (${BME280().hum})`, `${i18n.t('pressure')} (${BME280().pres})` ],
        /* BMP180 */ [`${i18n.t('temperature')} (${BMP180().temp})`, `${i18n.t('pressure')} (${BMP180().pres})`],
        /* SHT21 */ [`${i18n.t('temperature')} (${SHT21().temp})`, `${i18n.t('humidity')} (${SHT21().hum})`],
        /* DHT22 */ [`${i18n.t('temperature')} (${DHT22().temp})`, `${i18n.t('humidity')} (${DHT22().hum})`],
        /* DS18B20 */ [`${i18n.t('temperature')} (${DS18B20().temp})`],
        /* ESP32 */ [`${i18n.t('temperature')} (${ESP32().temp})`],
        /* Thingspeak */ [],
        /* Forecast */ [`${i18n.t('temperature')} (${Forecast().temp})`, `${i18n.t('humidity')} (${Forecast().hum})`, `${i18n.t('pressure')} (${Forecast().pres})`],
        /* Wireless Sensor */ [],
        /* BME680 */ [`${i18n.t('temperature')} (${BME680().temp})`, `${i18n.t('humidity')} (${BME680().hum})`, `${i18n.t('pressure')} (${BME680().pres})`, `${i18n.t('indexForAirQuality')} (${BME680().iaq})`]
    ];

    return <>
        {types[config.display.timeSlot.sensor[props.slot][props.num]].length > 0 && <div className="mt-8">
            <SelectSwitch label={i18n.t('sensorType')}
                options={types[config.display.timeSlot.sensor[props.slot][props.num]]}
                value={config.display.timeSlot.data[props.slot][props.num]}
                onChange={val => dispatch(cf.displayTimeslotDataChange({slot: props.slot, num: props.num, val: val}))}
            />
        </div>}
    </> 
}