import i18n from '../i18n/main';
import { useSelector } from 'react-redux';
import TwoColumns from "../templates/twoColumns";
import { iConfig } from "../redux/configTypes";
import CardThingReceiveOnOff from "../organisms/cardThingReceiveOnOff";
import CardThingReceivePeriodExpire from "../organisms/cardThingReseivePeriodExpire";
import CardThingReceiveCHID from "../organisms/cardThingReceiveCHID";
import CardThingReceiveRdKey from "../organisms/cardThingReceiveRdKey";

export default function ReceiveThingspeak() {
    const config = useSelector((state: iConfig) => state.config);

    const content = <>
        {/* On/Off */}
        <CardThingReceiveOnOff />

        {config.thingspeakReceive.period > 0 && <>
            {/* Period & Data expire */}
            <CardThingReceivePeriodExpire />

            {/* Channel ID */}
            <CardThingReceiveCHID />

            {/* Read API Key */}
            <CardThingReceiveRdKey />
        </>}
    </>

    return <TwoColumns navbar={true}
        header={[i18n.t('dataReceive')]} 
        content={[content]} 
        buttons={['save', 'reset']} 
    />
}