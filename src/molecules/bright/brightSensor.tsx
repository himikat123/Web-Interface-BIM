import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import hostUrl from "../../atoms/hostUrl";
import SelectSwitch from "../../atoms/selectSwitch";
import RangeInput from "../../atoms/rangeInput";
import Indication from "../../atoms/indication";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import { iDisplay } from "../../interfaces";
import * as cf from "../../redux/slices/config";
import * as vl from "../../atoms/validateValues";

export default function BrightSensor(props: iDisplay) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const analogData =  vl.validateAnalogVoltage(data.analog.volt) ? (data.analog.volt + config.sensors.analog.v) : null;
    const max44009Data = vl.validateLight(data.max44009.light) ? (data.max44009.light + config.sensors.max44009.l) : null; 
    const bh1750Data = vl.validateLight(data.bh1750.light) ? (data.bh1750.light + config.sensors.bh1750.l) : null;

    let sensorData = null;
    switch(config.display.lightSensor[props.num]) {
        case 0: sensorData = analogData; break;
        case 1: sensorData = max44009Data; break; 
        case 2: sensorData = bh1750Data; break;
    }
    let brightness = config.display.lightSensor[props.num] === 0 ? (sensorData ?? 0) * 30 : sensorData ?? 0;
    brightness *= config.display.sensitivity[props.num] / 20;
    if(brightness < 1) brightness = 1;
    if(brightness > 100) brightness = 100;
    brightness = Math.round(brightness);

    const lightSensors = [
        `${i18n.t('analogInput')} (${analogData ? (analogData.toFixed(2) + i18n.t('units.v')) : '--'})`,
        `MAX44009 (${max44009Data ? (max44009Data.toFixed(2) + i18n.t('units.lux')) : '--'})`,
        `BH1750 (${bh1750Data ? (bh1750Data.toFixed(2) + i18n.t('units.lux')) : '--'})`
    ];

    const sendSensitivity = (bright: number) => {
        let url = `${hostUrl()}/esp/sensitivity`;
        url += `?bright=${String(bright)}`;
        url += `&num=${props.num}`;
        url += `&code=${localStorage.getItem('code') || '0'}`
        fetch(url);
    }

    return <div className="my-8">
        <SelectSwitch label={i18n.t('sensorType')}
            options={lightSensors}
            value={config.display.lightSensor[props.num]}
            onChange={(val: number) => dispatch(cf.displayLightSensorChange({num: props.num, val: val}))}
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
                dispatch(cf.displaySensitivityChange({num: props.num, val: val}));
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