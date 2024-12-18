import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import device from "../../device";
import SelectSwitch from "../../atoms/selectSwitch";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";

export default function SensorTypeBatLevel() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    
    const sensors = [];
    sensors.push("--");
    if(device() === 'WeatherMonitorBIM32') sensors.push(i18n.t('wirelessSensor.singular'));
    sensors.push('Thingspeak');

    return <SelectSwitch label={i18n.t('dataSource.singular')}
        options={sensors}
        value={config.display.source.bat.sens}
        onChange={val => dispatch(cf.displaySourceBatSensChange(val))}
    />
}