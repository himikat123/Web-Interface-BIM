import i18n from '../i18n/main';
import CardSoundVolume from "../organisms/cardSoundVolume";
import CardSoundEqualizer from "../organisms/cardSoundEqualizer";
import CardSoundHourlySignal from "../organisms/cardHourlySignal";
import CardSoundListen from "../organisms/cardSoundListen";
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