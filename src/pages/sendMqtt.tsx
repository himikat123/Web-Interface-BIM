import i18n from '../i18n/main';
import { useSelector } from 'react-redux';
import FourColumns from "../templates/fourColumns";
import { iConfig } from "../redux/configTypes";
import CardSendMqttOnOff from '../organisms/mqtt/cardSendMqttOnOff';
import CardSendMqttPeriod from '../organisms/mqtt/cardSendMqttPeriod';
import CardSendMqttBroker from '../organisms/mqtt/cardSendMqttBroker';
import CardSendMqttUser from '../organisms/mqtt/cardSendMqttUser';
import CardSendMqttData from "../organisms/mqtt/cardSendMqttData";

export default function SendMqtt() {
    const config = useSelector((state: iConfig) => state.config);

    const content = <>
        <CardSendMqttOnOff />
        
        {config.mqttSend.period >= 30 && <>
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