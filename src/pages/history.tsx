import i18n from '../i18n/main';
import CardHistorySettings from "../organisms/cardHistorySettings";
import CardsHistorySensor from "../organisms/cardsHistorySensor";
import TwoColumns from "../templates/twoColumns";

export default function History() {
    const content = <>
        <CardHistorySettings />
        <CardsHistorySensor />
    </>;

    return <TwoColumns header={[i18n.t('weatherHistory')]} 
        content={[content]} 
        navbar={true} 
        buttons={['save', 'reset']} 
    />
}