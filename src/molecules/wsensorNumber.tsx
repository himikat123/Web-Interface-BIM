
import i18n from "../i18n/main";
import SelectSwitch from "../atoms/selectSwitch";
import { iSelectSensor } from "../interfaces";

export default function WsensorNumber(props: iSelectSensor) {
    let wsensors = [
        `${i18n.t('wirelessSensor.singular')} 0 ${props.indications ? props.indications[0] : ''}`,
        `${i18n.t('wirelessSensor.singular')} 1 ${props.indications ? props.indications[1] : ''}`
    ];

    return <div className="mt-8">
        <SelectSwitch label={i18n.t('wirelessSensorNumber')}
            options={wsensors}
            value={props.value}
            onChange={val => props.changeValue(val)}
        />
    </div>
}