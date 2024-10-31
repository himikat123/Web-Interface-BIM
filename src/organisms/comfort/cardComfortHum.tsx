import i18n from "../../i18n/main";
import { useSelector } from 'react-redux';
import device from "../../device";
import Card from "../../atoms/card";
import ComfortHumSource from "../../molecules/comfort/comfortHumSource";
import comfortHumRating from "../../molecules/comfort/comfortHumRating";
import ComfortHumSound from "../../molecules/comfort/comfortHumSound";
import ComfortHumMax from "./comfortHumMax";
import ComfortHumMin from "./comfortHumMin";
import Indication from "../../atoms/indication";
import { iConfig } from "../../redux/configTypes";
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
                {device() === 'WeatherMonitorBIM32' && <ComfortHumSound />}

                {/* Max humidity */}
                <ComfortHumMax />

                {device() === 'WeatherMonitorBIM32' && <hr className="mt-8 mb-6 border-menu_light dark:border-menu_dark" />}

                {/* Min Humidity */}
                <ComfortHumMin />
            </div>}
        </>} 
    />
}