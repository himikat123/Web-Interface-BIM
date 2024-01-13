import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import hostUrl from "../atoms/hostUrl";
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import RangeInput from "../atoms/rangeInput";
import { iConfig } from "../redux/configTypes";
import { iDisplay } from "../interfaces";
import * as cf from "../redux/slices/config";

const CardDisplayAnimation = (props: iDisplay) => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const animations = [
        '--',
        i18n.t('toTheRight'), 
        i18n.t('toTheLeft'),
        i18n.t('fromTheRight'),
        i18n.t('fromTheLeft'),
        i18n.t('toTheSides'),
        i18n.t('layeringFromTheRight'),
        i18n.t('layeringFromTheLeft')
    ];
    const clockPoints = [
        i18n.t('blinkTogether'),
        i18n.t('blinkInTurn'),
        i18n.t('pointsAlwaysOn'),
        i18n.t('pointsAlwaysOff'),
    ];

    const sendAnimationType = (val: number) => {
        let url = `${hostUrl()}/esp/animation`;
        url += `?type=${val}`;
        url += `&num=${props.num}`;
        fetch(url);
    }

    const sendAnimationSpeed = (val: number) => {
        let url = `${hostUrl()}/esp/animation`;
        url += `?speed=${val}`;
        url += `&num=${props.num}`;
        fetch(url);
    }

    const sendAnimationPoints = (val: number) => {
        let url = `${hostUrl()}/esp/animation`;
        url += `?points=${val}`;
        url += `&num=${props.num}`;
        fetch(url);
    }

    return <>
        <Card content={config.display.type[props.num] >= 4 && config.display.type[props.num] <= 18 && <>
            <SelectSwitch label={i18n.t('animation')}
                options={animations}
                value={config.display.animation.type[props.num]}
                onChange={val => {
                    dispatch(cf.DisplayAnimationTypeChange({num: props.num, val: val}));
                    sendAnimationType(val);
                }}
            />

            <RangeInput value={config.display.animation.speed[props.num]}
                label={i18n.t('animationSpeed')}
                min={1}
                max={30}
                limitMin={1}
                limitMax={30}
                step={1}
                indication={String(config.display.animation.speed[props.num])}
                onChange={val => {
                    dispatch(cf.DisplayAnimationSpeedChange({num: props.num, val: val}));
                    sendAnimationSpeed(val);
                }}
                className="mt-4"
            />

            <div className="mt-12">
                <SelectSwitch label={i18n.t('clockPoints')}
                    options={clockPoints}
                    value={config.display.animation.points[props.num]}
                    onChange={val => {
                        dispatch(cf.DisplayAnimationPointsChange({num: props.num, val: val}));
                        sendAnimationPoints(val);
                    }}
                />
            </div>
        </>} />
    </>
}

export default CardDisplayAnimation;