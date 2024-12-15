import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import hostUrl from "../../atoms/hostUrl";
import ColorInput from "../../atoms/colorInput";
import * as cf from "../../redux/slices/config";
import { iConfig } from "../../redux/configTypes";
import { iDisplayTimeSlot } from "../../interfaces"; 

export default function TimeSlotColor(props: iDisplayTimeSlot) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const sendSlotColor = (val: string) => {
        let url = `${hostUrl()}/esp/color`;
        url += `?hex=${val.replace('#', '')}`;
        url += `&slot=${props.slot}`;
        url += `&num=${props.num}`;
        url += `code=${localStorage.getItem('code') || '0'}`;
        fetch(url);
    }

    return <ColorInput value={config.display.timeSlot ? config.display.timeSlot.color[props.slot][props.num] : ''}
        label={(config.display.type ? config.display.type[props.num] === 2 : 0) 
            ? i18n.t('displayColor') 
            : i18n.t('backlightColor')
        }
        onChange={val => {
            dispatch(cf.displayTimeslotColorChange({slot: props.slot, num: props.num, val: val}));
            sendSlotColor(val);
        }}
    />
}