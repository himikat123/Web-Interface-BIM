import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import RangeInput from "../../atoms/rangeInput";
import * as cf from "../../redux/slices/config";
import { iConfig } from "../../redux/configTypes";

export default function SequenceDuration() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <RangeInput value={config.display.source.sequence?.dur ?? 0}
        label={i18n.t('displayDuration')}
        min={1}
        max={20}
        limitMin={1}
        limitMax={20}
        step={1}
        indication={String(config.display.source.sequence?.dur ?? 0)}
        onChange={val => dispatch(cf.displaySourceSequenceDurChange(val))}
    />
}