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

    const units = config.units.temp ? '°F' : '°C';
    const maxTemp = config.units.temp ? 200 : 100;
    const maxHyst = config.units.temp ? 20 : 10;

    return <>
        {/* Max temperature */}
        <RangeInput label={i18n.t('tempMax')}
            value={tMax}
            min={-50}
            max={maxTemp}
            limitMin={tMin}
            limitMax={maxTemp}
            step={0.1}
            indication={`${tMax.toFixed(1)}${units}`}
            onChange={val => dispatch(cf.comfortTempMaxChange({ num: 0, val: val }))}
            className="mt-4"
        />

        {device() === 'WeatherMonitorBIM32' && <>
            {/* Max temperature hysteresis */}
            <RangeInput label={i18n.t('hysteresis')}
                value={hisMax}
                min={0}
                max={maxHyst}
                limitMin={0}
                limitMax={maxHyst}
                step={0.1}
                indication={`±${(hisMax / 2).toFixed(2)}${units}`}
                onChange={val => dispatch(cf.comfortTempMaxChange({ num: 1, val: val }))}
                className="mt-4"
            />

            {/* Explication */}
            <div className="mt-4 select-none text-green-500 dark:text-green-200">
                <div>{i18n.t('conditioner')}</div>
                <div>{i18n.t('on')}: &gt; {(tMax + (hisMax / 2)).toFixed(2)}{units}</div>
                <div>{i18n.t('off')}: &lt; {(tMax - (hisMax / 2)).toFixed(2)}{units}</div>
            </div>
        </>}
    </>
}