import i18n from "../i18n/main";
import { useSelector } from 'react-redux';
import Card from "../atoms/card";
import ComfortHumSource from "../molecules/comfortHumSource";
import comfortHumRating from "../molecules/comfortHumRating";
import ComfortHumSound from "../molecules/comfortHumSound";
import ComfortHumMax from "./comfortHumMax";
import ComfortHumMin from "./comfortHumMin";
import Indication from "../atoms/indication";
import { iConfig } from "../redux/configTypes";
import "./cardComfort.scss";

export default function CardComfortHum() {
    const config = useSelector((state: iConfig) => state.config);
    const comfRating = comfortHumRating();
    let comfort = '--';
    if(comfRating === 0) comfort = i18n.t('comfortable');
    if(comfRating === 1) comfort = i18n.t('tooHumid');
    if(comfRating === 2) comfort = i18n.t('tooDry');

    return <Card header={i18n.t('humidity')}
        content={<>
            {/* Humidity source */}
            <ComfortHumSource />

            {<div className={'card-comfort ' + (config.comfort.hum.source > 0 ? 'show' : 'hide')}>
                {/* Comfort rating */}
                <div className="mt-6">
                    <Indication error={false} value={comfort} />
                </div>

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