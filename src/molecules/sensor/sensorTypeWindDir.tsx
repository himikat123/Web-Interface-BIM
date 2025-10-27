import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../../atoms/selectSwitch";
import { windDirStr } from "../../atoms/indications/windDirStr";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as cf from "../../redux/slices/config";
import forecast from "../../atoms/indications/forecast";

export default function SensorTypeWindDir() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const sensors = [];
    sensors.push('--');
    sensors.push(`${i18n.t('forecast')} {${windDirStr(data.weather.wind.dir)}} (${forecast(config.weather, data.weather).windDir})`);
    sensors.push(i18n.t('wirelessSensor.singular'));
    sensors.push('Thingspeak');

    return <SelectSwitch label={i18n.t('dataSource.singular')}
        options={sensors}
        value={config.display.source.wind?.dir.sens ?? 0}
        onChange={val => dispatch(cf.displaySourceWindDirSensChange(val))}
    />
}