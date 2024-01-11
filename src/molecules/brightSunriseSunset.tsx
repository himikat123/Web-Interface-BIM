import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import { iConfig } from "../redux/configTypes";
import RangeInput from "../atoms/rangeInput";
import * as cf from "../redux/slices/config";

const BrightSunriseSunset = (props: any) => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <>
        <RangeInput value={config.display.brightness.day[props.num]}
            label={i18n.t('daytimeBrightness')}
            min={1}
            max={100}
            limitMin={1}
            limitMax={100}
            step={1}
            indication={String(config.display.brightness.day[props.num])}
            onChange={(val) => dispatch(cf.DisplayBrightDayChange({num: props.num, val: val}))}
            className="mt-4"
        />

        <RangeInput value={config.display.brightness.night[props.num]}
            label={i18n.t('nightBrightness')}
            min={1}
            max={100}
            limitMin={1}
            limitMax={100}
            step={1}
            indication={String(config.display.brightness.night[props.num])}
            onChange={(val) => dispatch(cf.DisplayBrightNightChange({num: props.num, val: val}))}
            className="mt-4"
        />
    </>
}

export default BrightSunriseSunset;