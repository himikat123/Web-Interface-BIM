import i18n from "../i18n/main";
import { useSelector } from 'react-redux';
import Card from "../atoms/card";
import ComfortTempSource from "../molecules/comfortTempSource";
import ComfortTempRating from "../molecules/comfortTempRating";
import ComfortTempSound from "../molecules/comfortTempSound";
import ComfortTempMax from "./comfortTempMax";
import ComfortTempMin from "./comfortTempMin";
import { iConfig } from "../redux/configTypes";
import "./cardComfort.scss";

export default function CardComfortTemp() {
    const config = useSelector((state: iConfig) => state.config);

    return <Card header={i18n.t('temperature')}
        content={<>
            {/* Temperature source */}
            <ComfortTempSource />

            {<div className={'card-comfort ' + (config.comfort.temp.source > 0 ? 'show' : 'hide')}>
                {/* Comfort rating */}
                <ComfortTempRating />

                {/* Sound Notification */}
                <ComfortTempSound />

                {/* Max temperature */}
                <ComfortTempMax />

                <hr className="mt-8 mb-6 border-menu_light dark:border-menu_dark" />

                {/* Min temperature */}
                <ComfortTempMin />
            </div>}
        </>} 
    />
}