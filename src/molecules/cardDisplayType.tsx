import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";

const CardDisplayType = (props: any) => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const displays = [
        [
            '--',
            'NX4832K035', 
            'NX4832T035',
            `WS2812b (1 ${i18n.t('ledPerSegment')})`,
            `WS2812b (2 ${i18n.t('ledsPerSegment')})`,
            `WS2812b (3 ${i18n.t('ledsPerSegment')})`
        ],
        [
            '--',
            `WS2812b (1 ${i18n.t('ledPerSegment')})`,
            `WS2812b (2 ${i18n.t('ledsPerSegment')})`,
            `WS2812b (3 ${i18n.t('ledsPerSegment')})`
        ]
    ];

    return <>
        <Card content={<>
            <SelectSwitch label={i18n.t('connectionType')}
                options={displays[props.num]}
                value={config.display.type[props.num]}
                onChange={(val: number) => dispatch(cf.DisplayTypeChange({num: props.num, val: val}))}
            />
        </>} />
    </>
}

export default CardDisplayType;