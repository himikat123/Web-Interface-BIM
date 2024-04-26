import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import { BatVoltage, BatPercent } from "../atoms/indications/battery";
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import Wsensor from "../atoms/indications/wsensor";

export default function WsensorType() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    let wsensTypes = [
        `${i18n.t('batteryVoltage')} ${BatVoltage(config.display.source.volt.wsensNum)}`,
        `${i18n.t('batteryPercentage')} ${BatPercent(config.display.source.volt.wsensNum)}`,
        `${i18n.t('voltage')} ${Wsensor()[config.display.source.volt.wsensNum].volt}`,
        `CO2 ${Wsensor()[config.display.source.volt.wsensNum].co2}`,
    ];

    return <SelectSwitch label={i18n.t('sensor.singular')}
        options={wsensTypes}
        value={config.display.source.volt.volt}
        onChange={val => dispatch(cf.displaySourceVoltVoltChange(val))}
    />
}