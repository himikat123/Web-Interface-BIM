import i18n from "../i18n/main";
import { useSelector } from 'react-redux';
import Card from "../atoms/card";
import ComfortTempSource from "../molecules/comfortTempSource";
import comfortTempRating from "../molecules/comfortTempRating";
import ComfortTempSound from "../molecules/comfortTempSound";
import ComfortTempMax from "./comfortTempMax";
import ComfortTempMin from "./comfortTempMin";
import Indication from "../atoms/indication";
import { iConfig } from "../redux/configTypes";
import "./cardComfort.scss";

export default function CardComfortTemp() {
    const config = useSelector((state: iConfig) => state.config);
    const comfRating = comfortTempRating();
    let comfort = '--';
    if(comfRating === 0) comfort = i18n.t('comfortable');
    if(comfRating === 1) comfort = i18n.t('tooHot');
    if(comfRating === 2) comfort = i18n.t('tooCold');

    return <Card header={i18n.t('temperature')}
        content={<>
            {/* Temperature source */}
            <ComfortTempSource />

            {<div className={'card-comfort ' + (config.comfort.temp.source > 0 ? 'show' : 'hide')}>
                {/* Comfort rating */}
                <div className="mt-6">
                    <Indication error={false} value={comfort} />
                </div>

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