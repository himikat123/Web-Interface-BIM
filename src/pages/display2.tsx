import React from "react";
import FourColumns from "../templates/fourColumns";
import i18n from '../i18n/main';
import CardDisplayType from "../organisms/cardDisplayType";
import CardDisplayBrightness from "../organisms/cardDisplayBrightness";
import CardDisplayAutoOff from "../organisms/cardDisplayAutoOff";
import CardDisplayAnimation from "../organisms/cardDisplayAnimation";
import CardDisplayTimeSlot from "../organisms/cardDisplayTimeSlot";

const Display2 = () => {
    const row1 = <>
        <CardDisplayType num={1} />
        <CardDisplayBrightness num={1} />
        <CardDisplayAutoOff num={1} />
        <CardDisplayAnimation num={1} />
    </>

    const row2 = <>
        {[...Array(4)].map((x, i) => <CardDisplayTimeSlot key={i} slot={i} num={1} />)}
    </>

    const row3 = <>
        {[...Array(4)].map((x, i) => <CardDisplayTimeSlot key={i} slot={i + 4} num={1} />)}
    </>

    return <>
        <FourColumns navbar={true}
            header={[i18n.t('display.singular') + " 2"]} 
            content={[row1, row2, row3]} 
            buttons={['save', 'reset']} 
        />
    </>
}

export default Display2;