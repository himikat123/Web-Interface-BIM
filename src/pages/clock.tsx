import i18n from '../i18n/main';
import ThreeColumns from "../templates/threeColumns";
import CardClockTime from "../organisms/cardClockTime";
import CardClockNtp from "../organisms/cardClockNtp";
import CardClockSet from "../organisms/cardClockSet";

export default function Clock() {
    // TODO отключить запрос данных, чтоб диалог синхронизации был живее
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