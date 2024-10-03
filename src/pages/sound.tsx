import i18n from '../i18n/main';
import CardSoundVolume from "../organisms/sound/cardSoundVolume";
import CardSoundEqualizer from "../organisms/sound/cardSoundEqualizer";
import CardSoundHourlySignal from "../organisms/sound/cardSoundHourlySignal";
import CardSoundListen from "../organisms/sound/cardSoundListen";
import TwoColumns from "../templates/twoColumns";

export default function Sound() {
    const content = <>
        <CardSoundVolume />
        <CardSoundEqualizer />
        <CardSoundHourlySignal />
        <CardSoundListen />
    </>;

    return <TwoColumns header={[i18n.t('sound')]} 
        content={[content]} 
        navbar={true} 
        buttons={['save', 'reset']} 
    />
}