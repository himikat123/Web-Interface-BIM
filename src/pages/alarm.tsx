import React from "react";
import FourColumns from "../templates/fourColumns";
import i18n from '../i18n/main';
import CardAlarm from "../organisms/cardAlarm";

const Alarm = () => {
    const content = <>
        {[...Array(12)].map((x, i) => <CardAlarm num={i} />)}
    </>

    return <>
        <FourColumns navbar={true}
            header={[i18n.t('alarm') + " 2"]} 
            content={[content]} 
            buttons={['save', 'reset']} 
        />
    </>
}

export default Alarm;