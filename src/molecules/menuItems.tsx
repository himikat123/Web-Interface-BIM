import React from "react";

import { iMenuItems } from "../interfaces";
import MenuItem from "../atoms/menuItem";
import MenuSubItem from "../atoms/menuSubItem";
import i18n from '../i18n/main';
import device from '../device';

import { ReactComponent as AlarmSVG } from '../atoms/icons/alarm.svg';
import { ReactComponent as ClockSVG } from '../atoms/icons/clock.svg';
import { ReactComponent as ComfortSVG } from '../atoms/icons/comfort.svg';
import { ReactComponent as DisplaySVG } from '../atoms/icons/display.svg';
import { ReactComponent as HistorySVG } from '../atoms/icons/history.svg';
import { ReactComponent as InfoSVG } from '../atoms/icons/info.svg';
import { ReactComponent as NetworkSVG } from '../atoms/icons/network.svg';
import { ReactComponent as ReceiveSVG } from '../atoms/icons/receive.svg';
import { ReactComponent as SendSVG } from '../atoms/icons/send.svg';
import { ReactComponent as SoundSVG } from '../atoms/icons/sound.svg';
import { ReactComponent as SourceSVG } from '../atoms/icons/source.svg';
import { ReactComponent as SystemSVG } from '../atoms/icons/system.svg';

const MenuItems = (props: iMenuItems) => {
    return <>
        <MenuItem link="/" current={props.current} title={i18n.t('status')} mobile={props.mobile} icon={<InfoSVG />} />

        <MenuItem link="#" current={props.current} title={i18n.t('network')} mobile={props.mobile} icon={<NetworkSVG />}>
            <MenuSubItem link="/connect" current={props.current} title={i18n.t('connections')} num={0} />
            <MenuSubItem link="/accesspoint" current={props.current} title={i18n.t('accessPoint')} num={1} />
        </MenuItem>
        
        <MenuItem link="#" current={props.current} title={i18n.t('dataSource.plural')} mobile={props.mobile} icon={<SourceSVG />}>
            <MenuSubItem link="/sensors" current={props.current} title={i18n.t('sensor.plural')} num={0} />
            {device() === 'WeatherMonitorBIM32' && 
                <MenuSubItem link="/wsensors" current={props.current} title={i18n.t('wirelessSensor.plural')} num={1} />
            }
            <MenuSubItem link="/weather" current={props.current} title={i18n.t('weatherForecast')} num={2} />
        </MenuItem>

        <MenuItem link="/clock" current={props.current} title={i18n.t('clock')} mobile={props.mobile} icon={<ClockSVG />} />

        {device() === 'WeatherMonitorBIM32' &&
            <MenuItem link="/alarm" current={props.current} title={i18n.t('alarm')} mobile={props.mobile} icon={<AlarmSVG />} />
        }

        {device() === 'WeatherMonitorBIM' &&
            <MenuItem link="display" current={props.current} title={i18n.t('display.one')} mobile={props.mobile} icon={<DisplaySVG />} />
        }

        {device() === 'WeatherMonitorBIM32' &&
            <MenuItem link="#" current={props.current} title={i18n.t('display.plural')} mobile={props.mobile} icon={<DisplaySVG />}>
                <MenuSubItem link="/display1" current={props.current} title={i18n.t('display.one') + " 1"} num={0} />
                <MenuSubItem link="/display2" current={props.current} title={i18n.t('display.one') + " 2"} num={1} />
            </MenuItem>
        }

        {device() === 'WeatherMonitorBIM32' &&
            <MenuItem link="/sound" current={props.current} title={i18n.t('sound')} mobile={props.mobile} icon={<SoundSVG />} />
        }

        {device() === 'WeatherMonitorBIM32' &&
            <MenuItem link="/comfort" current={props.current} title={i18n.t('comfort')} mobile={props.mobile} icon={<ComfortSVG />} />
        }

        {device() === 'WeatherMonitorBIM32' &&
            <MenuItem link="/history" current={props.current} title={i18n.t('weatherHistory')} mobile={props.mobile} icon={<HistorySVG />} />
        }

        <MenuItem link="/send" current={props.current} title={i18n.t('dataSend')} mobile={props.mobile} icon={<SendSVG />} />

        <MenuItem link="/receive" current={props.current} title={i18n.t('dataReceive')} mobile={props.mobile} icon={<ReceiveSVG />} />

        <MenuItem link="#" current={props.current} title={i18n.t('system')} mobile={props.mobile} icon={<SystemSVG />}>
            <MenuSubItem link="/backup" current={props.current} title={i18n.t('backup')} num={0} />
            <MenuSubItem link="/default" current={props.current} title={i18n.t('defaultSettings')} num={1} />
            <MenuSubItem link="/firmware" current={props.current} title={i18n.t('firmware')} num={2} />
            <MenuSubItem link="/filesystem" current={props.current} title={i18n.t('fileSystem')} num={3} />
        </MenuItem>
    </>
}

export default MenuItems;