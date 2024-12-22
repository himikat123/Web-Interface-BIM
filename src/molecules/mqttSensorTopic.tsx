import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import TextInput from "../atoms/textInput";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";

export default function MqttSensorTopic(props: {num: number}) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    
    return <div className="mt-8">
        <TextInput label={i18n.t('topic')}
            value={config.mqttSend?.topics ? config.mqttSend.topics[props.num] : ''}
            maxLength={16}
            onChange={val => dispatch(cf.mqttSendTopicsChange({ num: props.num, val: val.target.value }))}
        />
    </div>
}