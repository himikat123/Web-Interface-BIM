import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../../atoms/selectSwitch";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as cf from "../../redux/slices/config";
import * as bat from "../../atoms/indications/battery";

export default function SensorTypeVoltPrc() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    return <SelectSwitch label={i18n.t('sensorType')}
        options={[
            `${i18n.t('voltage')} (${bat.batVoltageStr(data.adc ?? 0, config.batK ?? 0)})`,
            `${i18n.t('batteryPercentage')} (${bat.batPercentStr(data.adc ?? 0, config.batK ?? 0)})`
        ]}
        value={config.display.source.volt.thingType}
        onChange={val => dispatch(cf.displaySourceVoltThingTypeChange(val))}
    />
}