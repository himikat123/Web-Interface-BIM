import { useSelector } from 'react-redux';
import { iMenuItems } from "../interfaces";
import { iValid } from "../redux/validTypes";
import MenuItem from "../atoms/menuItem";
import MenuSubItem from "../atoms/menuSubItem";
import i18n from '../i18n/main';
import { Monitor } from "@phosphor-icons/react";

export default function MenuDisplaysSeveral(props: iMenuItems) {
    const validDisplay1 = useSelector((state: iValid) => state.valid.display1);
    const validDisplay2 = useSelector((state: iValid) => state.valid.display2);

    return <MenuItem link="#" 
        current={props.current} 
        title={i18n.t('display.plural')} 
        mobile={props.mobile} 
        icon={<Monitor />} 
        valid={validDisplay1}
    >
        <MenuSubItem link={"/display1"} 
            current={props.current} 
            title={`${i18n.t('display.singular')} 1`} 
            valid={validDisplay1 && validDisplay2} 
        />
        <MenuSubItem link={"/display2"} 
            current={props.current} 
            title={`${i18n.t('display.singular')} 2`} 
            valid={validDisplay2} 
        />
    </MenuItem>
}