import { useSelector } from 'react-redux';
import { iMenuItems } from "../interfaces";
import { iConfig } from "../redux/configTypes";
import MenuItem from "../atoms/menuItem";
import MenuSubItem from "../atoms/menuSubItem";
import i18n from '../i18n/main';
import { Gear } from "@phosphor-icons/react";
import { ReactComponent as FlagEN } from '../atoms/icons/flagEN.svg';
import { ReactComponent as FlagDE } from '../atoms/icons/flagDE.svg';
import { ReactComponent as FlagRU } from '../atoms/icons/flagRU.svg';
import { ReactComponent as FlagPL } from '../atoms/icons/flagPL.svg';
import { ReactComponent as FlagUA } from '../atoms/icons/flagUA.svg';
import { ReactComponent as FlagBG } from '../atoms/icons/flagBG.svg';

export default function MenuSystem(props: iMenuItems) {
    const config = useSelector((state: iConfig) => state.config);
        
    return <MenuItem link="#" 
        current={props.current} 
        title={i18n.t('system')} 
        mobile={props.mobile} 
        icon={<Gear />} 
        valid={true}
    >
        <MenuSubItem link={"/language"} 
            current={props.current} 
            title={
                <div className="flex items-center">
                    {i18n.t('language')}
                    <div className="w-[31px] h-[24px] border ms-4 lang">
                        {config.lang === 'en' && <FlagEN />}
                        {config.lang === 'de' && <FlagDE />}
                        {config.lang === 'ru' && <FlagRU />}
                        {config.lang === 'pl' && <FlagPL />}
                        {config.lang === 'ua' && <FlagUA />}
                        {config.lang === 'bg' && <FlagBG />}
                    </div>
                </div>} 
            valid={true} 
        />
            
        <hr className="m-2" />
        
        <MenuSubItem link={"/backup"} 
            current={props.current} 
            title={i18n.t('backup')} 
            valid={true} 
        />

        <MenuSubItem link={"/default"} 
            current={props.current} 
            title={i18n.t('defaultSettings')} 
            valid={true} 
        />
        
        <MenuSubItem link={"/filesystem"} 
            current={props.current} 
            title={i18n.t('fileSystem')} 
            valid={true} 
        />
        
    </MenuItem>
}