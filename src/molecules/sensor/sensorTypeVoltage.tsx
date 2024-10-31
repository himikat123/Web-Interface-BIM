import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import device from "../../device";
import SelectSwitch from "../../atoms/selectSwitch";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";
import BME680 from "../../atoms/indications/BME680";

export default function SensorTypeVoltage() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const sensors = [];
    sensors.push("--");
    if(device() === 'WeatherMonitorBIM32') sensors.push(i18n.t('wirelessSensor.singular'));
    sensors.push('Thingspeak');
    if(device() === 'WeatherMonitorBIM32') sensors.push(`BME680 (${BME680().iaq})`);

    return <SelectSwitch label={i18n.t('dataSource.singular')}
        options={sensors}
        value={config.display.source.volt.sens}
        onChange={val => dispatch(cf.displaySourceVoltSensChange(val))}
    />
}