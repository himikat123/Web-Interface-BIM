import i18n from '../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import hostUrl from "../atoms/hostUrl";
import Card from "../atoms/card";
import RangeInput from "../atoms/rangeInput";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";

export default function CardSoundVolume() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const sendVolume = (vol: number) => {
        let url = `${hostUrl()}/esp/volume`;
        url += `?vol=${String(vol)}`;
        url += `&code=${localStorage.getItem('code') || '0'}`;
        fetch(url);
    }

    return <Card content={<RangeInput value={config.sound.vol}
        label={i18n.t('volume')}
        min={1}
        max={30}
        limitMin={1}
        limitMax={30}
        step={1}
        indication={String(config.sound.vol)}
        onChange={val => {
            dispatch(cf.soundVolChange(val));
            sendVolume(val);
        }}
    />} />
}