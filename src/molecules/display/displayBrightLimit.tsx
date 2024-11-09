import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import { displayBrightMaxChange, displayBrightMinChange } from "../../redux/slices/config";
import hostUrl from "../../atoms/hostUrl";
import RangeInput from "../../atoms/rangeInput";
import { iConfig } from "../../redux/configTypes";

export default function DisplayBrightLimit(props: {num: number}) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const sendLimits = (newVal: number, type: string) => {
        let url = `${hostUrl()}/esp/brightLimit`;
        url += `?min=${type === 'min' ? newVal : config.display.brightness.min[props.num]}`;
        url += `&max=${type === 'max' ? newVal : config.display.brightness.max[props.num]}`;
        url += `&num=${props.num}`;
        url += `&code=${localStorage.getItem('code') || '0'}`;
        fetch(url);
    }

    return <>
        <RangeInput value={config.display.brightness.max[props.num]}
            label={i18n.t('maximumBrightnessLimit')}
            min={0}
            max={255}
            limitMin={config.display.brightness.min[props.num]}
            limitMax={255}
            step={1}
            indication={String(config.display.brightness.max[props.num])}
            onChange={val => {
                dispatch(displayBrightMaxChange({num: props.num, val: val}));
                sendLimits(val, 'max');
            }}
            className="mt-2"
        />

        <RangeInput value={config.display.brightness.min[props.num]}
            label={i18n.t('minimumBrightnessLimit')}
            min={0}
            max={255}
            limitMin={0}
            limitMax={config.display.brightness.max[props.num]}
            step={1}
            indication={String(config.display.brightness.min[props.num])}
            onChange={val => {
                dispatch(displayBrightMinChange({num: props.num, val: val}));
                sendLimits(val, 'min');
            }}
            className="mt-4"
        />
    </>
}