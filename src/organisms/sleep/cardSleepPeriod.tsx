import i18n from '../../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import NumberInput from "../../atoms/numberInput";
import type { iConfig } from "../../redux/configTypes";
import type { iCardThingSend } from '../../interfaces';
import * as cf from "../../redux/slices/config";

export default function CardSleepPeriod(props: iCardThingSend) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <Card content={
        <NumberInput label={i18n.t('goSleepInMinutes')}
            value={config.sleep ?? 0}
            min={1}
            max={999}
            onChange={val => dispatch(cf.sleepChange(val))}
            isValid={(valid: boolean) => {
                let nv = props.isValid;
                nv[0] = valid;
                props.setIsValid(nv);
            }}
        />
    } />
}