import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import { iConfig } from "../redux/configTypes";
import { iDisplay } from "../interfaces";
import RangeInput from "../atoms/rangeInput";
import TimeInput from "../atoms/timeInput";
import * as cf from "../redux/slices/config";

const BrightTime = (props: iDisplay) => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <>
        <div className="mt-8">
            <TimeInput value={config.display.dayTime[props.num]}
                step={60} 
                label={i18n.t('dayMode')} 
                onChange={val => dispatch(cf.DisplayDayTimeChange({num: props.num, val: val}))} 
            />
        </div>
        <RangeInput value={config.display.brightness.day[props.num]}
            label={i18n.t('daytimeBrightness')}
            min={1}
            max={100}
            limitMin={1}
            limitMax={100}
            step={1}
            indication={String(config.display.brightness.day[props.num])}
            onChange={val => dispatch(cf.DisplayBrightDayChange({num: props.num, val: val}))}
            className="mt-4"
        />

        <div className="mt-14">
            <TimeInput value={config.display.nightTime[props.num]} 
                step={60}
                label={i18n.t('nightMode')} 
                onChange={val => dispatch(cf.DisplayNightTimeChange({num: props.num, val: val}))} 
            />
        </div>
        <RangeInput value={config.display.brightness.night[props.num]}
            label={i18n.t('nightBrightness')}
            min={1}
            max={100}
            limitMin={1}
            limitMax={100}
            step={1}
            indication={String(config.display.brightness.night[props.num])}
            onChange={val => dispatch(cf.DisplayBrightNightChange({num: props.num, val: val}))}
            className="mt-4"
        />
    </>
}

export default BrightTime;