import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import { batVoltageWsensor, batPercentWsensor } from "../../atoms/indications/battery";
import SelectSwitch from "../../atoms/selectSwitch";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as cf from "../../redux/slices/config";
import Wsensor from "../../atoms/indications/wsensor";

export default function WsensorType() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const num = config.display.source.volt.wsensNum ?? 0;
    const adc = data.wsensor?.bat[num] ?? 0;
    const k = config.wsensor?.bat.k[num] ?? 0;

    let wsensTypes = [
        `${i18n.t('batteryVoltage')} ${batVoltageWsensor(num, adc, k)}`,
        `${i18n.t('batteryPercentage')} ${batPercentWsensor(num, adc, k)}`,
        `${i18n.t('voltage')} ${Wsensor()[num].volt}`,
        `CO2 ${Wsensor()[num].co2}`,
    ];

    return <SelectSwitch label={i18n.t('sensor.singular')}
        options={wsensTypes}
        value={config.display.source.volt.volt}
        onChange={val => dispatch(cf.displaySourceVoltVoltChange(val))}
    />
}