import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import TextInput from "../atoms/textInput";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";

export default function CardThingReceiveCHID() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    
    return <Card content={
        <TextInput label="Channel ID"
            value={config.thingspeakReceive.channelID}
            maxLength={20}
            onChange={val => dispatch(cf.thingspeakReceiveChannelIdChange(val.target.value))}
        />} 
    />
}