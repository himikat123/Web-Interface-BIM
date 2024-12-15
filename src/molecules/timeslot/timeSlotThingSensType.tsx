import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../../atoms/selectSwitch";
import { iConfig } from "../../redux/configTypes";
import { iDisplayTimeSlot } from "../../interfaces";
import * as cf from "../../redux/slices/config";

export default function TimeSlotThingSensType(props: iDisplayTimeSlot) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <SelectSwitch label={i18n.t('sensorType')}
        options={[i18n.t('temperature'), i18n.t('humidity'), i18n.t('pressure')]}
        value={config.display.timeSlot ? config.display.timeSlot.data[props.slot][props.num] : 0}
        onChange={val => dispatch(cf.displayTimeslotDataChange({slot: props.slot, num: props.num, val: val}))}
    />
}