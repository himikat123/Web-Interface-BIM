import i18n from '../i18n/main';
import ThreeColumns from "../templates/threeColumns";
import CardClockTime from "../organisms/clock/cardClockTime";
import CardClockNtp from "../organisms/clock/cardClockNtp";
import CardClockSet from "../organisms/clock/cardClockSet";

export default function Clock() {
    const content = <>
        <CardClockTime />
        <CardClockNtp />
        <CardClockSet />
    </>

    return <ThreeColumns navbar={true}
        header={[i18n.t('clock')]} 
        content={[content]} 
        buttons={['save', 'reset']} 
    />
}