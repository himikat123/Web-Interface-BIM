import { changeLanguage } from '../i18n/main';
import i18n from '../i18n/main';
import { SmileySad } from '@phosphor-icons/react';

const PageNotFound = () => {
    changeLanguage(localStorage.lang);

    return <div className="flex justify-center items-center w-full h-screen">
        <div className="border-2 border-menu_light dark:border-menu_dark bg-card_light dark:bg-card_dark rounded-lg p-4 m-4 max-w-xl w-full">
            <h1 className="text-xl text-center mb-8">{i18n.t('error404')}</h1>
            <div className="flex flex-col justify-center items-center h-36">
                <SmileySad weight="fill" size={100} />
                <div className="mt-8 text-center">{i18n.t('pageNotFound')}</div>
            </div>
        </div>
    </div>
}

export default PageNotFound;