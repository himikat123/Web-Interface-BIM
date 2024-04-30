import { useSelector } from 'react-redux';
import Card from "../atoms/card";
import TextInput from "../atoms/textInput";
import { iData } from "../redux/dataTypes";

export default function CardNarodmonMac() {
    const data = useSelector((state: iData) => state.data);

    return <Card content={<TextInput label="MAC"
        value={data.network.mac ? ('BIM' + data.network.mac.replace(/:/g, "")) : '--'}
        readonly
    />} />
}