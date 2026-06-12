import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import device from "../../device";
import SelectSwitch from "../../atoms/selectSwitch";
import type { iConfig } from "../../redux/configTypes";
import type { iData } from "../../redux/dataTypes";
import * as cf from "../../redux/slices/config";
import { batLevelStr } from "../../atoms/indications/battery";

export default function SensorTypeBatLevel() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    
    const sensors = [];
    sensors.push("--");
    if(device() === 'WeatherMonitorBIM32') sensors.push(i18n.t('wirelessSensor.singular'));
    if(device() === 'WeatherMonitorBIM') sensors.push(`${i18n.t('battery')} (${batLevelStr(data.adc ?? -1, config.batK ?? 0)})`);
    sensors.push('Thingspeak');

    return <SelectSwitch label={i18n.t('dataSource.singular')}
        options={sensors}
        value={config.display.source.bat.sens}
        onChange={val => dispatch(cf.displaySourceBatSensChange(val))}
    />
}