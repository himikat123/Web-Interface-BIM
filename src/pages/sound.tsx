import React from "react";
import i18n from '../i18n/main';
import CardSoundVolume from "../organisms/cardSoundVolume";
import CardSoundEqualizer from "../organisms/cardSoundEqualizer";
import CardSoundHourlySignal from "../organisms/cardHourlySignal";
import CardSoundListen from "../organisms/cardSoundListen";
import TwoColumns from "../templates/twoColumns";

const Sound = () => {
    const content = <>
        <CardSoundVolume />
        <CardSoundEqualizer />
        <CardSoundHourlySignal />
        <CardSoundListen />
    </>;

    return (<>
        <TwoColumns header={[i18n.t('sound')]} 
            content={[content]} 
            navbar={true} 
            buttons={['save', 'reset']} 
        />
    </>);
}

export default Sound;