import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Indication from "../atoms/indication";
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import RangeInput from "../atoms/rangeInput";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as cf from "../redux/slices/config";
import * as vl from "../atoms/validateValues";

const CardDisplayBrightness = (props: any) => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const analogInputValue = vl.validateAnalogVoltage(data.analog.volt) ? (data.analog.volt.toFixed(2) + i18n.t('units.v')) : '--';
    const max44009Value = vl.validateLight(data.max44009.light) ? (data.max44009.light.toFixed(2) + i18n.t('units.lux')) : '--'
    const bh1750Value = vl.validateLight(data.bh1750.light) ? (data.bh1750.light.toFixed(2) + i18n.t('units.lux')) : '--';

    let sensorData = NaN;
    switch(config.display.lightSensor[props.num]) {
        case 0: sensorData = parseFloat(analogInputValue); break;
        case 1: sensorData = parseFloat(max44009Value); break; 
        case 2: sensorData = parseFloat(bh1750Value); break;
    }
    let brightness = config.display.lightSensor[props.num] == 0 ? sensorData * 30 : sensorData;
    brightness *= config.display.sensitivity[props.num] / 20;
    if(brightness < 1) brightness = 1;
    if(brightness > 100) brightness = 100;
    brightness = Math.round(brightness);

    const brightSources = [
        i18n.t('bySunriseAndSunset'),
        i18n.t('byLightSensor'),
        i18n.t('byTime'),
        i18n.t('constantBrightness')
    ];

    const lightSensors = [
        i18n.t('analogInput') + ' (' + analogInputValue + ')',
        'MAX44009 (' + max44009Value + ')',
        'BH1750 (' + bh1750Value + ')'
    ];

    return <Card content={<>
        <SelectSwitch label={i18n.t('displayBrightness')}
            options={brightSources}
            value={config.display.brightMethod[props.num]}
            onChange={(val: number) => dispatch(cf.DisplayBrightMethodChange({num: props.num, val: val}))}
        />

        {/* Brightess by sunrise and sunset */}
        {config.display.brightMethod[props.num] === 0 && <>
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

        {/* Brightess by light sensor */}
        {config.display.brightMethod[props.num] === 1 && <div className="my-8">
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
                onChange={(val) => dispatch(cf.DisplaySensitivityChange({num: props.num, val: val}))}
                className="mt-2"
            />
            <div className="mt-4 text-end">
                {i18n.t('brightness')}:
                <Indication error={false} value={isNaN(brightness) ? '--' : brightness + '%'} />
            </div>
        </div>}
    </>} />
}

export default CardDisplayBrightness;