import { useState } from 'react';
import { useSelector } from 'react-redux';
import humanizeDuration from 'humanize-duration';
import i18n from '../../i18n/main';
import hostUrl from "../../atoms/hostUrl";
import { iConfig } from "../../redux/configTypes";
import Card from "../../atoms/card";
import SelectSwitch from "../../atoms/selectSwitch";
import ButtonPlay from '../../atoms/buttonPlay';
import ButtonStop from '../../atoms/buttonStop';

export default function CardSoundListen() {
    const [hourly, setHourly] = useState<number>(0);
    const [melody, setMelody] = useState<number>(0);

    const config = useSelector((state: iConfig) => state.config);
    const locale = config.lang === 'ua' ? 'uk' : config.lang;
    
    let clockSounds = [];
    for(let i=0; i<24; i++) {
        clockSounds.push(humanizeDuration(i * 3600000, { language: locale, units: ["h"]}));
    }

    const sendPlayHourly = () => {
        let url = `${hostUrl()}/esp/mp3play`;
        url += `?folder=1&track=${String(hourly === 24 ? 25 : hourly)}`;
        url += `&code=${localStorage.getItem('code') || '0'}`;
        fetch(url);
    }

    const sendPlayMelody = () => {
        let url = `${hostUrl()}/esp/mp3play`;
        url += `?folder=2&track=${String(melody)}`;
        url += `&code=${localStorage.getItem('code') || '0'}`;
        fetch(url);
    }

    return <Card content={<>
        <p className="mb-4">{i18n.t('listenToTheSoundOfTheClock')}</p>
        <div className="flex w-full items-center">
            <SelectSwitch label={i18n.t('melody')}
                options={clockSounds}
                value={hourly}
                onChange={val => setHourly(val)}
            />
            <ButtonPlay play={() => sendPlayHourly()} />
            <ButtonStop />
        </div>

        <p className="mt-8 mb-4">{i18n.t('listenToAlarmMelodies')}</p>
        <div className="flex w-full items-center">
            <SelectSwitch label={i18n.t('melody')}
                options={[...Array(20)].map((x, i) => `${i18n.t('melody')} ${i + 1}`)}
                value={melody}
                onChange={val => setMelody(val)}
            />
            <ButtonPlay play={() => sendPlayMelody()} />
            <ButtonStop />
        </div>
    </>} />
}