import i18n from "../i18n/main";
import { useSelector } from 'react-redux';
import Card from "../atoms/card";
import { iConfig } from "../redux/configTypes";
import ComfortHumSource from "../molecules/comfortHumSource";
import ComfortHumRating from "../molecules/comfortHumRating";
import ComfortHumSound from "../molecules/comfortHumSound";
import ComfortHumMax from "./comfortHumMax";
import ComfortHumMin from "./comfortHumMin";

export default function CardComfortHum() {
    const config = useSelector((state: iConfig) => state.config);

    return <Card header={i18n.t('humidity')}
        content={<>
            {/* Humidity source */}
            <ComfortHumSource />

            {<div className={'card-comfort ' + (config.comfort.hum.source > 0 ? 'show' : 'hide')}>
                {/* Comfort rating */}
                <ComfortHumRating />

                {/* Sound Notification */}
                <ComfortHumSound />

                {/* Max humidity */}
                <ComfortHumMax />

                <hr className="mt-8 mb-6 border-menu_light dark:border-menu_dark" />

                {/* Min Humidity */}
                <ComfortHumMin />
            </div>}
        </>} 
    />
}