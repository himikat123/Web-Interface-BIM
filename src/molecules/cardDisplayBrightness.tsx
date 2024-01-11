import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import RangeInput from "../atoms/rangeInput";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";

const CardDisplayBrightness = (props: any) => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const brightSources = [
        i18n.t('bySunriseAndSunset'),
        i18n.t('byLightSensor'),
        i18n.t('byTime'),
        i18n.t('constantBrightness')
    ];

    return <Card content={<>
        <SelectSwitch label={i18n.t('displayBrightness')}
            options={brightSources}
            value={config.display.brightMethod[props.num]}
            onChange={(val: number) => dispatch(cf.DisplayBrightMethodChange({num: props.num, val: val}))}
        />

        {/* Brightess by sunrise and sunset */}
        {config.display.brightMethod[props.num] == 0 && <>
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
        </>}
    </>} />
}

export default CardDisplayBrightness;