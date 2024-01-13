import React from "react";
import FourColumns from "../templates/fourColumns";
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../i18n/main';
import Card from "../atoms/card";
import CardDisplayType from "../organisms/cardDisplayType";
import CardDisplayBrightness from "../organisms/cardDisplayBrightness";
import CardDisplayAutoOff from "../organisms/cardDisplayAutoOff";
import CardDisplayAnimation from "../organisms/cardDisplayAnimation";

import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as cf from "../redux/slices/config";

const Display1 = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const content1 = <>
        <CardDisplayType num={0} />
        <CardDisplayBrightness num={0} />
        <CardDisplayAutoOff num={0} />
        <CardDisplayAnimation num={0} />
    </>

    return <>
        <FourColumns navbar={true}
            header={[i18n.t('display.singular') + " 1"]} 
            content={[content1]} 
            buttons={['save', 'reset']} 
        />
    </>
}

export default Display1;