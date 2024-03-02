import React, { useState, useEffect } from "react";
import i18n from '../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import FourColumns from "../templates/fourColumns";
import Card from "../atoms/card";
import Toggle from "../atoms/toggle";
import TextInput from "../atoms/textInput";
import NumberInput from "../atoms/numberInput";
import CardThingspeakSendData from "../organisms/cardThingspeakSendData";
import { iConfig } from "../redux/configTypes";
import { sendThingspeakValidChange } from "../redux/slices/valid";
import * as cf from "../redux/slices/config";

const SendThingspeak = () => {
    const [isValid, setIsValid] = useState<boolean[]>([]);

    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    useEffect(() => {
        dispatch(sendThingspeakValidChange(!isValid.includes(false)));
    });

    const content = <>
        {/* On/Off */}
        <Card content={<Toggle label={i18n.t('sendToThingspeak')}
            checked={config.thingspeakSend.period > 0 ? 1 : 0}
            onChange={() => dispatch(cf.thingspeakSendPeriodChange(config.thingspeakSend.period > 0 ? 0 : 5))}
        />} />

        {/* Period */}
        {config.thingspeakSend.period > 0 && <Card content={
            <NumberInput label={i18n.t('periodMinutes')}
                value={config.thingspeakSend.period}
                min={1}
                max={999}
                onChange={val => dispatch(cf.thingspeakSendPeriodChange(val))}
                isValid={(valid: boolean) => {
                    let nv = isValid;
                    nv[0] = valid;
                    setIsValid(nv);
                }}
            />
        } />}

        {config.thingspeakSend.period > 0 && <>
            {/* Channel ID */}
            <Card content={<TextInput label="Channel ID"
                value={config.thingspeakSend.channelID}
                maxLength={20}
                pattern={[new RegExp(config.history.channelID.length ? config.history.channelID : "-"), false]}
                tip={i18n.t('tips.tip4')}
                onChange={val => dispatch(cf.thingspeakSendChannelIdChange(val.target.value))}
                isValid={(valid: boolean) => {
                    let nv = isValid;
                    nv[1] = valid;
                    setIsValid(nv);
                }}
            />} />

            {/* Write API Key */}
            <Card content={<TextInput label="Write API Key"
                value={config.thingspeakSend.wrkey}
                maxLength={32}
                onChange={val => dispatch(cf.thingspeakSendWrkeyChange(val.target.value))}
            />} />

            {[...Array(8)].map((x, i) => <CardThingspeakSendData key={i} num={i} />)}
        </>}
    </>

    return <>
        <FourColumns navbar={true}
            header={[i18n.t('sendToThingspeak')]} 
            content={[content]} 
            buttons={['save', 'reset']} 
        />
    </>
}

export default SendThingspeak;