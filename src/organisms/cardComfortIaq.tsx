import i18n from "../i18n/main";
import { useSelector } from 'react-redux';
import Card from "../atoms/card";
import ComfortIaqSource from "../molecules/comfortIaqSource";
import comfortIaqRating from "../molecules/comfortIaqRating";
import ComfortIaqSound from "../molecules/comfortIaqSound";
import ComfortAirExplicationsTable from "../molecules/comfortAirExplicationTable";
import Indication from "../atoms/indication";
import { iConfig } from "../redux/configTypes";
import "./cardComfort.scss";

export default function CardComfortAirQuality() {
    const config = useSelector((state: iConfig) => state.config);
    const comfRating = comfortIaqRating();
    let comfort = '--';
    if(comfRating === 0) comfort = i18n.t('cleanAir');
    if(comfRating === 1) comfort = i18n.t('polutedAir');
    if(comfRating === 2) comfort = i18n.t('havilyPolutedAir');

    return <Card header={i18n.t('indexForAirQuality')}
        content={<>
            {/* Sensor type */}
            <ComfortIaqSource />

            {<div className={'card-comfort ' + (config.comfort.iaq.source > 0 ? 'show' : 'hide')}>
                {/* Comfort rating */}
                <div className="mt-6">
                    <Indication error={false} value={comfort} />
                </div>

                {/* Sound Notification */}
                <ComfortIaqSound />

                {/* Explication table */}
                <ComfortAirExplicationsTable param={i18n.t('indexForAirQuality')} 
                    min={100}
                    max={200}
                />
            </div>}
        </>} 
    />
}