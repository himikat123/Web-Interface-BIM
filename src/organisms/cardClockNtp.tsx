import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/de';
import 'moment/locale/ru';
import 'moment/locale/pl';
import 'moment/locale/uk';
import Card from "../atoms/card";
import TextInput from "../atoms/textInput";
import NumberInput from "../atoms/numberInput";
import Indication from "../atoms/indication";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import { clockValidChange } from "../redux/slices/valid";

const CardClockNtp = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    let locale = 'en';
    switch(config.lang) {
        case 'de': locale = 'de'; break;
        case 'ru': locale = 'ru'; break;
        case 'pl': locale = 'pl'; break;
        case 'ua': locale = 'uk'; break;
        default: locale = 'en'; break; 
    }

    return <Card content={<>
        <TextInput label={i18n.t('ntpServerAddress')}
            value={config.clock.ntp}
            maxLength={64}
            onChange={val => dispatch(cf.clockNtpChange(val.target.value))}
        />

        <div className="mt-8">
            <NumberInput value={config.clock.ntp_period}
                min={0}
                max={90000}
                label={<>{i18n.t('ntpUpdatePeriod')} (<Indication 
                    error={false} 
                    value={config.clock.ntp_period === 0 ? i18n.t('never') : ((config.clock.ntp_period > 44 ? '~' : '')
                        + moment.duration(config.clock.ntp_period, 'minutes').locale(locale).humanize())} 
                /> )</>}
                onChange={val => dispatch(cf.clockNtpPeriodChange(val))}
                isValid={valid => dispatch(clockValidChange(valid))}
            />
            <div className="mt-2">(0 - {i18n.t('neverSync')})</div>
        </div>
    </>} />
}

export default CardClockNtp;