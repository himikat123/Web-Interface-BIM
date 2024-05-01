import { useState, useEffect } from "react";
import i18n from '../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import FourColumns from "../templates/fourColumns";
import { iConfig } from "../redux/configTypes";
import { sendThingspeakValidChange } from "../redux/slices/valid";
import CardThingSendOnOff from "../organisms/cardThingSendOnOff";
import CardThingSendPeriod from "../organisms/cardThingSendPeriod";
import CardThingSendCHID from "../organisms/cardThingSendCHID";
import CardThingWrKey from "../organisms/cardThingWrKey";
import CardThingSendData from "../organisms/cardThingSendData";

export default function SendThingspeak() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const [isValid, setIsValid] = useState<boolean[]>([]);

    useEffect(() => {
        dispatch(sendThingspeakValidChange(!isValid.includes(false)));
    });

    const content = <>
        {/* On/Off */}
        <CardThingSendOnOff />

        {config.thingspeakSend.period > 0 && <>
            {/* Period */}
            <CardThingSendPeriod isValid={isValid}
                setIsValid={setIsValid}
            />

            {/* Channel ID */}
            <CardThingSendCHID isValid={isValid}
                setIsValid={setIsValid}
            />

            {/* Write API Key */}
            <CardThingWrKey />

            {/* Data to send */}
            {[...Array(8)].map((x, i) => <CardThingSendData key={i} num={i} />)}
        </>}
    </>

    return <FourColumns navbar={true}
        header={[i18n.t('sendToThingspeak')]} 
        content={[content]} 
        buttons={['save', 'reset']} 
    />
}