import { useState, useEffect } from "react";
import i18n from '../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import ThreeColumns from "../templates/threeColumns";
import { iConfig } from "../redux/configTypes";
import { sleepValidChange } from "../redux/slices/valid";
import CardSleepOnOff from "../organisms/sleep/cardSleepOnOff";
import CardSleepPeriod from "../organisms/sleep/cardSleepPeriod";
import CardSleepVoltage from "../organisms/sleep/cardSleepVoltage";

export default function SendThingspeak() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const [isValid, setIsValid] = useState<boolean[]>([]);

    useEffect(() => {
        dispatch(sleepValidChange(!isValid.includes(false)));
    });

    const content = <>
        {/* On/Off */}
        <CardSleepOnOff />

        {(config.sleep ?? 0) > 0 && <>
            {/* Period */}
            <CardSleepPeriod isValid={isValid}
                setIsValid={setIsValid}
            />

            {/* Voltage */}
            <CardSleepVoltage />
        </>}
    </>

    return <ThreeColumns navbar={true}
        header={[i18n.t('sleep')]} 
        content={[content]} 
        buttons={['save', 'reset']} 
    />
}