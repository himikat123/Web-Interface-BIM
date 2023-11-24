import React from "react";
import OneColumn from "../templates/oneColumn";
import { useSelector, useDispatch } from 'react-redux';
import { languageSwitch } from '../redux/slices/language';
import i18n, { changeLanguage } from '../i18n/main';
import Card from "../atoms/card";
import RadioSwitch from "../atoms/radioSwitch";
import { ReactComponent as AccountSVG } from '../atoms/icons/account.svg';

const Language = () => {
    const language = useSelector((state: any) => state.language.lang);
    const dispatch = useDispatch();

    const content = <Card content={<>
        <RadioSwitch id="en" 
          name="language" 
          checked={language == 'en'} 
          onChange={() => {
            changeLanguage('en');
            dispatch(languageSwitch('en'));
          }} 
          label="English"
          icon={<AccountSVG />}
        />

        <RadioSwitch id="de" 
          name="language" 
          checked={language == 'de'} 
          onChange={() => {
            changeLanguage('de');
            dispatch(languageSwitch('de')); 
          }} 
          label="Deutsch"
          icon={<AccountSVG />}
        />

        <RadioSwitch id="ru" 
          name="language" 
          checked={language == 'ru'} 
          onChange={() => {
            changeLanguage('ru');
            dispatch(languageSwitch('ru')); 
          }} 
          label="Русский"
          icon={<AccountSVG />}
        />

        <RadioSwitch id="pl" 
          name="language" 
          checked={language == 'pl'} 
          onChange={() => {
            changeLanguage('pl');
            dispatch(languageSwitch('pl')); 
          }} 
          label="Polski"
          icon={<AccountSVG />}
        />

        <RadioSwitch id="ua" 
          name="language" 
          checked={language == 'ua'} 
          onChange={() => {
            changeLanguage('ua');
            dispatch(languageSwitch('ua')); 
          }} 
          label="Українська"
          icon={<AccountSVG />}
        />
    </>} />;

    return (<>
        <OneColumn header={i18n.t('language')} content={content} navbar={true} />
    </>);
}

export default Language;