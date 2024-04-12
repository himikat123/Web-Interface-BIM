import { useSelector } from 'react-redux';
import { iMenuItems } from "../interfaces";
import { iValid } from "../redux/validTypes";
import MenuItem from "../atoms/menuItem";
import i18n from '../i18n/main';
import { ChartLineUp } from "@phosphor-icons/react";

export default function MenuHistory(props: iMenuItems) {
    const validHistory = useSelector((state: iValid) => state.valid.history);

    return <MenuItem link="/history" 
        current={props.current} 
        title={i18n.t('weatherHistory')} 
        mobile={props.mobile} 
        icon={<ChartLineUp />} 
        valid={validHistory} 
    />
}