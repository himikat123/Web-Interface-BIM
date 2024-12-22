import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import device from "../../device";
import RangeInput from "../../atoms/rangeInput";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";

export default function ComfortHumMin() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const hMin = Array.isArray(config.comfort.hum.min) 
        ? config.comfort.hum.min[0] 
        : config.comfort.hum.min;

    const hMax = Array.isArray(config.comfort.hum.max) 
        ? config.comfort.hum.max[0] 
        : config.comfort.hum.max;

    const hisMin = Array.isArray(config.comfort.hum.min) 
        ? config.comfort.hum.min[1] 
        : hMin;

    return <>
        {/* Min Humidity */}
        <RangeInput label={i18n.t('humMin')}
            value={hMin}
            min={0}
            max={100}
            limitMin={0}
            limitMax={hMax}
            step={0.1}
            indication={`${hMin.toFixed(1)}%`}
            onChange={val => dispatch(cf.comfortHumMinChange({ num: 0, val: val }))}
            className="mt-4"
        />

        {device() === 'WeatherMonitorBIM32' && <>
            {/* Min Humidity hysteresis */}
            <RangeInput label={i18n.t('hysteresis')}
                value={hisMin}
                min={0}
                max={10}
                limitMin={0}
                limitMax={10}
                step={0.1}
                indication={`±${(hisMin / 2).toFixed(2)}%`}
                onChange={val => dispatch(cf.comfortHumMinChange({ num: 1, val: val }))}
                className="mt-4"
            />

            {/* Explication */}
            <div className="mt-4 select-none text-green-500 dark:text-green-200">
                <div>{i18n.t('humidifier')}</div>
                <div>{i18n.t('on')}: &lt; {(hMin - (hisMin / 2)).toFixed(2)}%</div>
                <div>{i18n.t('off')}: &gt; {(hMin + (hisMin / 2)).toFixed(2)}%</div>
            </div>
        </>}
    </>
}