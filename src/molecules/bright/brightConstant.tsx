import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import hostUrl from "../../atoms/hostUrl";
import type { iConfig } from "../../redux/configTypes";
import type { iDisplay } from "../../interfaces";
import RangeInput from "../../atoms/rangeInput";
import * as cf from "../../redux/slices/config";

export default function BrightConstant(props: iDisplay) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const br = Array.isArray(config.display.brightness.day)
        ? config.display.brightness.day[props.num]
        : config.display.brightness.day;

    const sendBright = () => {
        let url = `${hostUrl()}/esp/bright`;
        url += `?bright=${String(br)}`;
        url += `&num=${props.num}`;
        url += `&code=${localStorage.getItem('code') || '0'}`;
        fetch(url);
    }

    return <RangeInput value={br}
        label={i18n.t('brightness')}
        min={1}
        max={100}
        limitMin={1}
        limitMax={100}
        step={1}
        indication={String(br)}
        onChange={val => dispatch(cf.displayBrightDayChange({num: props.num, val: val}))}
        onRelese={() => sendBright()}
        className="mt-4"
    />
}