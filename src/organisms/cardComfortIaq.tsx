import i18n from "../i18n/main";
import { useSelector } from 'react-redux';
import Card from "../atoms/card";
import { iConfig } from "../redux/configTypes";
import ComfortIaqSource from "../molecules/comfortIaqSource";
import ComfortIaqRating from "../molecules/comfortIaqRating";
import ComfortIaqSound from "../molecules/comfortIaqSound";
import ComfortAirExplicationsTable from "../molecules/comfortAirExplicationTable";
import "./cardComfort.scss";

export default function CardComfortAirQuality() {
    const config = useSelector((state: iConfig) => state.config);

    return <Card header={i18n.t('indexForAirQuality')}
        content={<>
            {/* Sensor type */}
            <ComfortIaqSource />

            {<div className={'card-comfort ' + (config.comfort.iaq.source > 0 ? 'show' : 'hide')}>
                {/* Comfort rating */}
                <ComfortIaqRating />

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