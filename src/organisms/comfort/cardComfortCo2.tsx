import i18n from "../../i18n/main";
import { useSelector } from 'react-redux';
import Card from "../../atoms/card";
import ComfortCo2Source from "../../molecules/comfort/comfortCo2Source";
import comfortCo2Rating from "../../molecules/comfort/comfortCo2Rating";
import ComfortCo2Sound from "../../molecules/comfort/comfortCo2Sound";
import ComfortAirExplicationsTable from "../../molecules/comfort/comfortAirExplicationTable";
import Indication from "../../atoms/indication";
import { iConfig } from "../../redux/configTypes";
import "./cardComfort.scss";

export default function CardComfortCo2() {
    const config = useSelector((state: iConfig) => state.config);
    const comfRating = comfortCo2Rating();
    const source = config.comfort.co2?.source ?? 0;
    let comfort = '--';
    if(comfRating === 0) comfort = i18n.t('cleanAir');
    if(comfRating === 1) comfort = i18n.t('polutedAir');
    if(comfRating === 2) comfort = i18n.t('havilyPolutedAir');

    return <Card header={<div dangerouslySetInnerHTML={{ __html: i18n.t('CO2Level') }} />}
        content={<>
            {/* Sensor type */}
            <ComfortCo2Source />

            {<div className={'card-comfort ' + (source > 0 ? 'show' : 'hide')}>
                {/* Comfort rating */}
                <div className="mt-6">
                    <Indication error={false} value={comfort} />
                </div>

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