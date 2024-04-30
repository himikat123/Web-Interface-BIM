import i18n from '../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import Toggle from "../atoms/toggle";
import NumberInput from "../atoms/numberInput";
import { iConfig } from "../redux/configTypes";
import { sendNarodmonValidChange } from "../redux/slices/valid";
import * as cf from "../redux/slices/config";

export default function CardSendNarodmonOnOffPeriod() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <Card content={<>
        {/* On/Off */}
        <Toggle label={i18n.t('sendToNarodmon')}
            checked={config.narodmonSend.period > 0 ? 1 : 0}
            onChange={() => dispatch(cf.narodmonSendPeriodChange(config.narodmonSend.period > 0 ? 0 : 5))}
        />

        {/* Period */}
        {config.narodmonSend.period > 0 && <div className="mt-8">
            <NumberInput label={i18n.t('periodMinutes')}
                value={config.narodmonSend.period}
                min={1}
                max={999}
                onChange={val => dispatch(cf.narodmonSendPeriodChange(val))}
                isValid={valid => dispatch(sendNarodmonValidChange(valid))}
            />
        </div>}
    </>} />
}