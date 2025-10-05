import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import { displayBrightMaxChange, displayBrightMinChange } from "../../redux/slices/config";
import hostUrl from "../../atoms/hostUrl";
import RangeInput from "../../atoms/rangeInput";
import { iConfig } from "../../redux/configTypes";

export default function DisplayBrightLimit(props: {num: number}) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const brMin = Array.isArray(config.display.brightness.min)
        ? config.display.brightness.min[props.num]
        : config.display.brightness.min;
    const brMax = Array.isArray(config.display.brightness.max)
        ? config.display.brightness.max[props.num]
        : config.display.brightness.max;

    const sendLimits = () => {
        let url = `${hostUrl()}/esp/brightLimit`;
        url += `?min=${brMin}`;
        url += `&max=${brMax}`;
        url += `&num=${props.num}`;
        url += `&code=${localStorage.getItem('code') || '0'}`;
        fetch(url);
    }

    return <>
        <RangeInput value={brMax ?? 0}
            label={i18n.t('maximumBrightnessLimit')}
            min={0}
            max={255}
            limitMin={brMin ?? 0}
            limitMax={255}
            step={1}
            indication={String(brMax)}
            onChange={val => dispatch(displayBrightMaxChange({num: props.num, val: val})) }
            onRelese={() => sendLimits()}
            className="mt-2"
        />

        <RangeInput value={brMin ?? 0}
            label={i18n.t('minimumBrightnessLimit')}
            min={0}
            max={255}
            limitMin={0}
            limitMax={brMax ?? 0}
            step={1}
            indication={String(brMin)}
            onChange={val => dispatch(displayBrightMinChange({num: props.num, val: val})) }
            onRelese={() => sendLimits()}
            className="mt-4"
        />
    </>
}