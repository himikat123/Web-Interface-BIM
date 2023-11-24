import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { languageSwitch } from '../redux/slices/language';
import i18n, { changeLanguage } from '../i18n/main';

const LangSwitcher = () => {
    const language = useSelector((state: any) => state.language.lang);
    const dispatch = useDispatch();
    // i18n.onChange(e => console.log(e));

    return (
        <div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => {
                changeLanguage('en');
                dispatch(languageSwitch('en')); 
              }}
            >
                {console.log(i18n.t('alarm'))} {language}
            </button>
            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => {
                changeLanguage('de');
                dispatch(languageSwitch('de'));
              }}
            >
                De
            </button>
        </div>
    );
}

export default LangSwitcher;