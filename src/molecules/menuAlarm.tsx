import { iMenuItems } from "../interfaces";
import MenuItem from "../atoms/menuItem";
import i18n from '../i18n/main';
import { Alarm } from "@phosphor-icons/react";

export default function MenuAlarm(props: iMenuItems) {
    return <MenuItem link="/alarm" 
        current={props.current} 
        title={i18n.t('alarm')} 
        mobile={props.mobile} 
        icon={<Alarm />} 
        valid={true} 
    />
}