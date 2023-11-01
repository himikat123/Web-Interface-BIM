import React from "react";
import { iMenuItems } from "../../interfaces";
import MenuItem from "../../atoms/menuItem/menuItem";
import MenuSubItem from "../../atoms/menuSubItem/menuSubItem";
import { ReactComponent as AlarmSVG } from '../../atoms/icons/alarm.svg';
import { ReactComponent as ClockSVG } from '../../atoms/icons/clock.svg';
import { ReactComponent as ComfortSVG } from '../../atoms/icons/comfort.svg';
import { ReactComponent as DisplaySVG } from '../../atoms/icons/display.svg';
import { ReactComponent as HistorySVG } from '../../atoms/icons/history.svg';
import { ReactComponent as InfoSVG } from '../../atoms/icons/info.svg';
import { ReactComponent as NetworkSVG } from '../../atoms/icons/network.svg';
import { ReactComponent as ReceiveSVG } from '../../atoms/icons/receive.svg';
import { ReactComponent as SendSVG } from '../../atoms/icons/send.svg';
import { ReactComponent as SoundSVG } from '../../atoms/icons/sound.svg';
import { ReactComponent as SourceSVG } from '../../atoms/icons/source.svg';
import { ReactComponent as SystemSVG } from '../../atoms/icons/system.svg';

export default (props: iMenuItems) => {
    return <>
        <MenuItem link="/" current={props.current} title="Status" mobile={props.mobile} icon={<InfoSVG />} />

        <MenuItem link="#" current={props.current} title="Network" mobile={props.mobile} icon={<NetworkSVG />}>
            <MenuSubItem link="/connect" current={props.current} title="Connections" num={0} />
            <MenuSubItem link="/accesspoint" current={props.current} title="Access point" num={1} />
        </MenuItem>
        
        <MenuItem link="#" current={props.current} title="Data sources" mobile={props.mobile} icon={<SourceSVG />}>
            <MenuSubItem link="/sensors" current={props.current} title="Sensors" num={0} />
            <MenuSubItem link="/wsensors" current={props.current} title="Wireless sensors" num={1} />
            <MenuSubItem link="/weather" current={props.current} title="Weather forecasr" num={2} />
        </MenuItem>

        <MenuItem link="/clock" current={props.current} title="Clock" mobile={props.mobile} icon={<ClockSVG />} />

        <MenuItem link="/alarm" current={props.current} title="Alarm" mobile={props.mobile} icon={<AlarmSVG />} />

        <MenuItem link="#" current={props.current} title="Displays" mobile={props.mobile} icon={<DisplaySVG />}>
            <MenuSubItem link="/display1" current={props.current} title="Display 1" num={0} />
            <MenuSubItem link="/display2" current={props.current} title="Display 2" num={1} />
        </MenuItem>

        <MenuItem link="/sound" current={props.current} title="Sound" mobile={props.mobile} icon={<SoundSVG />} />

        <MenuItem link="/comfort" current={props.current} title="Comfort" mobile={props.mobile} icon={<ComfortSVG />} />

        <MenuItem link="/history" current={props.current} title="Weather history" mobile={props.mobile} icon={<HistorySVG />} />

        <MenuItem link="/send" current={props.current} title="Data send" mobile={props.mobile} icon={<SendSVG />} />

        <MenuItem link="/receive" current={props.current} title="Data receive" mobile={props.mobile} icon={<ReceiveSVG />} />

        <MenuItem link="#" current={props.current} title="System" mobile={props.mobile} icon={<SystemSVG />}>
            <MenuSubItem link="/backup" current={props.current} title="Backup" num={0} />
            <MenuSubItem link="/default" current={props.current} title="Default settings" num={1} />
            <MenuSubItem link="/firmware" current={props.current} title="Firmware" num={2} />
            <MenuSubItem link="/filesystem" current={props.current} title="Filesystem" num={3} />
        </MenuItem>       
    </>
}