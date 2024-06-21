import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import { iDisplayTimeSlot } from "../interfaces";
import * as cf from "../redux/slices/config";
import Wsensor from "../atoms/indications/wsensor";

export default function TimeSlotWsensDataType(props: iDisplayTimeSlot) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    let wsensorTypes = [];
    for(let i=0; i<2; i++) {
        wsensorTypes.push([
            ...([...Array(5)].map((x, n) => `${i18n.t('temperature')} ${n} (${Wsensor()[i].temp[n]})`)),
            `${i18n.t('humidity')} (${Wsensor()[i].hum})`,
            `${i18n.t('pressure')} (${Wsensor()[i].pres})`,
            `CO2 (${Wsensor()[i].co2})`
        ])
    }

    return <SelectSwitch label={i18n.t('sensorType')}
        options={wsensorTypes[config.display.timeSlot.wsensor.num[props.slot][props.num]]}
        value={config.display.timeSlot.wsensor.type[props.slot][props.num]}
        onChange={val => dispatch(cf.displayTimeslotWsensorTypeChange({slot: props.slot, num: props.num, val: val}))}
    />
}