import { iMenuItems } from "../interfaces";
import device from '../device';
import MenuStatus from "../molecules/menuStatus";
import MenuNetwork from "../molecules/menuNetwork";
import MenuSource from "../molecules/menuSource";
import MenuClock from "../molecules/menuClock";
import MenuAlarm from "../molecules/menuAlarm";
import MenuDisplaySingle from "../molecules/menuDisplaySingle";
import MenuDisplaysSeveral from "../molecules/menuDisplaysSeveral";
import MenuSound from "../molecules/menuSound";
import MenuComfort from "../molecules/menuComfort";
import MenuHistory from "../molecules/menuHistory";
import MenuDataSend from "../molecules/menuDataSend";
import MenuDataReceive from "../molecules/menuDataReceive";
import MenuSystem from '../molecules/menuSystem';

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
        {device() === 'WeatherMonitorBIM32' && <MenuComfort current={props.current} mobile={props.mobile} />}
        {device() === 'WeatherMonitorBIM32' && <MenuHistory current={props.current} mobile={props.mobile} />}
        <MenuDataSend current={props.current} mobile={props.mobile} />
        <MenuDataReceive current={props.current} mobile={props.mobile} />
        <MenuSystem current={props.current} mobile={props.mobile} />
    </>
}