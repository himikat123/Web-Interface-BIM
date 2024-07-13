import FourColumns from "../templates/fourColumns";
import i18n from '../i18n/main';
import CardAlarm from "../organisms/cardAlarm";

export default function Alarm() {
    const content = <>
        {[...Array(12)].map((x, i) => <CardAlarm key={i} num={i} />)}
    </>

    return <FourColumns navbar={true}
        header={[i18n.t('alarm')]} 
        content={[content]} 
        buttons={['save', 'reset']} 
    />
}