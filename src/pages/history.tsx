import React from "react";
import i18n from '../i18n/main';
import CardHistorySettings from "../organisms/cardHistorySettings";
import CardsHistorySensor from "../organisms/cardsHistorySensor";
import TwoColumns from "../templates/twoColumns";

const History = () => {
    const content = <>
        <CardHistorySettings />
        <CardsHistorySensor />
    </>;

    return (<>
        <TwoColumns header={[i18n.t('weatherHistory')]} 
            content={[content]} 
            navbar={true} 
            buttons={['save', 'reset']} 
        />
    </>);
}

export default History;