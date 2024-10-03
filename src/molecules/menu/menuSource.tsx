import { useSelector } from 'react-redux';
import { iMenuItems } from "../../interfaces";
import { iValid } from "../../redux/validTypes";
import MenuItem from "../../atoms/menuItem";
import MenuSubItem from "../../atoms/menuSubItem";
import i18n from '../../i18n/main';
import device from '../../device';
import { Binary } from "@phosphor-icons/react";

export default function MenuSource(props: iMenuItems) {
    const validWsensors = useSelector((state: iValid) => state.valid.wsensors);
    
    return <MenuItem link="#" 
        current={props.current} 
        title={i18n.t('dataSource.plural')} 
        mobile={props.mobile} 
        icon={<Binary />} 
        valid={validWsensors}
    >
        <MenuSubItem link={"/sensors"} 
            current={props.current} 
            title={i18n.t('sensor.plural')} 
            valid={true} 
        />
        {device() === 'WeatherMonitorBIM32' && 
            <MenuSubItem link={"/wsensors"} 
                current={props.current} 
                title={i18n.t('wirelessSensor.plural')} 
                valid={validWsensors}
            />
        }
        <MenuSubItem link={"/weather"} 
            current={props.current} 
            title={i18n.t('weatherForecast')} 
            valid={true} 
        />
    </MenuItem>
}