import i18n from '../../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import Toggle from "../../atoms/toggle";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";

export default function CardThingSendOnOff() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <Card content={
        <Toggle label={i18n.t('sendToThingspeak')}
            checked={config.thingspeakSend.period > 0 ? 1 : 0}
            onChange={() => dispatch(cf.thingspeakSendPeriodChange(config.thingspeakSend.period > 0 ? 0 : 5))}
        />} 
    />
}