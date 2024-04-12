import { iMenuItems } from "../interfaces";
import MenuItem from "../atoms/menuItem";
import i18n from '../i18n/main';
import { Fan } from "@phosphor-icons/react";

const MenuComfort = (props: iMenuItems) => {
    return <MenuItem link="/comfort" 
        current={props.current} 
        title={i18n.t('comfort')} 
        mobile={props.mobile} 
        icon={<Fan />} 
        valid={true} 
    />
}

export default MenuComfort;