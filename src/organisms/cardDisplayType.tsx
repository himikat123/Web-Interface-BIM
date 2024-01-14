import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import hostUrl from "../atoms/hostUrl";
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import RangeInput from "../atoms/rangeInput";
import Toggle from "../atoms/toggle";
import { iConfig } from "../redux/configTypes";
import { iDisplay } from "../interfaces";
import * as cf from "../redux/slices/config";
import Indication from "../atoms/indication";

const CardDisplayType = (props: iDisplay) => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    let types = [
        "--",
        "LCD/TFT",
        i18n.t('segment7'),
        i18n.t('matrix'),
        i18n.t('neopixel'),
        i18n.t('nixie')
    ];
    const lcd = [
        { 'NX4832K035': 140 }, 
        { 'NX4832T035': 140 },
        { 'ILI9341': 100 }
    ];
    const segment = [
        { [`TM1637 (4${i18n.t('digits')}, ${i18n.t('withoutSeconds')}, ${i18n.t('points')})`]: 90 },
        { [`TM1637 (6${i18n.t('digits')}, ${i18n.t('withoutSeconds')}, ${i18n.t('points')})`]: 130 },
        { [`TM1637 (6${i18n.t('digits')}, ${i18n.t('withSeconds')}, ${i18n.t('points')})`]: 130 },
        { [`MAX7219 (4${i18n.t('digits')}, ${i18n.t('withoutSeconds')}, ${i18n.t('points')})`]: 90 },
        { [`MAX7219 (6${i18n.t('digits')}, ${i18n.t('withoutSeconds')}, ${i18n.t('points')})`]: 130 },
        { [`MAX7219 (6${i18n.t('digits')}, ${i18n.t('withoutSeconds')}, ${i18n.t('dashes')})`]: 130 },
        { [`MAX7219 (6${i18n.t('digits')}, ${i18n.t('withSeconds')}, ${i18n.t('points')})`]: 130 },
        { [`MAX7219 (8${i18n.t('digits')}, ${i18n.t('withoutSeconds')}, ${i18n.t('points')})`]: 170 },
        { [`MAX7219 (8${i18n.t('digits')}, ${i18n.t('withoutSeconds')}, ${i18n.t('dashes')})`]: 170 },
        { [`MAX7219 (8${i18n.t('digits')}, ${i18n.t('withSeconds')}, ${i18n.t('points')})`]: 170 },
        { [`MAX7219 (8${i18n.t('digits')}, ${i18n.t('withSeconds')}, ${i18n.t('dashes')})`]: 170 }
    ];
    const matrix = [
        { [`MAX7219 (${i18n.t('matrices4')}, ${i18n.t('withoutSeconds')}, ${i18n.t('points')})`]: 680 }
    ];
    const neopixel = [
        { [`WS2812b (1 ${i18n.t('ledPerSegment')})`]: 1800 },
        { [`WS2812b (2 ${i18n.t('ledsPerSegment')})`]: 3480 },
        { [`WS2812b (3 ${i18n.t('ledsPerSegment')})`]: 5160 }
    ];
    const nixie = [
        { [`Nixie (4${i18n.t('tubes')})`]: 1000 }
    ];
    if(props.num == 1) types.splice(1, 1);

    let models: string[] = [];
    let consums: number[] = [];

    switch(config.display.type[props.num]) {
        case 1: 
            models = props.num === 0 ? lcd.map(d => Object.keys(d)[0]) : segment.map(d => Object.keys(d)[0]);
            consums = props.num === 0 ? lcd.map(d => Object.values(d)[0]) : segment.map(d => Object.values(d)[0]);
            break;
        case 2: 
            models = props.num === 0 ? segment.map(d => Object.keys(d)[0]) : matrix.map(d => Object.keys(d)[0]);
            consums = props.num === 0 ? segment.map(d => Object.values(d)[0]) : matrix.map(d => Object.values(d)[0]);
            break;
        case 3: 
            models = props.num === 0 ? matrix.map(d => Object.keys(d)[0]) : neopixel.map(d => Object.keys(d)[0]);
            consums = props.num === 0 ? matrix.map(d => Object.values(d)[0]) : neopixel.map(d => Object.values(d)[0]);
            break;
        case 4: 
            models = props.num === 0 ? neopixel.map(d => Object.keys(d)[0]) : nixie.map(d => Object.keys(d)[0]);
            consums = props.num === 0 ? neopixel.map(d => Object.values(d)[0]) : nixie.map(d => Object.values(d)[0]);
            break;
        case 5: 
            models = props.num === 0 ? nixie.map(d => Object.keys(d)[0]) : [];
            consums = props.num === 0 ? nixie.map(d => Object.values(d)[0]) : [];
            break;
    }
    
    const sendLimits = () => {
        let url = `${hostUrl()}/esp/brightLimit`;
        url += `?min=${config.display.brightness.min[props.num]}`;
        url += `&max=${config.display.brightness.max[props.num]}`;
        url += `&num=${props.num}`;
        fetch(url);
    }

    return <>
        <Card content={<>
            <SelectSwitch label={i18n.t('displayType')}
                options={types}
                value={config.display.type[props.num]}
                onChange={val => {
                    dispatch(cf.DisplayTypeChange({num: props.num, val: val}));
                    dispatch(cf.DisplayModelChange({num: props.num, val: 0}));
                }}
            />

            {models.length > 0 && <div className="mt-8">
                <SelectSwitch label={i18n.t('displayModel')}
                    options={models}
                    value={config.display.model[props.num]}
                    onChange={val => dispatch(cf.DisplayModelChange({num: props.num, val: val}))}
                />
            </div>}

            {config.display.type[props.num] + props.num == 4 && <div>
                <div className="mt-4 mb-1 text-xs">{i18n.t('sacrificial')}</div>
                <Toggle checked={config.display.sled[props.num]}
                    onChange={() => dispatch(cf.DisplaySledChange({num: props.num, val: config.display.sled[props.num] ? 0 : 1}))}
                    label=""
                />
            </div>}

            {config.display.type[props.num] > 0 && <>
                <RangeInput value={config.display.brightness.min[props.num]}
                    label={i18n.t('minimumBrightnessLimit')}
                    min={0}
                    max={255}
                    limitMin={0}
                    limitMax={config.display.brightness.max[props.num]}
                    step={1}
                    indication={String(config.display.brightness.min[props.num])}
                    onChange={val => {
                        dispatch(cf.DisplayBrightMinChange({num: props.num, val: val}));
                        sendLimits();
                    }}
                    className="mt-4"
                />

                <RangeInput value={config.display.brightness.max[props.num]}
                    label={i18n.t('maximumBrightnessLimit')}
                    min={0}
                    max={255}
                    limitMin={config.display.brightness.min[props.num]}
                    limitMax={255}
                    step={1}
                    indication={String(config.display.brightness.max[props.num])}
                    onChange={val => {
                        dispatch(cf.DisplayBrightMaxChange({num: props.num, val: val}));
                        sendLimits();
                    }}
                    className="mt-2"
                />

                <div className="mt-4 text-xs">
                    {i18n.t('maximumDisplayCurrent')}:
                    <Indication error={false} 
                        value={String(
                            config.display.type[props.num] + props.num == 4 
                                ? (Math.round(consums[config.display.model[props.num]] 
                                    * config.display.brightness.max[props.num] 
                                    / 255
                                ) + config.display.sled[props.num])
                                : consums[config.display.model[props.num]]
                        ) + i18n.t('units.ma')} 
                    />
                </div>
            </>}
        </>} />
    </>
}

export default CardDisplayType;