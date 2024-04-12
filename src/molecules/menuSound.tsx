import { iMenuItems } from "../interfaces";
import MenuItem from "../atoms/menuItem";
import i18n from '../i18n/main';
import { SpeakerHigh } from "@phosphor-icons/react";

const MenuSound = (props: iMenuItems) => {
    return <MenuItem link="/sound" 
        current={props.current} 
        title={i18n.t('sound')} 
        mobile={props.mobile} 
        icon={<SpeakerHigh />} 
        valid={true} 
    />
}

export default MenuSound;