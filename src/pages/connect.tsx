import React, { useEffect, useState} from "react";
import ThreeColumns from "../templates/threeColumns";
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../i18n/main';
import Card from "../atoms/card";
import NetworkInput from "../atoms/networkInput";
import PasswordInput from "../atoms/passwordInput";
import { iConfig } from "../redux/configTypes";
import { connectValidChange } from "../redux/slices/valid";
import { netSsidChange } from "../redux/slices/config";
import { netPassChange } from "../redux/slices/config";

const Connect = () => {
    const [isValid, setIsValid] = useState<boolean[]>([]);
    
    useEffect(() => {
        dispatch(connectValidChange(!isValid.includes(false)));
    });

    const dispatch = useDispatch();
    const ssid = useSelector((state: iConfig) => state.config.network.ssid);
    const pass = useSelector((state: iConfig) => state.config.network.pass);

    const content = <>
        {[...Array(3)].map((x, i: number) => {
            return <Card key={'n' + i} header={i18n.t('network') + ' ' + String(i + 1)} content={<>
                <NetworkInput 
                    label={i18n.t('networkName')}
                    value={ssid ? ssid[i] : ''}
                    required={i == 0 ? true : false}
                    onChange={ (e: React.ChangeEvent<HTMLInputElement>) => dispatch(netSsidChange({val: e.target.value, num: i})) }
                    isValid={ (valid: boolean) => {
                        let nv = isValid;
                        nv[i] = valid;
                        setIsValid(nv);
                    } }
                />
                <div className="my-8" />
                <PasswordInput 
                    label={i18n.t('password')}
                    value={pass ? pass[i] : ''}
                    onChange={ (e: React.ChangeEvent<HTMLInputElement>) => dispatch(netPassChange({val: e.target.value, num: i})) }
                />
            </>} />
        })}
    </>;

    return (<>
        <ThreeColumns header={i18n.t('connections')} content={content} navbar={true} buttons={['save', 'reset']} />
    </>);
}

export default Connect;