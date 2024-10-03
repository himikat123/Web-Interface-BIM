import i18n from '../i18n/main';
import { useSelector } from 'react-redux';
import TwoColumns from "../templates/twoColumns";
import { iConfig } from "../redux/configTypes";
import CardThingReceiveOnOff from "../organisms/thingspeak/cardThingReceiveOnOff";
import CardThingReceivePeriodExpire from "../organisms/thingspeak/cardThingReceivePeriodExpire";
import CardThingReceiveCHID from "../organisms/thingspeak/cardThingReceiveCHID";
import CardThingReceiveRdKey from "../organisms/thingspeak/cardThingReceiveRdKey";

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