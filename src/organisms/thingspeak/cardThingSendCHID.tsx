import i18n from '../../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import TextInput from "../../atoms/textInput";
import { iConfig } from "../../redux/configTypes";
import { iCardThingSend } from "../../interfaces";
import * as cf from "../../redux/slices/config";


export default function CardThingSendCHID(props: iCardThingSend) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <Card content={<TextInput label="Channel ID"
        value={config.thingspeakSend.channelID}
        maxLength={20}
        pattern={[new RegExp(config.history.channelID.length ? config.history.channelID : "-"), false]}
        tip={i18n.t('tips.tip4')}
        onChange={val => dispatch(cf.thingspeakSendChannelIdChange(val.target.value))}
        isValid={(valid: boolean) => {
            let nv = props.isValid;
            nv[1] = valid;
            props.setIsValid(nv);
        }}
    />} />
}