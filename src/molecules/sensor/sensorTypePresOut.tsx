import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import device from "../../device";
import SelectSwitch from "../../atoms/selectSwitch";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as cf from "../../redux/slices/config";
import forecast from "../../atoms/indications/forecast";
import tempHumPres from "../../atoms/indications/tempHumPres";
import tempPres from "../../atoms/indications/tempPres";
import tempHumPresIaq from "../../atoms/indications/tempHumPresIaq";

export default function SensorTypePresOut() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const bme280indications = tempHumPres(config.sensors.bme280, data.bme280, config.units.pres);
    const bmp180indications = tempPres(config.sensors.bmp180, data.bmp180, config.units.pres);
    const bme680indications = tempHumPresIaq(config.sensors.bme680, data.bme680, config.units.pres);
    const weatherIndications = forecast(config.weather, data.weather, config.units.pres);

    const sensors = [];
    sensors.push('--');
    sensors.push(`${i18n.t('forecast')} (${weatherIndications.pres})`);
    if(device() === 'WeatherMonitorBIM32') sensors.push(i18n.t('wirelessSensor.singular'));
    sensors.push('Thingspeak');
    sensors.push(`BME280 (${bme280indications.pres})`);
    sensors.push(`BMP180 (${bmp180indications.pres})`);
    if(device() === 'WeatherMonitorBIM32') sensors.push(`BME680 (${bme680indications.pres})`);

    return <SelectSwitch label={i18n.t('dataSource.singular')}
        options={sensors}
        value={config.display.source.presOut.sens}
        onChange={val => dispatch(cf.displaySourcePresOutSensChange(val))}
    />
}