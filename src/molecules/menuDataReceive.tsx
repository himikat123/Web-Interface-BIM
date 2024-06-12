import { useSelector } from 'react-redux';
import { iMenuItems } from "../interfaces";
import { iValid } from "../redux/validTypes";
import MenuItem from "../atoms/menuItem";
import i18n from '../i18n/main';
import { CloudArrowDown } from "@phosphor-icons/react";
import relPath from "../atoms/relPath";

export default function MenuDataReceive(props: iMenuItems) {
    const validRecieve = useSelector((state: iValid) => state.valid.receive);
    
    return <MenuItem link={relPath() + "/receive"} 
        current={props.current} 
        title={i18n.t('dataReceive')} 
        mobile={props.mobile} 
        icon={<CloudArrowDown />} 
        valid={validRecieve} 
    />
}