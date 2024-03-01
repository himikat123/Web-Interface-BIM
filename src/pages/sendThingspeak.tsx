import React from "react";
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
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

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
                isValid={valid => dispatch(sendThingspeakValidChange(valid))}
            />
        } />}

        {config.thingspeakSend.period > 0 && <>
            {/* Channel ID */}
            <Card content={<TextInput label="Channel ID"
                value={config.thingspeakSend.channelID}
                maxLength={20}
                onChange={val => dispatch(cf.thingspeakSendChannelIdChange(val.target.value))}
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