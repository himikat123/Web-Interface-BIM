import React from "react";
import OneColumn from "../templates/oneColumn";
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../i18n/main';
import Card from "../atoms/card";
import RadioSwitch from "../atoms/radioSwitch";

const Connect = () => {
    const dispatch = useDispatch();

    const content = <Card content={<>
        
    </>} />;

    return (<>
        <OneColumn header={i18n.t('connections')} content={content} navbar={true} buttons={['save', 'reset']} />
    </>);
}

export default Connect;