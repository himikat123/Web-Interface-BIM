import i18n from '../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import NumberInput from "../atoms/numberInput";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import { iThingReceiveValid } from '../interfaces';

export default function ThingReceiveExpire(props: iThingReceiveValid) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
        
    return <div className="mt-8">
        <NumberInput label={i18n.t('dataExpirationTime')}
            value={config.thingspeakReceive.expire}
            min={config.thingspeakReceive.period}
            max={999}
            onChange={val => dispatch(cf.thingspeakReceiveExpireChange(val))}
            isValid={valid => props.setIsValid(valid)}
        />
    </div>
}