import TwoColumns from "../templates/twoColumns";
import { useSelector, useDispatch } from 'react-redux';
import { languageSwitch, unitsPresChange } from '../redux/slices/config';
import SelectSwitch from "../atoms/selectSwitch";
import i18n, { changeLanguage } from '../i18n/main';
import Card from "../atoms/card";
import RadioSwitch from "../atoms/radioSwitch";
import { ReactComponent as FlagEN } from '../atoms/icons/flagEN.svg';
import { ReactComponent as FlagDE } from '../atoms/icons/flagDE.svg';
import { ReactComponent as FlagRU } from '../atoms/icons/flagRU.svg';
import { ReactComponent as FlagPL } from '../atoms/icons/flagPL.svg';
import { ReactComponent as FlagUA } from '../atoms/icons/flagUA.svg';
import { ReactComponent as FlagBG } from '../atoms/icons/flagBG.svg';
import { ReactComponent as FlagES } from '../atoms/icons/flagES.svg';
import { iConfig } from "../redux/configTypes";

export default function Language() {
    const language = useSelector((state: iConfig) => state.config.lang);
    const unitsPres = useSelector((state: iConfig) => state.config.units.pres);
    const dispatch = useDispatch();

    const content = <>
        <Card header={i18n.t('language')}
            content={<>
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

                <RadioSwitch id="bg" 
                    name="language" 
                    checked={language === 'bg'} 
                    onChange={() => {
                        changeLanguage('bg');
                        dispatch(languageSwitch('bg')); 
                    }} 
                    label="Български"
                    icon={<FlagBG />}
                />

                <RadioSwitch id="es" 
                    name="language" 
                    checked={language === 'es'} 
                    onChange={() => {
                        changeLanguage('es');
                        dispatch(languageSwitch('es')); 
                    }} 
                    label="Español (México)"
                    icon={<FlagES />}
                />
            </>} 
        />

        <Card header={i18n.t('units.measurement')} 
            content={<>
                <div className="mt-8">
                    <SelectSwitch label={i18n.t('pressure')}
                        options={[i18n.t('units.mm'), i18n.t('units.hpa')]}
                        value={unitsPres}
                        onChange={val => dispatch(unitsPresChange(val))}
                    />
                </div>
            </>} 
        />
    </>

    return <TwoColumns header={[i18n.t('localization')]} 
        content={[content]} 
        navbar={true} 
        buttons={['save', 'reset']} 
    />
}