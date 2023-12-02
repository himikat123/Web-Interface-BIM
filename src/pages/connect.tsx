import React from "react";
import ThreeColumns from "../templates/threeColumns";
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../i18n/main';
import Card from "../atoms/card";
import NetworkInput from "../atoms/networkInput";
import PasswordInput from "../atoms/passwordInput";
import { iConfig } from "../redux/configTypes";
import { netSsidChange } from "../redux/slices/config";
import { netPassChange } from "../redux/slices/config";

const Connect = () => {
    const dispatch = useDispatch();
    const ssid = useSelector((state: iConfig) => state.config.network.ssid);
    const pass = useSelector((state: iConfig) => state.config.network.pass);

    const content = <>
        {[...Array(3)].map((x, i: number) => {
            return <Card key={'n' + i} header={i18n.t('network') + ' ' + String(i + 1)} content={<>
                <NetworkInput 
                    label={i18n.t('networkName')}
                    value={ssid[i]}
                    required={i == 0 ? true : false}
                    onChange={ (e: React.ChangeEvent<HTMLInputElement>) => dispatch(netSsidChange({val: e.target.value, num: i})) }
                    isValid={ () => {} }
                />
                <div className="my-8" />
                <PasswordInput 
                    label={i18n.t('password')}
                    value={pass[i]}
                    onChange={ (e: React.ChangeEvent<HTMLInputElement>) => dispatch(netPassChange({val: e.target.value, num: i})) }
                    isValid={ () => {} }
                />
            </>} />
        })}
    </>;

    return (<>
        <ThreeColumns header={i18n.t('connections')} content={content} navbar={true} buttons={['save', 'reset']} />
    </>);
}

export default Connect;