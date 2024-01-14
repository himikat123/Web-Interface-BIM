import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import hostUrl from "../atoms/hostUrl";
import SelectSwitch from "../atoms/selectSwitch";
import RangeInput from "../atoms/rangeInput";
import Indication from "../atoms/indication";
import SensorData from "../atoms/sensorData";
import { iConfig } from "../redux/configTypes";
import { iDisplay } from "../interfaces";
import * as cf from "../redux/slices/config";

const BrightSensor = (props: iDisplay) => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    let sensorData = NaN;
    switch(config.display.lightSensor[props.num]) {
        case 0: sensorData = parseFloat(SensorData().AnalogVolt); break;
        case 1: sensorData = parseFloat(SensorData().MAX44009light); break; 
        case 2: sensorData = parseFloat(SensorData().BH1750light); break;
    }
    let brightness = config.display.lightSensor[props.num] == 0 ? sensorData * 30 : sensorData;
    brightness *= config.display.sensitivity[props.num] / 20;
    if(brightness < 1) brightness = 1;
    if(brightness > 100) brightness = 100;
    brightness = Math.round(brightness);

    const lightSensors = [
        i18n.t('analogInput') + ' (' + SensorData().AnalogVolt + ')',
        'MAX44009 (' + SensorData().MAX44009light + ')',
        'BH1750 (' + SensorData().BH1750light + ')'
    ];

    const sendSensitivity = (bright: number) => {
        let url = `${hostUrl()}/esp/sensitivity`;
        url += `?bright=${String(bright)}`;
        url += `&num=${props.num}`;
        fetch(url);
    }

    return <div className="my-8">
        <SelectSwitch label={i18n.t('sensorType')}
            options={lightSensors}
            value={config.display.lightSensor[props.num]}
            onChange={(val: number) => dispatch(cf.DisplayLightSensorChange({num: props.num, val: val}))}
        />
        
        <RangeInput value={config.display.sensitivity[props.num]}
            label={i18n.t('sensorSensitivity')}
            min={1}
            max={100}
            limitMin={1}
            limitMax={100}
            step={1}
            indication={String(config.display.sensitivity[props.num])}
            onChange={val => {
                dispatch(cf.DisplaySensitivityChange({num: props.num, val: val}));
                sendSensitivity(val);
            }}
            className="mt-2"
        />
        <div className="mt-4 text-end">
            {i18n.t('brightness')}:
            <Indication error={false} value={isNaN(brightness) ? '--' : brightness + '%'} />
        </div>
    </div>
}

export default BrightSensor;