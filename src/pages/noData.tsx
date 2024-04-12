import i18n from '../i18n/main';
import StepsAnimation from '../atoms/stepsAnimation';

export default function NoData() {
    return <div className="flex justify-center items-center w-full h-screen">
        <div className="border-2 border-menu_light dark:border-menu_dark bg-card_light dark:bg-card_dark rounded-lg p-4 mx-4 max-w-xl w-full">
            <h1 className="text-xl text-center mb-8">{i18n.t('networkError')}</h1>
            <div className="flex flex-col items-center h-24">
                <StepsAnimation />
                <div className="mt-4">
                    {i18n.t('tryToReconnect')}
                </div>
            </div>
        </div>
    </div>
}