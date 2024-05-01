import i18n from '../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import NumberInput from "../atoms/numberInput";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import { iThingReceiveValid } from '../interfaces';

export default function ThingReceivePeriod(props: iThingReceiveValid) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <NumberInput label={i18n.t('periodMinutes')}
        value={config.thingspeakReceive.period}
        min={1}
        max={999}
        onChange={val => {
            dispatch(cf.thingspeakReceivePeriodChange(val));
            dispatch(cf.thingspeakReceiveExpireChange(Math.max(config.thingspeakReceive.expire, val)))
        }}
        isValid={valid => props.setIsValid(valid)}
    />
}