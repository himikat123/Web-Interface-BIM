import i18n from '../../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import TextInput from "../../atoms/textInput";
import NumberInput from '../../atoms/numberInput';
import { iConfig } from "../../redux/configTypes";
import { sendMqttValidChange } from "../../redux/slices/valid";
import * as cf from "../../redux/slices/config";

export default function CardSendMqttBroker() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <Card content={<>
        <TextInput label={i18n.t('broker')}
            value={config.mqttSend?.broker ?? ''}
            maxLength={32}
            onChange={val => dispatch(cf.mqttSendBrokerChange(val.target.value))}
        />

        <div className='mt-8'>
            <NumberInput label={i18n.t('port')}
                value={config.mqttSend?.port ?? 0}
                min={1}
                max={65535}
                onChange={val => dispatch(cf.mqttSendPortChange(val))}
                isValid={valid => dispatch(sendMqttValidChange(valid))}
            />
        </div>
    </>} />
}