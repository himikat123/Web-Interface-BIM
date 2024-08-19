import i18n from '../i18n/main';
import { useSelector } from 'react-redux';
import FourColumns from "../templates/fourColumns";
import { iConfig } from "../redux/configTypes";
import CardSendMqttOnOff from '../organisms/cardSendMqttOnOff';
import CardSendMqttPeriod from '../organisms/cardSendMqttPeriod';
import CardSendMqttBroker from '../organisms/cardSendMqttBroker';
import CardSendMqttUser from '../organisms/cardSendMqttUser';
import CardSendMqttData from "../organisms/cardSendMqttData";

export default function SendMqtt() {
    const config = useSelector((state: iConfig) => state.config);

    const content = <>
        <CardSendMqttOnOff />
        
        {config.mqttSend.period > 0 && <>
            <CardSendMqttPeriod />
            <CardSendMqttBroker />
            <CardSendMqttUser />

            {[...Array(12)].map((x, i) => <CardSendMqttData key={i} num={i} />)}
        </>}
    </>

    return <FourColumns navbar={true}
        header={[i18n.t('sendViaMqtt')]} 
        content={[content]} 
        buttons={['save', 'reset']} 
    />
}