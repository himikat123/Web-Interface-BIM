import { iMenuItems } from "../interfaces";
import device from '../device';
import MenuStatus from "../molecules/menu/menuStatus";
import MenuNetwork from "../molecules/menu/menuNetwork";
import MenuSource from "../molecules/menu/menuSource";
import MenuClock from "../molecules/menu/menuClock";
import MenuAlarm from "../molecules/menu/menuAlarm";
import MenuDisplaySingle from "../molecules/menu/menuDisplaySingle";
import MenuDisplaysSeveral from "../molecules/menu/menuDisplaysSeveral";
import MenuSound from "../molecules/menu/menuSound";
import MenuComfort from "../molecules/menu/menuComfort";
import MenuHistory from "../molecules/menu/menuHistory";
import MenuDataSend from "../molecules/menu/menuDataSend";
import MenuDataReceive from "../molecules/menu/menuDataReceive";
import MenuSystem from '../molecules/menu/menuSystem';

export default function MenuItems(props: iMenuItems) {
    return <>
        <MenuStatus current={props.current} mobile={props.mobile} />
        <MenuNetwork current={props.current} mobile={props.mobile} />
        <MenuSource current={props.current} mobile={props.mobile} />
        <MenuClock current={props.current} mobile={props.mobile} />
        {device() === 'WeatherMonitorBIM32' && <MenuAlarm current={props.current} mobile={props.mobile} />}
        {device() === 'WeatherMonitorBIM' && <MenuDisplaySingle current={props.current} mobile={props.mobile} />}
        {device() === 'WeatherMonitorBIM32' && <MenuDisplaysSeveral current={props.current} mobile={props.mobile} />}
        {device() === 'WeatherMonitorBIM32' && <MenuSound current={props.current} mobile={props.mobile} />}
        <MenuComfort current={props.current} mobile={props.mobile} />
        {device() === 'WeatherMonitorBIM32' && <MenuHistory current={props.current} mobile={props.mobile} />}
        <MenuDataSend current={props.current} mobile={props.mobile} />
        <MenuDataReceive current={props.current} mobile={props.mobile} />
        <MenuSystem current={props.current} mobile={props.mobile} />
    </>
}