import { useState } from "react";
import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import hostUrl from "../../atoms/hostUrl";
import type { iConfig } from "../../redux/configTypes";
import type { iDisplay } from "../../interfaces";
import RangeInput from "../../atoms/rangeInput";
import * as cf from "../../redux/slices/config";

export default function BrightSunriseSunset(props: iDisplay) {
    const [br, setBr] = useState(0);
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const sendBright = () => {
        let url = `${hostUrl()}/esp/bright`;
        url += `?bright=${String(br)}`;
        url += `&num=${props.num}`;
        url += `&code=${localStorage.getItem('code') || '0'}`;
        fetch(url);
    }

    const brDay = Array.isArray(config.display.brightness.day)
        ? config.display.brightness.day[props.num]
        : config.display.brightness.day;

    const brNight = Array.isArray(config.display.brightness.night)
        ? config.display.brightness.night[props.num]
        : config.display.brightness.night;

    return <>
        <RangeInput value={brDay} 
            label={i18n.t('daytimeBrightness')}
            min={1}
            max={100}
            limitMin={1}
            limitMax={100}
            step={1}
            indication={String(brDay)}
            onChange={val => {
                setBr(val);
                dispatch(cf.displayBrightDayChange({num: props.num, val: val}));
            }}
            onRelese={() => sendBright()}
            className="mt-4"
        />

        <RangeInput value={brNight}
            label={i18n.t('nightBrightness')}
            min={1}
            max={100}
            limitMin={1}
            limitMax={100}
            step={1}
            indication={String(brNight)}
            onChange={val => {
                setBr(val);
                dispatch(cf.displayBrightNightChange({num: props.num, val: val}));
            }}
            onRelese={() => sendBright()}
            className="mt-4"
        />
    </>
}