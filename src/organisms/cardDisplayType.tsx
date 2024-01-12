import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
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
    const displays1 = [
        { '--': 0 },
        { 'NX4832K035': 140 }, 
        { 'NX4832T035': 140 },
        { 'ILI9341': 100 }
    ];
    const displays2 = [
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
        { [`MAX7219 (8${i18n.t('digits')}, ${i18n.t('withSeconds')}, ${i18n.t('dashes')})`]: 170 },
        { [`MAX7219 (${i18n.t('matrices4')}, ${i18n.t('withoutSeconds')}, ${i18n.t('points')})`]: 680 },
        { [`WS2812b (1 ${i18n.t('ledPerSegment')})`]: 1800 },
        { [`WS2812b (2 ${i18n.t('ledsPerSegment')})`]: 3480 },
        { [`WS2812b (3 ${i18n.t('ledsPerSegment')})`]: 5160 },
        { [`Nixie (4${i18n.t('tubes')})`]: 0 }
    ];
    const displays = props.num == 0 ? [...displays1, ...displays2].map(d => Object.keys(d)[0]) : displays2.map(d => Object.keys(d)[0]);
    const consums = props.num == 0 ? [...displays1, ...displays2].map(d => Object.values(d)[0]) : displays2.map(d => Object.values(d)[0]);
    
    return <>
        <Card content={<>
            <SelectSwitch label={i18n.t('displayType')}
                options={displays}
                value={config.display.type[props.num]}
                onChange={(val: number) => dispatch(cf.DisplayTypeChange({num: props.num, val: val}))}
            />

            {displays[config.display.type[props.num]]?.includes('WS2812b') && <div>
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
                    onChange={(val) => dispatch(cf.DisplayBrightMinChange({num: props.num, val: val}))}
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
                    onChange={(val) => dispatch(cf.DisplayBrightMaxChange({num: props.num, val: val}))}
                    className="mt-2"
                />

                <div className="mt-4 text-xs">
                    {i18n.t('maximumDisplayCurrent')}:
                    <Indication error={false} 
                        value={String(
                            displays[config.display.type[props.num]].includes('WS2812b') 
                                ? (Math.round(consums[config.display.type[props.num]] 
                                    * config.display.brightness.max[props.num] 
                                    / 255
                                ) + config.display.sled[props.num])
                                : consums[config.display.type[props.num]]
                        ) + i18n.t('units.ma')} 
                    />
                </div>
            </>}
        </>} />
    </>
}

export default CardDisplayType;