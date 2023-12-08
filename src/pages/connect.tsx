import React, { useEffect, useState} from "react";
import ThreeColumns from "../templates/threeColumns";
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../i18n/main';
import Card from "../atoms/card";
import TextInput from "../atoms/textInput";
import NetworkInput from "../atoms/networkInput";
import PasswordInput from "../atoms/passwordInput";
import SelectSwitch from "../atoms/selectSwitch";
import ModalNetList from "./modalNetList";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import { connectValidChange } from "../redux/slices/valid";
import { 
    netSsidChange, 
    netPassChange, 
    netTypeSwitch, 
    netIpChange, 
    netMaskChange, 
    netGwChange, 
    netDns1Change, 
    netDns2Change 
} from "../redux/slices/config";

const Connect = () => {
    const [isValid, setIsValid] = useState<boolean[]>([]);
    const [netListOpen, setNetListOpen] = useState<boolean[]>([false, false, false]);
    
    useEffect(() => {
        dispatch(connectValidChange(!isValid.includes(false)));
    });

    const ipPattern = /\b(([01]?\d?\d|2[0-4]\d|25[0-5])\.){3}([01]?\d?\d|2[0-4]\d|25[0-5])$\b/;
    const dispatch = useDispatch();
    const ssid = useSelector((state: iConfig) => state.config.network.ssid);
    const pass = useSelector((state: iConfig) => state.config.network.pass);
    const type = useSelector((state: iConfig) => state.config.network.type);
    const staticIp = useSelector((state: iConfig) => state.config.network.ip);
    const staticMask = useSelector((state: iConfig) => state.config.network.mask);
    const staticGw = useSelector((state: iConfig) => state.config.network.gw);
    const staticDns1 = useSelector((state: iConfig) => state.config.network.dns1);
    const staticDns2 = useSelector((state: iConfig) => state.config.network.dns2);
    const dynamicIp = useSelector((state: iData) => state.data.network.ip);
    const dynamicMask = useSelector((state: iData) => state.data.network.mask);
    const dynamicGw = useSelector((state: iData) => state.data.network.gw);
    const dynamicDns1 = useSelector((state: iData) => state.data.network.dns1);
    const dynamicDns2 = useSelector((state: iData) => state.data.network.dns2);

    const ipField = (label: string, value: string, validNum: number, change: (e: string) => void) => {
        return <TextInput label={label}
            pattern={[ipPattern, true]}
            value={value}
            maxLength={15}
            tip={i18n.t('wrongFormat')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => change(e.target.value)}
            isValid={(valid: boolean) => {
                let nv = isValid;
                nv[validNum] = valid;
                setIsValid(nv);
            }}
        />
    }

    const changeIp = (value: string) => {
        dispatch(netIpChange(value));
    }
    const changeMask = (value: string) => {
        dispatch(netMaskChange(value));
    }
    const changeGw = (value: string) => {
        dispatch(netGwChange(value));
    }
    const changeDns1 = (value: string) => {
        dispatch(netDns1Change(value));
    }
    const changeDns2 = (value: string) => {
        dispatch(netDns2Change(value));
    }

    const content1 = <>
        {[...Array(3)].map((x, i: number) => {
            return <Card key={'n' + i} header={i18n.t('network') + ' ' + String(i + 1)} content={<>
                <NetworkInput label={i18n.t('networkName')}
                    value={ssid ? ssid[i] : ''}
                    maxLength={32}
                    required={i === 0 ? true : false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(netSsidChange({val: e.target.value, num: i}))}
                    isValid={(valid: boolean) => {
                        let nv = isValid;
                        nv[i] = valid;
                        setIsValid(nv);
                    }}
                    openList={() => {
                        let nl = netListOpen;
                        nl[i] = true;
                        setNetListOpen(() => [...nl]);
                    }}
                />

                <div className="my-8" />

                <PasswordInput label={i18n.t('password')}
                    value={pass ? pass[i] : ''}
                    maxLength={32}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(netPassChange({val: e.target.value, num: i}))}
                />

                {netListOpen[i] && <ModalNetList 
                    ssidSelect={(ssid: string) => {
                        dispatch(netSsidChange({val: ssid, num: i}))
                    }} 
                    modalClose={() => {
                        let nl = netListOpen;
                        nl[i] = false;
                        setNetListOpen(() => [...nl]);
                    }} 
                />}
            </>} />
        })}
    </>;

    const content2 = <>
        <Card content={
            <SelectSwitch label={i18n.t('connectionType')}
                options={[
                    i18n.t('dynamicIp'), 
                    i18n.t('staticIp')
                ]}
                value={type}
                onChange={(o: number) => dispatch(netTypeSwitch(o))}
            />
        } />

        <Card content={<>
            {type 
                ? ipField(i18n.t('ipAddress'), staticIp, 3, changeIp)
                : <TextInput label={i18n.t('ipAddress')} value={dynamicIp} readonly />
            }
            <div className="my-8" />
            {type
                ? ipField(i18n.t('subnetMask'), staticMask, 4, changeMask)
                : <TextInput label={i18n.t('subnetMask')} value={dynamicMask} readonly />
            }
            <div className="my-8" />
            {type
                ? ipField(i18n.t('defaultGateway'), staticGw, 5, changeGw)
                : <TextInput label={i18n.t('defaultGateway')} value={dynamicGw} readonly />
            }
        </>} />

        <Card content={<>
            {type
                ? ipField(i18n.t('preferredDns'), staticDns1, 6, changeDns1)
                : <TextInput label={i18n.t('preferredDns')} value={dynamicDns2} readonly />
            }
            <div className="my-8" />
            {type
                ? ipField(i18n.t('alternativeDns'), staticDns2, 7, changeDns2)
                : <TextInput label={i18n.t('alternativeDns')} value={dynamicDns2} readonly />
            }
        </>} />
    </>;

    return <ThreeColumns navbar={true}
        header={[
            i18n.t('connections'), 
            i18n.t('connectionOptions')
        ]} 
        content={[content1, content2]} 
        buttons={['save', 'reset']} 
    />
}

export default Connect;