import { iMenuItems } from "../interfaces";
import MenuItem from "../atoms/menuItem";
import i18n from '../i18n/main';
import { Info } from "@phosphor-icons/react";

export default function MenuStatus(props: iMenuItems) {
    return <MenuItem link="/" 
        current={props.current} 
        title={i18n.t('status')} 
        mobile={props.mobile} 
        icon={<Info />} 
        valid={true} 
    />
}