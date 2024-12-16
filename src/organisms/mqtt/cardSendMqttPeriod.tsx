import i18n from '../../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import NumberInput from "../../atoms/numberInput";
import { iConfig } from "../../redux/configTypes";
import { sendMqttValidChange } from "../../redux/slices/valid";
import * as cf from "../../redux/slices/config";

export default function CardSendMqttPeriod() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <Card content={<NumberInput label={i18n.t('periodSeconds')}
        value={config.mqttSend?.period ?? 0}
        min={30}
        max={999}
        onChange={val => dispatch(cf.mqttSendPeriodChange(val))}
        isValid={valid => dispatch(sendMqttValidChange(valid))}
    />} />
}