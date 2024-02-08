import React, { useState, useEffect } from "react";
import i18n from '../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import TwoColumns from "../templates/twoColumns";
import Card from "../atoms/card";
import Toggle from "../atoms/toggle";
import TextInput from "../atoms/textInput";
import NumberInput from "../atoms/numberInput";
import { iConfig } from "../redux/configTypes";
import { receiveValidChange } from "../redux/slices/valid";
import * as cf from "../redux/slices/config";

const ReceiveThingspeak = () => {
    const [isValid, setIsValid] = useState<boolean[]>([]);
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    useEffect(() => {
        dispatch(receiveValidChange(!isValid.includes(false)));
    });

    const content = <>
        {/* On/Off */}
        <Card content={<>
            <Toggle label={i18n.t('receiveDataFrom') + " thingspeak.com"}
                checked={config.thingspeakReceive.period > 0 ? 1 : 0}
                onChange={() => dispatch(cf.thingspeakReceivePeriodChange(config.thingspeakReceive.period > 0 ? 0 : 5))}
            />
        </>} />

        {config.thingspeakReceive.period > 0 && <>
            <Card content={<>
                {/* Period */}
                <NumberInput label={i18n.t('periodMinutes')}
                    value={config.thingspeakReceive.period}
                    min={1}
                    max={999}
                    onChange={val => dispatch(cf.thingspeakReceivePeriodChange(val))}
                    isValid={valid => {
                        let nv = isValid;
                        nv[0] = valid;
                        setIsValid(nv);
                    }}
                />
        
                {/* Data expire */}
                <div className="mt-8">
                    <NumberInput label={i18n.t('dataExpirationTime')}
                        value={config.thingspeakReceive.expire}
                        min={1}
                        max={999}
                        onChange={val => dispatch(cf.thingspeakReceiveExpireChange(val))}
                        isValid={valid => {
                            let nv = isValid;
                            nv[1] = valid;
                            setIsValid(nv);
                        }}
                    />
                </div>
            </>} />

            {/* Channel ID */}
            <Card content={<TextInput label="Channel ID"
                value={config.thingspeakReceive.channelID}
                maxLength={20}
                onChange={val => dispatch(cf.thingspeakReceiveChannelIdChange(val.target.value))}
            />} />

            {/* Read API Key */}
            <Card content={<TextInput label="Read API Key"
                value={config.thingspeakReceive.rdkey}
                maxLength={32}
                onChange={val => dispatch(cf.thingspeakReceiveRdkeyChange(val.target.value))}
            />} />
        </>}
    </>

    return <>
        <TwoColumns navbar={true}
            header={[i18n.t('dataReceive')]} 
            content={[content]} 
            buttons={['save', 'reset']} 
        />
    </>
}

export default ReceiveThingspeak;