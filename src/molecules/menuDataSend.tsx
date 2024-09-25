import { useSelector } from 'react-redux';
import { iMenuItems } from "../interfaces";
import { iValid } from "../redux/validTypes";
import MenuItem from "../atoms/menuItem";
import MenuSubItem from "../atoms/menuSubItem";
import i18n from '../i18n/main';
import { CloudArrowUp } from "@phosphor-icons/react";

export default function MenuDataSend(props: iMenuItems) {
    const validSendThingspeak = useSelector((state: iValid) => state.valid.sendThingspeak);
    const validSendNarodmon = useSelector((state: iValid) => state.valid.sendNarodmon);
    const validSendMqtt = useSelector((state: iValid) => state.valid.sendMqtt);

    return <MenuItem link="#" 
        current={props.current} 
        title={i18n.t('dataSend')} 
        mobile={props.mobile} 
        icon={<CloudArrowUp />}
        valid={validSendThingspeak && validSendNarodmon && validSendMqtt} 
    >
        <MenuSubItem link={"/sendthingspeak"} 
            current={props.current} 
            title={i18n.t('sendToThingspeak')} 
            valid={validSendThingspeak} 
        />

        <MenuSubItem link={"/sendnarodmon"} 
            current={props.current} 
            title={i18n.t('sendToNarodmon')} 
            valid={validSendNarodmon} 
        />

        <MenuSubItem link={"/sendmqtt"} 
            current={props.current} 
            title={i18n.t('sendViaMqtt')} 
            valid={validSendMqtt} 
        />
    </MenuItem>
}