import i18n from '../i18n/main';
import TwoColumns from "../templates/twoColumns";
import CardComfortTemp from "../organisms/cardComfortTemp";
import CardComfortHum from "../organisms/cardComfortHum";
import CardComfortAirQuality from "../organisms/cardComfortAirQuality";
import CardComfortCo2 from "../organisms/cardComfortCo2";

export default function Comfort() {
    const content = <>
        <CardComfortTemp />
        <CardComfortHum />
        <CardComfortAirQuality />
        <CardComfortCo2 />
    </>;

    return <TwoColumns navbar={true}
        header={[i18n.t('comfort')]} 
        content={[content]} 
        buttons={['save', 'reset']} 
    />
}