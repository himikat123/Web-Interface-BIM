import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import device from "../../device";
import RangeInput from "../../atoms/rangeInput";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";

export default function ComfortTempMin() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const tMin = Array.isArray(config.comfort.temp.min) 
        ? config.comfort.temp.min[0] 
        : config.comfort.temp.min;

    const tMax = Array.isArray(config.comfort.temp.max) 
        ? config.comfort.temp.max[0] 
        : config.comfort.temp.max;

    const hisMin = Array.isArray(config.comfort.temp.min) 
        ? config.comfort.temp.min[1] 
        : tMin;

    return <>
        {/* Min temperature */}
        <RangeInput label={i18n.t('tempMin')}
            value={tMin}
            min={-50}
            max={100}
            limitMin={-50}
            limitMax={tMax}
            step={0.1}
            indication={`${tMin.toFixed(1)}°C`}
            onChange={val => dispatch(cf.comfortTempMinChange({ num: 0, val: val }))}
            className="mt-4"
        />

        {device() === 'WeatherMonitorBIM32' && <>
            {/* Min temperature hysteresis */}
            <RangeInput label={i18n.t('hysteresis')}
                value={hisMin}
                min={0}
                max={10}
                limitMin={0}
                limitMax={10}
                step={0.1}
                indication={`±${(hisMin / 2).toFixed(2)}°C`}
                onChange={val => dispatch(cf.comfortTempMinChange({ num: 1, val: val }))}
                className="mt-4"
            />

            {/* Explication */}
            <div className="mt-4 select-none text-green-500 dark:text-green-200">
                <div>{i18n.t('heater')}</div>
                <div>{i18n.t('on')}: &lt; {(tMin - (hisMin / 2)).toFixed(2)}°C</div>
                <div>{i18n.t('off')}: &gt; {(tMin + (hisMin / 2)).toFixed(2)}°C</div>
            </div>
        </>}
    </>
}