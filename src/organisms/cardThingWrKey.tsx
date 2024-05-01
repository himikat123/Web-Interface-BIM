import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import TextInput from "../atoms/textInput";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";

export default function CardThingWrKey() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <Card content={
        <TextInput label="Write API Key"
            value={config.thingspeakSend.wrkey}
            maxLength={32}
            onChange={val => dispatch(cf.thingspeakSendWrkeyChange(val.target.value))}
        />}
    />
}