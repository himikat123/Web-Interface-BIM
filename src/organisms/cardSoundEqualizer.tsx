import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import hostUrl from "../atoms/hostUrl";
import Card from "../atoms/card";
import Button from "../atoms/button";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";

export default function CardSoundEqualizer() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    
    const btnActive = 'bg-green-600 hover:bg-green-700';
    const btnPassive = 'bg-gray-600 hover:bg-gray-700';

    const equalizers = ["NORMAL", "POP", "ROCK", "JAZZ", "CLASSIC", "BASS"];

    const changeEQ = (eq: number) => {
        dispatch(cf.soundEqChange(eq));
        let url = `${hostUrl()}/esp/equalizer`;
        url += `?eq=${String(eq)}`;
        url += `&code=${localStorage.getItem('code') || '0'}`;
        fetch(url);
    }

    return <Card header={i18n.t('equalizer')}
        content={<div className="grid grid-cols-2 gap-2">
            {equalizers.map((eq, i) => <Button key={eq}
                label={eq}
                className={'text-text_dark ' + (config.sound.eq === i ? btnActive : btnPassive)}
                onClick={() => changeEQ(i)}
            />)}
        </div>} 
    />
}