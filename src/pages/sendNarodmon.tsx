import i18n from '../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import FourColumns from "../templates/fourColumns";
import Card from "../atoms/card";
import Toggle from "../atoms/toggle";
import TextInput from "../atoms/textInput";
import NumberInput from "../atoms/numberInput";
import CardNarodmonSendData from "../organisms/cardNarodmonSendData";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import { sendNarodmonValidChange } from "../redux/slices/valid";
import * as cf from "../redux/slices/config";

export default function SendNarodmon() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const content = <>
        <Card content={<>
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


        {config.narodmonSend.period > 0 && <>
            {/* Channel ID */}
            <Card content={<>
                <TextInput label={i18n.t('latitude')}
                    value={config.narodmonSend.lat}
                    maxLength={10}
                    onChange={val => dispatch(cf.narodmonSendLatChange(val.target.value))}
                />

                {/* Write API Key */}
                <div className="mt-8">
                    <TextInput label={i18n.t('longitude')}
                        value={config.narodmonSend.lon}
                        maxLength={10}
                        onChange={val => dispatch(cf.narodmonSendLonChange(val.target.value))}
                    />
                </div>
            </>} />

            <Card content={<TextInput label="MAC"
                value={data.network.mac ? ('BIM' + data.network.mac.replace(/:/g, "")) : '--'}
                readonly
            />} />

            <Card content={<TextInput label={i18n.t('sensorName')}
                value={config.narodmonSend.name}
                maxLength={16}
                onChange={val => dispatch(cf.narodmonSendNameChange(val.target.value))}
            />} />

            {[...Array(12)].map((x, i) => <CardNarodmonSendData num={i} />)}
        </>}
    </>

    return <FourColumns navbar={true}
        header={[i18n.t('sendToNarodmon')]} 
        content={[content]} 
        buttons={['save', 'reset']} 
    />
}