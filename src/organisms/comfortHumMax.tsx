import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import RangeInput from "../atoms/rangeInput";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";

export default function ComfortHumMax() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <>
        {/* Max humidity */}
        <RangeInput label={i18n.t('humMax')}
            value={config.comfort.hum.max[0]}
            min={0}
            max={100}
            limitMin={config.comfort.hum.min[0]}
            limitMax={100}
            step={0.1}
            indication={`${config.comfort.hum.max[0].toFixed(1)}%`}
            onChange={val => dispatch(cf.comfortHumMaxChange({ num: 0, val: val }))}
            className="mt-4"
        />

        {/* Max humidity hysteresis */}
        <RangeInput label={i18n.t('hysteresis')}
            value={config.comfort.hum.max[1]}
            min={0}
            max={10}
            limitMin={0}
            limitMax={10}
            step={0.1}
            indication={`±${(config.comfort.hum.max[1] / 2).toFixed(2)}%`}
            onChange={val => dispatch(cf.comfortHumMaxChange({ num: 1, val: val }))}
            className="mt-4"
        />

        {/* Explication */}
        <div className="mt-4 select-none text-green-500 dark:text-green-200">
            <div>{i18n.t('dryer')}</div>
            <div>{i18n.t('on')}: &gt; {(config.comfort.hum.max[0] + (config.comfort.hum.max[1] / 2)).toFixed(2)}%</div>
            <div>{i18n.t('off')}: &lt; {(config.comfort.hum.max[0] - (config.comfort.hum.max[1] / 2)).toFixed(2)}%</div>
        </div>
    </>
}