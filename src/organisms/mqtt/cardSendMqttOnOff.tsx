import i18n from '../../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import Toggle from "../../atoms/toggle";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";

export default function CardSendMqttOnOff() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <Card content={<>
        <Toggle label={i18n.t('sendViaMqtt')}
            checked={(config.mqttSend?.period ?? 0) >= 30 ? 1 : 0}
            onChange={() => dispatch(cf.mqttSendPeriodChange((config.mqttSend?.period ?? 0) >= 30 ? 0 : 60))}
        />
    </>} />
}