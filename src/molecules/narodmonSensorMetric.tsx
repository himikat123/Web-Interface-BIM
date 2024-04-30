import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import TextInput from "../atoms/textInput";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";

export default function NarodmonSensorMetric(props: {num: number}) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    
    return <div className="mt-8">
        <TextInput label={i18n.t('sensorMetric')}
            value={config.narodmonSend.metrics[props.num]}
            maxLength={16}
            onChange={val => dispatch(cf.narodmonSendMetricsChange({ num: props.num, val: val.target.value }))}
        />
    </div>
}