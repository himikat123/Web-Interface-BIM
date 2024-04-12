import { useSelector } from 'react-redux';
import { iMenuItems } from "../interfaces";
import { iValid } from "../redux/validTypes";
import MenuItem from "../atoms/menuItem";
import MenuSubItem from "../atoms/menuSubItem";
import i18n from '../i18n/main';
import { WifiHigh } from "@phosphor-icons/react";

const MenuNetwork = (props: iMenuItems) => {
    const validConnect = useSelector((state: iValid) => state.valid.connect);
    const validAccesspoint = useSelector((state: iValid) => state.valid.accesspoint);

    return <MenuItem link="#" 
        current={props.current} 
        title={i18n.t('network')} 
        mobile={props.mobile} 
        icon={<WifiHigh />} 
        valid={validConnect && validAccesspoint}
    >
        <MenuSubItem link="/connect" 
            current={props.current} 
            title={i18n.t('connections')} 
            valid={validConnect} 
        />
        <MenuSubItem link="/accesspoint" 
            current={props.current} 
            title={i18n.t('accessPoint')} 
            valid={validAccesspoint} 
        />
    </MenuItem>
}

export default MenuNetwork;