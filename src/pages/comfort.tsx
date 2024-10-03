import i18n from '../i18n/main';
import TwoColumns from "../templates/twoColumns";
import CardComfortTemp from "../organisms/comfort/cardComfortTemp";
import CardComfortHum from "../organisms/comfort/cardComfortHum";
import CardComfortIaq from "../organisms/comfort/cardComfortIaq";
import CardComfortCo2 from "../organisms/comfort/cardComfortCo2";

export default function Comfort() {
    const content = <>
        <CardComfortTemp />
        <CardComfortHum />
        <CardComfortIaq />
        <CardComfortCo2 />
    </>;

    return <TwoColumns navbar={true}
        header={[i18n.t('comfort')]} 
        content={[content]} 
        buttons={['save', 'reset']} 
    />
}