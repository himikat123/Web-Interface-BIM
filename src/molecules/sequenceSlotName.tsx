import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import TextInput from "../atoms/textInput";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import { iSensorTypeSequence } from "../interfaces";

export default function SequenceSlotName(props: iSensorTypeSequence) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <div className="mt-8">
        <TextInput label={i18n.t('name')} 
            value={config.display.source.sequence.name[props.num]}
            maxLength={15}
            onChange={val => dispatch(cf.displaySourceSequenceNameChange({ num: props.num, val: val.target.value})) }
        />
    </div>
}