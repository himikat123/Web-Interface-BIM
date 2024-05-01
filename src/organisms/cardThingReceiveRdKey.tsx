import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import TextInput from "../atoms/textInput";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";

export default function CardThingReceiveRdKey() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <Card content={
        <TextInput label="Read API Key"
            value={config.thingspeakReceive.rdkey}
            maxLength={32}
            onChange={val => dispatch(cf.thingspeakReceiveRdkeyChange(val.target.value))}
        />} 
    />
}