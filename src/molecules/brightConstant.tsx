import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import hostUrl from "../atoms/hostUrl";
import { iConfig } from "../redux/configTypes";
import { iDisplay } from "../interfaces";
import RangeInput from "../atoms/rangeInput";
import * as cf from "../redux/slices/config";

const BrightConstant = (props: iDisplay) => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const sendBright = (bright: number) => {
        let url = `${hostUrl()}/esp/bright`;
        url += `?bright=${String(bright)}`;
        url += `&num=${props.num}`;
        fetch(url);
    }

    return <RangeInput value={config.display.brightness.day[props.num]}
        label={i18n.t('brightness')}
        min={1}
        max={100}
        limitMin={1}
        limitMax={100}
        step={1}
        indication={String(config.display.brightness.day[props.num])}
        onChange={val => {
            dispatch(cf.DisplayBrightDayChange({num: props.num, val: val}));
            sendBright(val);
        }}
        className="mt-4"
    />
}

export default BrightConstant;