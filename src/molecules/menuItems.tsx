import React from "react";
import { useSelector } from 'react-redux';
import { iMenuItems } from "../interfaces";
import { iValid } from "../redux/validTypes";
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
    const validConnect = useSelector((state: iValid) => state.valid.connect);
    const validAccesspoint = useSelector((state: iValid) => state.valid.accesspoint);

    return <>
        <MenuItem link="/" 
            current={props.current} 
            title={i18n.t('status')} 
            mobile={props.mobile} 
            icon={<InfoSVG />} 
            valid={true} 
        />

        <MenuItem link="#" 
            current={props.current} 
            title={i18n.t('network')} 
            mobile={props.mobile} 
            icon={<NetworkSVG />} 
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
        
        <MenuItem link="#" 
            current={props.current} 
            title={i18n.t('dataSource.plural')} 
            mobile={props.mobile} 
            icon={<SourceSVG />} 
            valid={true}
        >
            <MenuSubItem link="/sensors" 
                current={props.current} 
                title={i18n.t('sensor.plural')} 
                valid={true} 
            />
            {device() === 'WeatherMonitorBIM32' && 
                <MenuSubItem link="/wsensors" 
                    current={props.current} 
                    title={i18n.t('wirelessSensor.plural')} 
                    valid={true} 
                />
            }
            <MenuSubItem link="/weather" 
                current={props.current} 
                title={i18n.t('weatherForecast')} 
                valid={true} 
            />
        </MenuItem>

        <MenuItem link="/clock" 
            current={props.current} 
            title={i18n.t('clock')} 
            mobile={props.mobile} 
            icon={<ClockSVG />} 
            valid={true} 
        />

        {device() === 'WeatherMonitorBIM32' &&
            <MenuItem link="/alarm" 
                current={props.current} 
                title={i18n.t('alarm')} 
                mobile={props.mobile} 
                icon={<AlarmSVG />} 
                valid={true} 
            />
        }

        {device() === 'WeatherMonitorBIM' &&
            <MenuItem link="display" 
                current={props.current} 
                title={i18n.t('display.one')} 
                mobile={props.mobile} 
                icon={<DisplaySVG />} 
                valid={true} 
            />
        }

        {device() === 'WeatherMonitorBIM32' &&
            <MenuItem link="#" 
                current={props.current} 
                title={i18n.t('display.plural')} 
                mobile={props.mobile} 
                icon={<DisplaySVG />} 
                valid={true}
            >
                <MenuSubItem link="/display1" 
                    current={props.current} 
                    title={i18n.t('display.one') + " 1"} 
                    valid={true} 
                />
                <MenuSubItem link="/display2" 
                    current={props.current} 
                    title={i18n.t('display.one') + " 2"} 
                    valid={true} 
                />
            </MenuItem>
        }

        {device() === 'WeatherMonitorBIM32' &&
            <MenuItem link="/sound" 
                current={props.current} 
                title={i18n.t('sound')} 
                mobile={props.mobile} 
                icon={<SoundSVG />} 
                valid={true} 
            />
        }

        {device() === 'WeatherMonitorBIM32' &&
            <MenuItem link="/comfort" 
                current={props.current} 
                title={i18n.t('comfort')} 
                mobile={props.mobile} 
                icon={<ComfortSVG />} 
                valid={true} 
            />
        }

        {device() === 'WeatherMonitorBIM32' &&
            <MenuItem link="/history" 
                current={props.current} 
                title={i18n.t('weatherHistory')} 
                mobile={props.mobile} 
                icon={<HistorySVG />} 
                valid={true} 
            />
        }

        <MenuItem link="/send" 
            current={props.current} 
            title={i18n.t('dataSend')} 
            mobile={props.mobile} 
            icon={<SendSVG />}
            valid={true} 
        />

        <MenuItem link="/receive" 
            current={props.current} 
            title={i18n.t('dataReceive')} 
            mobile={props.mobile} 
            icon={<ReceiveSVG />} 
            valid={true} 
        />

        <MenuItem link="#" 
            current={props.current} 
            title={i18n.t('system')} 
            mobile={props.mobile} 
            icon={<SystemSVG />} 
            valid={true}
        >
            <MenuSubItem link="/backup" 
                current={props.current} 
                title={i18n.t('backup')} 
                valid={true} 
            />
            <MenuSubItem link="/default" 
                current={props.current} 
                title={i18n.t('defaultSettings')} 
                valid={true} 
            />
            <MenuSubItem link="/firmware" 
                current={props.current} 
                title={i18n.t('firmware')} 
                valid={true} 
            />
            <MenuSubItem link="/filesystem" 
                current={props.current} 
                title={i18n.t('fileSystem')} 
                valid={true} 
            />
        </MenuItem>
    </>
}

export default MenuItems;