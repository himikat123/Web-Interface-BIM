import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import BrightSunriseSunset from "../molecules/brightSunriseSunset";
import BrightSensor from "../molecules/brightSensor";
import { iConfig } from "../redux/configTypes";
import { iDisplay } from "../interfaces";
import * as cf from "../redux/slices/config";

const CardDisplayBrightness = (props: iDisplay) => {
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
        {config.display.brightMethod[props.num] === 0 && <BrightSunriseSunset num={props.num} />}

        {/* Brightess by light sensor */}
        {config.display.brightMethod[props.num] === 1 && <BrightSensor num={props.num} />}
    </>} />
}

export default CardDisplayBrightness;