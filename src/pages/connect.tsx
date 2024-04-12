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
import * as cf from "../redux/slices/config";

export default function Connect() {
    const [isValid, setIsValid] = useState<boolean[]>([]);
    const [netListOpen, setNetListOpen] = useState<boolean[]>([false, false, false]);
    
    useEffect(() => {
        dispatch(connectValidChange(!isValid.includes(false)));
    });

    const ipPattern = /\b(([01]?\d?\d|2[0-4]\d|25[0-5])\.){3}([01]?\d?\d|2[0-4]\d|25[0-5])$\b/;
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

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

    const changeIp = (value: string) => dispatch(cf.netIpChange(value));
    const changeMask = (value: string) => dispatch(cf.netMaskChange(value));
    const changeGw = (value: string) => dispatch(cf.netGwChange(value));
    const changeDns1 = (value: string) => dispatch(cf.netDns1Change(value));
    const changeDns2 = (value: string) => dispatch(cf.netDns2Change(value));

    const content1 = <>
        {[...Array(3)].map((x, i: number) => {
            return <Card key={'n' + i} header={i18n.t('network') + ' ' + String(i + 1)} content={<>
                <NetworkInput label={i18n.t('networkName')}
                    value={config.network.ssid ? config.network.ssid[i] : ''}
                    maxLength={32}
                    required={i === 0 ? true : false}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(cf.netSsidChange({val: e.target.value, num: i}))}
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
                    value={config.network.pass ? config.network.pass[i] : ''}
                    maxLength={32}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(cf.netPassChange({val: e.target.value, num: i}))}
                />

                {netListOpen[i] && <ModalNetList 
                    ssidSelect={(ssid: string) => {
                        dispatch(cf.netSsidChange({val: ssid, num: i}))
                    }} 
                    modalClose={() => {
                        let nl = netListOpen;
                        nl[i] = false;
                        setNetListOpen(() => [...nl]);
                        document.querySelector('body')?.classList.remove('modal-open');
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
                value={config.network.type}
                onChange={(o: number) => dispatch(cf.netTypeSwitch(o))}
            />
        } />

        <Card content={<>
            {config.network.type 
                ? ipField(i18n.t('ipAddress'), config.network.ip, 3, changeIp)
                : <TextInput label={i18n.t('ipAddress')} value={data.network.ip} readonly />
            }
            <div className="my-8" />
            {config.network.type
                ? ipField(i18n.t('subnetMask'), config.network.mask, 4, changeMask)
                : <TextInput label={i18n.t('subnetMask')} value={data.network.mask} readonly />
            }
            <div className="my-8" />
            {config.network.type
                ? ipField(i18n.t('defaultGateway'), config.network.gw, 5, changeGw)
                : <TextInput label={i18n.t('defaultGateway')} value={data.network.gw} readonly />
            }
        </>} />

        <Card content={<>
            {config.network.type
                ? ipField(i18n.t('preferredDns'), config.network.dns1, 6, changeDns1)
                : <TextInput label={i18n.t('preferredDns')} value={data.network.dns1} readonly />
            }
            <div className="my-8" />
            {config.network.type
                ? ipField(i18n.t('alternativeDns'), config.network.dns2, 7, changeDns2)
                : <TextInput label={i18n.t('alternativeDns')} value={data.network.dns2} readonly />
            }
        </>} />
    </>

    return <ThreeColumns navbar={true}
        header={[
            i18n.t('connections'), 
            i18n.t('connectionOptions')
        ]} 
        content={[content1, content2]} 
        buttons={['save', 'reset']} 
    />
}