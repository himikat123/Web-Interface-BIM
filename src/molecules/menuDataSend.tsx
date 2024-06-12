import { useSelector } from 'react-redux';
import { iMenuItems } from "../interfaces";
import { iValid } from "../redux/validTypes";
import MenuItem from "../atoms/menuItem";
import MenuSubItem from "../atoms/menuSubItem";
import i18n from '../i18n/main';
import { CloudArrowUp } from "@phosphor-icons/react";
import relPath from "../atoms/relPath";

export default function MenuDataSend(props: iMenuItems) {
    const validSendThingspeak = useSelector((state: iValid) => state.valid.sendThingspeak);
    const validSendNarodmon = useSelector((state: iValid) => state.valid.sendNarodmon);

    return <MenuItem link="#" 
        current={props.current} 
        title={i18n.t('dataSend')} 
        mobile={props.mobile} 
        icon={<CloudArrowUp />}
        valid={validSendThingspeak && validSendNarodmon} 
    >
        <MenuSubItem link={relPath() + "/sendthingspeak"} 
            current={props.current} 
            title={i18n.t('sendToThingspeak')} 
            valid={validSendThingspeak} 
        />

        <MenuSubItem link={relPath() + "/sendnarodmon"} 
            current={props.current} 
            title={i18n.t('sendToNarodmon')} 
            valid={validSendNarodmon} 
        />
    </MenuItem>
}