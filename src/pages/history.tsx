import i18n from '../i18n/main';
import { useSelector } from 'react-redux';
import CardHistorySettings from "../organisms/history/cardHistorySettings";
import CardsHistorySensor from "../organisms/history/cardsHistorySensor";
import TwoColumns from "../templates/twoColumns";
import { iConfig } from "../redux/configTypes";

export default function History() {
    const config = useSelector((state: iConfig) => state.config);

    const content = <>
        <CardHistorySettings />
        {config.history.period > 0 && <CardsHistorySensor />}
    </>;

    return <TwoColumns header={[i18n.t('weatherHistory')]} 
        content={[content]} 
        navbar={true} 
        buttons={['save', 'reset']} 
    />
}