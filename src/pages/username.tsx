import React, { useState } from "react";
import OneColumn from "../templates/oneColumn";
import { useSelector, useDispatch } from 'react-redux';
import { usernameChange } from '../redux/slices/config';
import i18n from '../i18n/main';
import Card from "../atoms/card";
import TextInput from "../atoms/textInput";
import { iConfig } from '../redux/configTypes';

const Username = () => {
    const [usernameValid, setUsernameValid] = useState<boolean>(false);
    const username = useSelector((state: iConfig) => state.config.account.name);
    const required = useSelector((state: iConfig) => state.config.account.required);
    const dispatch = useDispatch();

    const content = <>
        <Card content={
            <TextInput label={i18n.t('username')} 
                id="username" 
                value={username}
                required
                pattern={/[^a-zA-Z0-9*()_.@$%]+/g}
                title={i18n.t('tips.tip1')}
                onChange={(value: string) => dispatch(usernameChange(value)) }
                isValid={(valid: boolean) => setUsernameValid(valid) }
            />
        } />
        <Card content={<>{required}</>} />
    </>;

    return (<>
        <OneColumn header={i18n.t('username')} content={content} navbar={true} buttons={[usernameValid ? 'save' : 'nsave', 'reset']} />
    </>);
}

export default Username;