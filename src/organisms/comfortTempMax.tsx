import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import RangeInput from "../atoms/rangeInput";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";

export default function ComfortTempMax() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <>
        {/* Max temperature */}
        <RangeInput label={i18n.t('tempMax')}
            value={config.comfort.temp.max[0]}
            min={-50}
            max={100}
            limitMin={config.comfort.temp.min[0]}
            limitMax={100}
            step={0.1}
            indication={`${config.comfort.temp.max[0].toFixed(1)}°C`}
            onChange={val => dispatch(cf.comfortTempMaxChange({ num: 0, val: val }))}
            className="mt-4"
        />

        {/* Max temperature hysteresis */}
        <RangeInput label={i18n.t('hysteresis')}
            value={config.comfort.temp.max[1]}
            min={0}
            max={10}
            limitMin={0}
            limitMax={10}
            step={0.1}
            indication={`±${(config.comfort.temp.max[1] / 2).toFixed(2)}°C`}
            onChange={val => dispatch(cf.comfortTempMaxChange({ num: 1, val: val }))}
            className="mt-4"
        />
        
        {/* Explication */}
        <div className="mt-4 select-none text-green-500 dark:text-green-200">
            <div>{i18n.t('conditioner')}</div>
            <div>{i18n.t('on')}: &gt; {(config.comfort.temp.max[0] + (config.comfort.temp.max[1] / 2)).toFixed(2)}°C</div>
            <div>{i18n.t('off')}: &lt; {(config.comfort.temp.max[0] - (config.comfort.temp.max[1] / 2)).toFixed(2)}°C</div>
        </div>
    </>
}