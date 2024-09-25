import { useSelector } from 'react-redux';
import { iMenuItems } from "../interfaces";
import { iValid } from "../redux/validTypes";
import MenuItem from "../atoms/menuItem";
import i18n from '../i18n/main';
import { Clock } from "@phosphor-icons/react";

export default function MenuClock(props: iMenuItems) {
    const validClock = useSelector((state: iValid) => state.valid.clock);

    return <MenuItem link={"/clock"} 
        current={props.current} 
        title={i18n.t('clock')} 
        mobile={props.mobile} 
        icon={<Clock />} 
        valid={validClock} 
    />
}