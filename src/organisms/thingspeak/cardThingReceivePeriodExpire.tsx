import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import { receiveValidChange } from "../../redux/slices/valid";
import ThingReceivePeriod from "../../molecules/thingspeak/thingReceivePeriod";
import ThingReceiveExpire from "../../molecules/thingspeak/thingReceiveExpire";

export default function CardThingReceivePeriodExpire() {
    const [isValid, setIsValid] = useState<boolean[]>([]);
    const dispatch = useDispatch();
        
    useEffect(() => {
        dispatch(receiveValidChange(!isValid.includes(false)));
    });

    return <Card content={<>
        {/* Period */}
        <ThingReceivePeriod setIsValid={valid => {
            let nv = isValid;
            nv[0] = valid;
            setIsValid(nv);
        }} />
        
        {/* Data expire */}
        <ThingReceiveExpire setIsValid={valid => {
            let nv = isValid;
            nv[1] = valid;
            setIsValid(nv);
        }} />
    </>} />
}