import i18n from '../i18n/main';
import StepsAnimation from '../atoms/stepsAnimation';

export default function Loading() {
    return <div className="flex justify-center items-center w-full h-screen">
        <div className="border-2 border-menu_light dark:border-menu_dark bg-card_light dark:bg-card_dark rounded-lg p-4 m-4 max-w-xl w-full">
            <h1 className="text-xl text-center mb-8">{i18n.t('loading')}</h1>
            <div className="flex justify-center h-24">
                <StepsAnimation />
            </div>
        </div>
    </div>
}