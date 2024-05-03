import i18n from "../i18n/main";
import { useSelector } from 'react-redux';
import Card from "../atoms/card";
import { iConfig } from "../redux/configTypes";
import ComfortCo2Source from "../molecules/comfortCo2Source";
import ComfortCo2Rating from "../molecules/comfortCo2Rating";
import ComfortCo2Sound from "../molecules/comfortCo2Sound";
import ComfortAirExplicationsTable from "../molecules/comfortAirExplicationTable";
import "./cardComfort.scss";

export default function CardComfortCo2() {
    const config = useSelector((state: iConfig) => state.config);

    return <Card header={<div dangerouslySetInnerHTML={{ __html: i18n.t('CO2Level') }} />}
        content={<>
            {/* Sensor type */}
            <ComfortCo2Source />
                
            {<div className={'card-comfort ' + (config.comfort.co2.source > 0 ? 'show' : 'hide')}>
                {/* Comfort rating */}
                <ComfortCo2Rating />

                {/* Sound Notification */}
                <ComfortCo2Sound />

                {/* Explication table */}
                <ComfortAirExplicationsTable param={<div dangerouslySetInnerHTML={{ __html: i18n.t('CO2Level') }} />}
                    min={800}
                    max={1400}
                />
            </div>}
        </>} 
    />
}