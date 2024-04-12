import OneColumn from "../templates/oneColumn";
import { useSelector, useDispatch } from 'react-redux';
import { languageSwitch } from '../redux/slices/config';
import i18n, { changeLanguage } from '../i18n/main';
import Card from "../atoms/card";
import RadioSwitch from "../atoms/radioSwitch";
import { ReactComponent as FlagEN } from '../atoms/icons/flagEN.svg';
import { ReactComponent as FlagDE } from '../atoms/icons/flagDE.svg';
import { ReactComponent as FlagRU } from '../atoms/icons/flagRU.svg';
import { ReactComponent as FlagPL } from '../atoms/icons/flagPL.svg';
import { ReactComponent as FlagUA } from '../atoms/icons/flagUA.svg';
import { iConfig } from "../redux/configTypes";

export default function Language() {
    const language = useSelector((state: iConfig) => state.config.lang);
    const dispatch = useDispatch();

    const content = <Card content={<>
        <RadioSwitch id="en" 
            name="language" 
            checked={language === 'en'} 
            onChange={() => {
                changeLanguage('en');
                dispatch(languageSwitch('en'));
            }} 
            label="English"
            icon={<FlagEN />}
        />

        <RadioSwitch id="de" 
            name="language" 
            checked={language === 'de'} 
            onChange={() => {
                changeLanguage('de');
                dispatch(languageSwitch('de')); 
            }} 
            label="Deutsch"
            icon={<FlagDE />}
        />

        <RadioSwitch id="ru" 
            name="language" 
            checked={language === 'ru'} 
            onChange={() => {
                changeLanguage('ru');
                dispatch(languageSwitch('ru')); 
            }} 
            label="Русский"
            icon={<FlagRU />}
        />

        <RadioSwitch id="pl" 
            name="language" 
            checked={language === 'pl'} 
            onChange={() => {
                changeLanguage('pl');
                dispatch(languageSwitch('pl')); 
            }} 
            label="Polski"
            icon={<FlagPL />}
        />

        <RadioSwitch id="ua" 
            name="language" 
            checked={language === 'ua'} 
            onChange={() => {
                changeLanguage('ua');
                dispatch(languageSwitch('ua')); 
            }} 
            label="Українська"
            icon={<FlagUA />}
        />
    </>} />;

    return <OneColumn header={[i18n.t('language')]} 
        content={[content]} 
        navbar={true} 
        buttons={['save', 'reset']} 
    />
}