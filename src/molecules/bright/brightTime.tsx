import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import hostUrl from "../../atoms/hostUrl";
import { iConfig } from "../../redux/configTypes";
import { iDisplay } from "../../interfaces";
import RangeInput from "../../atoms/rangeInput";
import TimeInput from "../../atoms/timeInput";
import * as cf from "../../redux/slices/config";

export default function BrightTime(props: iDisplay) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const sendBright = (bright: number) => {
        let url = `${hostUrl()}/esp/bright`;
        url += `?bright=${String(bright)}`;
        url += `&num=${props.num}`;
        url += `&code=${localStorage.getItem('code') || '0'}`;
        fetch(url);
    }

    const dayTime = Array.isArray(config.display.dayTime)
        ? config.display.dayTime[props.num]
        : config.display.dayTime;

    const brDay = Array.isArray(config.display.brightness.day)
        ? config.display.brightness.day[props.num]
        : config.display.brightness.day;

    const nightTime = Array.isArray(config.display.nightTime)
        ? config.display.nightTime[props.num]
        : config.display.nightTime;

    const brNight = Array.isArray(config.display.brightness.night)
        ? config.display.brightness.night[props.num]
        : config.display.brightness.night;

    return <>
        <div className="mt-8">
            <TimeInput value={dayTime}
                step={60} 
                label={i18n.t('dayMode')} 
                onChange={val => dispatch(cf.displayDayTimeChange({num: props.num, val: val}))} 
            />
        </div>
        <RangeInput value={brDay}
            label={i18n.t('daytimeBrightness')}
            min={1}
            max={100}
            limitMin={1}
            limitMax={100}
            step={1}
            indication={String(brDay)}
            onChange={val => {
                dispatch(cf.displayBrightDayChange({num: props.num, val: val}));
                sendBright(val);
            }}
            className="mt-4"
        />

        <div className="mt-14">
            <TimeInput value={nightTime} 
                step={60}
                label={i18n.t('nightMode')} 
                onChange={val => dispatch(cf.displayNightTimeChange({num: props.num, val: val}))} 
            />
        </div>
        <RangeInput value={brNight}
            label={i18n.t('nightBrightness')}
            min={1}
            max={100}
            limitMin={1}
            limitMax={100}
            step={1}
            indication={String(brNight)}
            onChange={val => {
                dispatch(cf.displayBrightNightChange({num: props.num, val: val}));
                sendBright(val);
            }}
            className="mt-4"
        />
    </>
}