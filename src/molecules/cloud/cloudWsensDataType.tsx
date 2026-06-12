import i18n from "../../i18n/main";
import { useSelector } from "react-redux";
import SelectSwitch from "../../atoms/selectSwitch";
import wsensor from "../../atoms/indications/wsensor";
import { windDirStr } from "../../atoms/indications/windDirStr";
import { batVoltageWsensor, batPercentWsensor, batLevelWsensor } from "../../atoms/indications/battery";
import type { iCloudSensorType } from "../../interfaces";
import type { iConfig } from "../../redux/configTypes";
import type { iData } from "../../redux/dataTypes";

export default function CloudWsensDataType(props: iCloudSensorType) {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const wsens = wsensor(config.wsensor, data.wsensor, config.units.pres);
    let wsensorTypes = [];

    for(let i=0; i<2; i++) {
        wsensorTypes.push([
            ...([...Array(5)].map((x, n) => `${i18n.t('temperature')} ${n} (${wsens[i].temp[n]})`)),
            `${i18n.t('humidity')} (${wsens[i].hum})`,
            `${i18n.t('pressure')} (${wsens[i].pres})`,
            `${i18n.t('windSpeed')} (${wsens[i].windSpeed})`,
            `${i18n.t('windDirection')} {${windDirStr(data.wsensor?.wind.dir.data[i] ?? -1)}} (${wsens[i].windDir})`,
            `${i18n.t('ambientLight')} (${wsens[i].light})`,
            `${i18n.t('voltage')} (${wsens[i].hiVoltage})`,
            `${i18n.t('current')} (${wsens[i].current})`,
            `${i18n.t('power')} (${wsens[i].power})`,
            `${i18n.t('energy')} (${wsens[i].energy})`,
            `${i18n.t('frequency')} (${wsens[i].frequency})`,
            `${i18n.t('batteryVoltage')} ${batVoltageWsensor(i, data.wsensor?.bat[i] ?? 0, config.wsensor?.bat.k[i] ?? 0)}`,
            `${i18n.t('batteryPercentage')} ${batPercentWsensor(i, data.wsensor?.bat[i] ?? 0, config.wsensor?.bat.k[i] ?? 0)}`,
            `${i18n.t('batteryLevel')} ${batLevelWsensor(i, data.wsensor?.bat[i] ?? 0, config.wsensor?.bat.type[i] ?? 0, config.wsensor?.bat.k[i] ?? 0)}`,
            `CO2 (${wsens[i].co2})`,
            `${i18n.t('absHumidity')} (${wsens[i].ahum})`,
            `${i18n.t('dewPoint')} (${wsens[i].dp})`
        ])
    }

    return <SelectSwitch label={i18n.t('sensorType')}
        options={wsensorTypes[props.sens]}
        value={props.value}
        onChange={val => props.onChange(val)}
    />
}