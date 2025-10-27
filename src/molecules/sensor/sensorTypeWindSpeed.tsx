import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../../atoms/selectSwitch";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as cf from "../../redux/slices/config";
import forecast from "../../atoms/indications/forecast";

export default function SensorTypeWindSpeed() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const sensors = [];
    sensors.push('--');
    sensors.push(`${i18n.t('forecast')} (${forecast(config.weather, data.weather, config.units.pres).windSpeed})`);
    sensors.push(i18n.t('wirelessSensor.singular'));
    sensors.push('Thingspeak');

    return <SelectSwitch label={i18n.t('dataSource.singular')}
        options={sensors}
        value={config.display.source.wind?.speed.sens ?? 0}
        onChange={val => dispatch(cf.displaySourceWindSpeedSensChange(val))}
    />
}