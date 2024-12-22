import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import { display1ValidChange } from "../../redux/slices/valid";
import NumberInput from "../../atoms/numberInput";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";
import { iDisplayTimeSlot } from "../../interfaces"; 

export default function TimeSlotDuration(props: iDisplayTimeSlot) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <NumberInput value={config.display.timeSlot ? config.display.timeSlot.period[props.slot][props.num] : 0}
        min={0}
        max={99}
        label={i18n.t('displayDuration')}
        onChange={val => dispatch(cf.displayTimeslotPeriodChange({slot: props.slot, num: props.num, val: val}))}
        isValid={valid => dispatch(display1ValidChange(valid))}
    />
}