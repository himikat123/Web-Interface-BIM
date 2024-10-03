import { useSelector } from 'react-redux';
import { iMenuItems } from "../../interfaces";
import { iValid } from "../../redux/validTypes";
import MenuItem from "../../atoms/menuItem";
import i18n from '../../i18n/main';
import { Monitor } from "@phosphor-icons/react";

export default function MenuDisplaySingle(props: iMenuItems) {
    const validDisplay1 = useSelector((state: iValid) => state.valid.display1);

    return <MenuItem link={"/display"} 
        current={props.current} 
        title={i18n.t('display.one')} 
        mobile={props.mobile} 
        icon={<Monitor />} 
        valid={validDisplay1} 
    />
}