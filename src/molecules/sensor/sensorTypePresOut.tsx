import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import device from "../../device";
import SelectSwitch from "../../atoms/selectSwitch";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";
import Forecast from "../../atoms/indications/forecast";
import BME280 from "../../atoms/indications/BME280";
import BMP180 from "../../atoms/indications/BMP180";
import BME680 from "../../atoms/indications/BME680";

export default function SensorTypePresOut() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const sensors = [];
    sensors.push('--');
    sensors.push(`${i18n.t('forecast')} (${Forecast().pres})`);
    if(device() === 'WeatherMonitorBIM32') sensors.push(i18n.t('wirelessSensor.singular'));
    sensors.push('Thingspeak');
    sensors.push(`BME280 (${BME280().pres})`);
    sensors.push(`BMP180 (${BMP180().pres})`);
    if(device() === 'WeatherMonitorBIM32') sensors.push(`BME680 (${BME680().pres})`);

    return <SelectSwitch label={i18n.t('dataSource.singular')}
        options={sensors}
        value={config.display.source.presOut.sens}
        onChange={val => dispatch(cf.displaySourcePresOutSensChange(val))}
    />
}