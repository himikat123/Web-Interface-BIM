import i18n from '../i18n/main';
import { useSelector } from 'react-redux';
import FourColumns from "../templates/fourColumns";
import { iConfig } from "../redux/configTypes";
import CardSendNarodmonOnOffPeriod from '../organisms/narodmon/cardSendNarodmonOnOffPeriod';
import CardNarodmonApiKey from '../organisms/narodmon/cardNarodmonApiKey';
import CardNarodmonMac from '../organisms/narodmon/cardNarodmonMac';
import CardNarodmonSensName from '../organisms/narodmon/cardNarodmonSensName';
import CardNarodmonSendData from "../organisms/narodmon/cardNarodmonSendData";

export default function SendNarodmon() {
    const config = useSelector((state: iConfig) => state.config);

    const content = <>
        <CardSendNarodmonOnOffPeriod />
        
        {config.narodmonSend.period > 0 && <>
            <CardNarodmonApiKey />
            <CardNarodmonMac />
            <CardNarodmonSensName />

            {[...Array(12)].map((x, i) => <CardNarodmonSendData key={i} num={i} />)}
        </>}
    </>

    return <FourColumns navbar={true}
        header={[i18n.t('sendToNarodmon')]} 
        content={[content]} 
        buttons={['save', 'reset']} 
    />
}