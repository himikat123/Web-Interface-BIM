import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import device from "../../device";
import RangeInput from "../../atoms/rangeInput";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";

export default function ComfortTempMax() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const tMin = Array.isArray(config.comfort.temp.min) 
        ? config.comfort.temp.min[0] 
        : config.comfort.temp.min;

    const tMax = Array.isArray(config.comfort.temp.max) 
        ? config.comfort.temp.max[0] 
        : config.comfort.temp.max;

    const hisMax = Array.isArray(config.comfort.temp.max) 
        ? config.comfort.temp.max[1] 
        : config.comfort.temp.max;

    return <>
        {/* Max temperature */}
        <RangeInput label={i18n.t('tempMax')}
            value={tMax}
            min={-50}
            max={100}
            limitMin={tMin}
            limitMax={100}
            step={0.1}
            indication={`${tMax.toFixed(1)}°C`}
            onChange={val => dispatch(cf.comfortTempMaxChange({ num: 0, val: val }))}
            className="mt-4"
        />

        {device() === 'WeatherMonitorBIM32' && <>
            {/* Max temperature hysteresis */}
            <RangeInput label={i18n.t('hysteresis')}
                value={hisMax}
                min={0}
                max={10}
                limitMin={0}
                limitMax={10}
                step={0.1}
                indication={`±${(hisMax / 2).toFixed(2)}°C`}
                onChange={val => dispatch(cf.comfortTempMaxChange({ num: 1, val: val }))}
                className="mt-4"
            />

            {/* Explication */}
            <div className="mt-4 select-none text-green-500 dark:text-green-200">
                <div>{i18n.t('conditioner')}</div>
                <div>{i18n.t('on')}: &gt; {(tMax + (hisMax / 2)).toFixed(2)}°C</div>
                <div>{i18n.t('off')}: &lt; {(tMax - (hisMax / 2)).toFixed(2)}°C</div>
            </div>
        </>}
    </>
}