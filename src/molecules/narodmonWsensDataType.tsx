import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import Wsensor from "../atoms/indications/wsensor";
import { BatVoltage, BatPercent, BatLevel } from "../atoms/indications/battery";

export default function NarodmonWsensDataType(props: {num: number}) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    let wsensorTypes = [];
    for(let i=0; i<2; i++) {
        wsensorTypes.push([
            ...([...Array(5)].map((x, n) => `${i18n.t('temperature')} ${n} (${Wsensor()[i].temp[n]})`)),
            `${i18n.t('humidity')} (${Wsensor()[i].hum})`,
            `${i18n.t('pressure')} (${Wsensor()[i].pres})`,
            `${i18n.t('ambientLight')} (${Wsensor()[i].light})`,
            `${i18n.t('voltage')} (${Wsensor()[i].hiVoltage})`,
            `${i18n.t('current')} (${Wsensor()[i].current})`,
            `${i18n.t('power')} (${Wsensor()[i].power})`,
            `${i18n.t('energy')} (${Wsensor()[i].energy})`,
            `${i18n.t('frequency')} (${Wsensor()[i].frequency})`,
            `${i18n.t('batteryVoltage')} ${BatVoltage(i)}`,
            `${i18n.t('batteryPercentage')} ${BatPercent(i)}`,
            `${i18n.t('batteryLevel')} ${BatLevel(i)}`,
            `CO2 (${Wsensor()[i].co2})`
        ])
    }

    return <SelectSwitch label={i18n.t('sensorType')}
        options={wsensorTypes[config.narodmonSend.wsensors[props.num]]}
        value={config.narodmonSend.wtypes[props.num]}
        onChange={val => dispatch(cf.narodmonSendWtypesChange({ num: props.num, val: val }))}
    />
}