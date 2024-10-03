import i18n from '../../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import TextInput from "../../atoms/textInput";
import PasswordInput from '../../atoms/passwordInput';
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";

export default function CardSendMqttUser() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <Card content={<>
        <TextInput label={i18n.t('username')}
            value={config.mqttSend.user}
            maxLength={32}
            onChange={val => dispatch(cf.mqttSendUserChange(val.target.value))}
        />

        <div className='mt-8'>
            <PasswordInput label={i18n.t('password')}
                value={config.mqttSend.pass}
                maxLength={32}
                onChange={val => dispatch(cf.mqttSendPassChange(val.target.value))}
            />
        </div>
    </>} />
}