import i18n from '../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import TextInput from "../atoms/textInput";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";

export default function CardNarodmonSensName() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <Card content={<TextInput label={i18n.t('sensorName')}
        value={config.narodmonSend.name}
        maxLength={16}
        onChange={val => dispatch(cf.narodmonSendNameChange(val.target.value))}
    />} />
}