import i18n from '../i18n/main';
import TwoColumns from "../templates/twoColumns";
import Card from "../atoms/card";
import CardStatusDisplay from '../organisms/cardStatusDisplay';

export default function Status() {
    const content = <>
        <Card content={<CardStatusDisplay num={0} />} />
        <Card content={<CardStatusDisplay num={1} />} />
        <Card content={<div>3</div>} />
        <Card content={<div>4</div>} />
    </>;

    return <TwoColumns header={[i18n.t('status')]} 
        content={[content]} 
        navbar={true} 
    />
}