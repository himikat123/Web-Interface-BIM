import i18n from '../i18n/main';
import TwoColumns from "../templates/twoColumns";
import Card from "../atoms/card";
import CardStatusDisplay from '../organisms/cardStatusDisplay';
import CardStatusSystem from '../organisms/cardStatusSystem';
import CardStatusNetwork from '../organisms/cardStatusNetwork';

export default function Status() {
    const content = <>
        <Card content={<CardStatusDisplay num={0} />} />
        <Card content={<CardStatusDisplay num={1} />} />
        <Card content={<CardStatusSystem />} />
        <Card content={<CardStatusNetwork />} />
    </>;

    return <TwoColumns header={[i18n.t('status')]} 
        content={[content]} 
        navbar={true}
        buttons={['reset']} 
    />
}