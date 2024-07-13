import { useState, useEffect } from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import NumberInput from "../atoms/numberInput";
import TextInput from "../atoms/textInput";
import { iConfig } from "../redux/configTypes";
import { historyValidChange } from "../redux/slices/valid";
import * as cf from "../redux/slices/config";

export default function CardHistorySettings() {
    const [isValid, setIsValid] = useState<boolean[]>([]);

    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    useEffect(() => {
        dispatch(historyValidChange(!isValid.includes(false)));
    });

    return <Card content={<>
        {/* History Repository */}
        <SelectSwitch label={i18n.t('historyRepository')}
            options={['--', 'thingspeak.com']}
            value={config.history.period > 0 ? 1 : 0}
            onChange={(val) => dispatch(cf.historyPriodChange(val === 0 ? 0 : 60))}
        />

        {config.history.period > 0 && <>
            {/* Update period */}
            <div className="mt-8">
                <NumberInput value={config.history.period}
                    min={0}
                    max={999}
                    label={i18n.t('periodMinutes')}
                    onChange={val => dispatch(cf.historyPriodChange(val))}
                    isValid={valid => {
                        let nv = isValid;
                        nv[0] = valid;
                        setIsValid(nv);
                    }}
                />
            </div>

            {/* Channel ID */}
            <div className="mt-8">
                <TextInput label="Channel ID" 
                    value={config.history.channelID}
                    maxLength={20}
                    pattern={[new RegExp(config.thingspeakSend.channelID.length ? config.thingspeakSend.channelID : "-"), false]}
                    tip={i18n.t('tips.tip4')}
                    onChange={val => dispatch(cf.historyChannelIDChange(val.target.value))}
                    isValid={(valid: boolean) => {
                        let nv = isValid;
                        nv[1] = valid;
                        setIsValid(nv);
                    }}
                />
            </div>

            {/* Write API Key */}
            <div className="mt-8">
                <TextInput label="Write API Key" 
                    value={config.history.wrkey}
                    maxLength={32}
                    onChange={val => dispatch(cf.historyWrkeyChange(val.target.value))}
                />
            </div>

            {/* Read API Key */}
            <div className="mt-8">
                <TextInput label="Read API Key" 
                    value={config.history.rdkey}
                    maxLength={32}
                    onChange={val => dispatch(cf.historyRdkeyChange(val.target.value))}
                />
            </div>
        </>}
    </>} />
}