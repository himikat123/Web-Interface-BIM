import React, { useState, useEffect } from "react";
import OneColumn from "../templates/oneColumn";
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../i18n/main';
import Card from "../atoms/card";
import TextInput from "../atoms/textInput";
import PasswordInput from "../atoms/passwordInput";
import { iConfig } from "../redux/configTypes";
import { accesspointValidChange } from "../redux/slices/valid";
import { acPointSsidChange, acPointPassChange } from "../redux/slices/config";

export default function AccessPoint() {
    const [isValid, setIsValid] = useState<boolean[]>([]);

    useEffect(() => {
        dispatch(accesspointValidChange(!isValid.includes(false)));
    });

    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    
    const content = <Card content={<>
        <TextInput label={i18n.t('accessPointName')} 
            value={config.accessPoint.ssid}
            required
            maxLength={32}
            pattern={[/[^a-zA-Z0-9*() _.@$%]/g, false]}
            tip={i18n.t('tips.tip2')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(acPointSsidChange(e.target.value)) }
            isValid={(valid: boolean) => {
                let nv = isValid;
                nv[0] = valid;
                setIsValid(nv);
            }}
        />

        <div className="my-8" />

        <PasswordInput label={i18n.t('password')}
            value={config.accessPoint.pass}
            pattern={[/[^a-zA-Z0-9*()_.@$%]/g, false]}
            maxLength={32}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(acPointPassChange(e.target.value))}
            tip={i18n.t('tips.tip1')}
            isValid={(valid: boolean) => {
                let nv = isValid;
                nv[1] = valid;
                setIsValid(nv);
            }}
        />
    </>} />;

    return <OneColumn navbar={true}
        header={[i18n.t('accessPoint')]} 
        content={[content]} 
        buttons={['save', 'reset']} 
    />
}