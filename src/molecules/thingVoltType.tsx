import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";

export default function ThingVoltType() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <SelectSwitch label={i18n.t('sensorType')}
        options={[i18n.t('voltage'), i18n.t('batteryPercentage')]}
        value={config.display.source.volt.thingType}
        onChange={val => dispatch(cf.displaySourceVoltThingTypeChange(val))}
    />
}