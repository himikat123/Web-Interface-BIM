import React, { useState, useEffect } from "react";
import i18n from '../i18n/main';
import Moment from 'react-moment';
import 'moment/locale/de';
import 'moment/locale/ru';
import 'moment/locale/pl';
import 'moment/locale/uk';
import { useSelector, useDispatch } from 'react-redux';
import TwoColumns from "../templates/twoColumns";
import Card from "../atoms/card";
import Toggle from "../atoms/toggle";
import TextInput from "../atoms/textInput";
import NumberInput from "../atoms/numberInput";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import { receiveValidChange } from "../redux/slices/valid";
import * as cf from "../redux/slices/config";
import * as vl from "../atoms/validateValues";

const ReceiveThingspeak = () => {
    const [isValid, setIsValid] = useState<boolean[]>([]);
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    let locale = 'en';
    switch(config.lang) {
        case 'de': locale = 'de'; break;
        case 'ru': locale = 'ru'; break;
        case 'pl': locale = 'pl'; break;
        case 'ua': locale = 'uk'; break;
        default: locale = 'en'; break; 
    }

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
            {config.thingspeakReceive.period > 0 && <div className="mt-8 table">
                <div className="table-row">
                    <div className="table-cell">
                        {i18n.t('dataFrom')}:
                    </div>
                    <div className={"table-cell ps-1 " + (vl.ThingspeakDataRelevance() ? "text-blue-700 dark:text-blue-400" : "text-red-700 dark:text-red-400")}>
                        <Moment unix format="HH:mm:ss DD.MM.YYYY">
                            {data.thing.time > 1700000000 ? data.thing.time : '--'}
                        </Moment> (
                            {config.lang === 'de' && i18n.t('ago') + ' '}
                            <Moment locale={locale} unix fromNow ago>{data.thing.time}</Moment>
                            {config.lang !== 'de' && ' ' + i18n.t('ago')}
                        ) - {!vl.ThingspeakDataRelevance() && i18n.t('dataExpired')}
                    </div>
                </div>

                <div className="table-row h-2" />
                {[...Array(8)].map((x, i) => <div key={i} className="table-row">
                    <div className="table-cell">
                        {`${i18n.t('field')} ${i + 1}:`}
                    </div>
                    <div className={"table-cell ps-1 " + (vl.ThingspeakDataRelevance() ? "text-blue-700 dark:text-blue-400" : "text-red-700 dark:text-red-400")}>
                        {vl.validateThingspeak(data.thing.data[i]) ? data.thing.data[i] : '--'}
                    </div>
                </div>)}
            </div>}
        </>} />

        {config.thingspeakReceive.period > 0 && <>
            <Card content={<>
                {/* Period */}
                <NumberInput label={i18n.t('periodMinutes')}
                    value={config.thingspeakReceive.period}
                    min={1}
                    max={999}
                    onChange={val => {
                        dispatch(cf.thingspeakReceivePeriodChange(val));
                        dispatch(cf.thingspeakReceiveExpireChange(Math.min(config.thingspeakReceive.expire, val)))
                    }}
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
                        max={config.thingspeakReceive.period}
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