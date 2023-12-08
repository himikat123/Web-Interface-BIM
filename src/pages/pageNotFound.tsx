import React from 'react';
import { changeLanguage } from '../i18n/main';
import i18n from '../i18n/main';
import Button from '../atoms/button';
import { ReactComponent as SmileSadSVG } from '../atoms/icons/smileSad.svg';

const PageNotFound = () => {
    changeLanguage(localStorage.lang);

    return <div className="flex justify-center items-center w-full h-screen">
        <div className="border-2 border-menu_light dark:border-menu_dark bg-card_light dark:bg-card_dark rounded-lg p-4 m-4 max-w-xl w-full">
            <h1 className="text-xl text-center mb-8">{i18n.t('error404')}</h1>
            <div className="flex flex-col justify-center h-36">
                <SmileSadSVG />
                <div className="mt-8 text-center">{i18n.t('pageNotFound')}</div>
            </div>
        </div>
    </div>
}

export default PageNotFound;