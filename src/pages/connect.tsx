import React from "react";
import ThreeColumns from "../templates/threeColumns";
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../i18n/main';
import Card from "../atoms/card";
import NetworkInput from "../atoms/networkInput";
import PasswordInput from "../atoms/passwordInput";
import { iConfig } from "../redux/configTypes";

const Connect = () => {
    const dispatch = useDispatch();
    const ssid = useSelector((state: iConfig) => state.config.network.ssid);
    const pass = useSelector((state: iConfig) => state.config.network.pass);

    const content = <>
        {[...Array(3)].map((x, i: number) => {return <Card key={'n' + i} content={<>
            <NetworkInput 
                label={i18n.t('networkName')}
                value={ssid[i]}
                required={i == 0 ? true : false}
                onChange={ () => {} }
                isValid={ () => {} }
            />
            <div className="my-8" />
            <PasswordInput 
                label={i18n.t('password')}
                value={pass[i]}
                onChange={ () => {} }
                isValid={ () => {} }
            />
        </>} />})}
    </>;

    return (<>
        <ThreeColumns header={i18n.t('connections')} content={content} navbar={true} buttons={['save', 'reset']} />
    </>);
}

export default Connect;