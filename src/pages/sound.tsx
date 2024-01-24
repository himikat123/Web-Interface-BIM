import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../i18n/main';
import hostUrl from "../atoms/hostUrl";
import { iConfig } from "../redux/configTypes";
import TwoColumns from "../templates/twoColumns";
import Card from "../atoms/card";
import RangeInput from "../atoms/rangeInput";
import Button from "../atoms/button";
import * as cf from "../redux/slices/config";

const Sound = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const btnActive = 'bg-green-600 hover:bg-green-700';
    const btnPassive = 'bg-gray-600 hover:bg-gray-700';
    const equalizers = ["NORMAL", "POP", "ROCK", "JAZZ", "CLASSIC", "BASS"];

    const sendVolume = (vol: number) => {
        let url = `${hostUrl()}/esp/volume`;
        url += `?vol=${String(vol)}`;
        fetch(url);
    }

    const changeEQ = (eq: number) => {
        dispatch(cf.soundEqChange(eq));
        let url = `${hostUrl()}/esp/equalizer`;
        url += `?eq=${String(eq)}`;
        fetch(url);
    }

    const content = <>
        {/* Volume */}
        <Card content={<RangeInput value={config.sound.vol}
            label={i18n.t('volume')}
            min={1}
            max={30}
            limitMin={1}
            limitMax={30}
            step={1}
            indication={String(config.sound.vol)}
            onChange={val => {
                dispatch(cf.soundVolChange(val));
                sendVolume(val);
            }}
        />} />

        {/* Equalizer */}
        <Card content={<div className="grid grid-cols-3 gap-3">
            {equalizers.map((eq, i) => <Button label={eq}
                className={'text-text_dark ' + (config.sound.eq === i ? btnActive : btnPassive)}
                onClick={() => changeEQ(i)}
            />)}
        </div>} />

        <Card content={<div>3</div>} />

        <Card content={<div>4</div>} />
    </>;

    return (<>
        <TwoColumns header={[i18n.t('sound')]} 
            content={[content]} 
            navbar={true} 
        />
    </>);
}

export default Sound;