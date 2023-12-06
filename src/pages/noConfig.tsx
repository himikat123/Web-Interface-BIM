import React from 'react';
import i18n from '../i18n/main';
import Button from '../atoms/button';
import { ReactComponent as ErrorSVG } from '../atoms/icons/error.svg';

const NoConfig = () => {
    return <div className="flex justify-center items-center w-full h-screen">
        <div className="border-2 border-menu_light dark:border-menu_dark bg-card_light dark:bg-card_dark rounded-lg p-4 max-w-xl w-full">
            <h1 className="text-xl text-center mb-8">{i18n.t('configError')}</h1>
            <div className="flex flex-col justify-center h-36">
                <ErrorSVG />
                <div className="mt-8 text-center">
                    <Button 
                        className="bg-red-500 hover:bg-red-700 text-text_dark"
                        label={i18n.t('tryAgain')}
                        onClick={() => {window.location.reload()}}
                    />
                </div>
            </div>
        </div>
    </div>
}

export default NoConfig;