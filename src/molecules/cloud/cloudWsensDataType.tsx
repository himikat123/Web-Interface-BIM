import i18n from "../../i18n/main";
import { useSelector } from "react-redux";
import SelectSwitch from "../../atoms/selectSwitch";
import Wsensor from "../../atoms/indications/wsensor";
import { batVoltageWsensor, batPercentWsensor, batLevelWsensor } from "../../atoms/indications/battery";
import { iCloudSensorType } from "../../interfaces";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";

export default function CloudWsensDataType(props: iCloudSensorType) {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    let wsensorTypes = [];

    for(let i=0; i<2; i++) {
        wsensorTypes.push([
            ...([...Array(5)].map((x, n) => `${i18n.t('temperature')} ${n} (${Wsensor()[i].temp[n]})`)),
            `${i18n.t('humidity')} (${Wsensor()[i].hum})`,
            `${i18n.t('pressure')} (${Wsensor()[i].pres})`,
            `${i18n.t('windSpeed')} (${Wsensor()[i].windSpeed})`,
            `${i18n.t('windDirection')} (${Wsensor()[i].windDir})`,
            `${i18n.t('ambientLight')} (${Wsensor()[i].light})`,
            `${i18n.t('voltage')} (${Wsensor()[i].hiVoltage})`,
            `${i18n.t('current')} (${Wsensor()[i].current})`,
            `${i18n.t('power')} (${Wsensor()[i].power})`,
            `${i18n.t('energy')} (${Wsensor()[i].energy})`,
            `${i18n.t('frequency')} (${Wsensor()[i].frequency})`,
            `${i18n.t('batteryVoltage')} ${batVoltageWsensor(i, data.wsensor?.bat[i] ?? 0, config.wsensor?.bat.k[i] ?? 0)}`,
            `${i18n.t('batteryPercentage')} ${batPercentWsensor(i, data.wsensor?.bat[i] ?? 0, config.wsensor?.bat.k[i] ?? 0)}`,
            `${i18n.t('batteryLevel')} ${batLevelWsensor(i, data.wsensor?.bat[i] ?? 0, config.wsensor?.bat.type[i] ?? 0, config.wsensor?.bat.k[i] ?? 0)}`,
            `CO2 (${Wsensor()[i].co2})`,
            `${i18n.t('absHumidity')} (${Wsensor()[i].ahum})`,
            `${i18n.t('dewPoint')} (${Wsensor()[i].dp})`
        ])
    }

    return <SelectSwitch label={i18n.t('sensorType')}
        options={wsensorTypes[props.sens]}
        value={props.value}
        onChange={val => props.onChange(val)}
    />
}