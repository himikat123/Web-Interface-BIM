import React from "react";
import TwoColumns from "../templates/twoColumns";
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../i18n/main';
import Card from "../atoms/card";
import { iState } from '../redux/configTypes';

const Username = () => {
    const username = useSelector((state: iState) => state.config.account?.name);
    const dispatch = useDispatch();

    const content = <>
        <Card content={<>{username}</>} />
        <Card content={<>{username}</>} />
    </>;

    return (<>
        <TwoColumns header={i18n.t('username')} content={content} navbar={true} buttons={['save', 'reset']} />
    </>);
}

export default Username;