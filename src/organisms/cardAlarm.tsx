import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import hostUrl from "../atoms/hostUrl";
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import TimeInput from "../atoms/timeInput";
import Toggle from "../atoms/toggle";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import Indication from "../atoms/indication";

const CardAlarm = (props: any) => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    
    return <>
        <Card content={<>
            <TimeInput value={('0' + config.alarm.time[props.num][0]).slice(-2) + ':' + ('0' + config.alarm.time[props.num][1]).slice(-2)} 
                step={60}
                label={i18n.t('time')} 
                onChange={val => dispatch(cf.displayNightTimeChange({num: props.num, val: val}))} 
            />
        </>} />
    </>
}

export default CardAlarm;