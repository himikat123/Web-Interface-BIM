import i18n from "../i18n/main";
import { useSelector } from 'react-redux';
import SelectSwitch from "../atoms/selectSwitch";
import { iData } from "../redux/dataTypes";
import { iSelectSensor } from "../interfaces";
import * as vl from "../atoms/validateValues";

export default function ThingspeakField(props: iSelectSensor) {
    const data = useSelector((state: iData) => state.data);

    let fields: string[] = [];
    for(let i=0; i<8; i++) fields.push(`${i18n.t('field')} ${i + 1} (${vl.ThingspeakDataRelevance() 
        ? vl.validateThingspeak(data.thing?.data ? data.thing?.data[i] : -40400) ? data.thing?.data ? data.thing?.data[i] : '--' : '--'
        : i18n.t('dataExpired')})`
    );

    return <div className="mt-8">
        <SelectSwitch label={i18n.t('field')}
            options={fields}
            value={props.value}
            onChange={val => props.changeValue(val)}
        />
    </div>
}