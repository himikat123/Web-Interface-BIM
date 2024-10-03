import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
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

    const sensors = [
        '--', 
        `${i18n.t('forecast')} (${Forecast().pres})`, 
        i18n.t('wirelessSensor.singular'), 
        'Thingspeak',
        `BME280 (${BME280().pres})`, 
        `BMP180 (${BMP180().pres})`, 
        `BME680 (${BME680().pres})`
    ];

    return <SelectSwitch label={i18n.t('dataSource.singular')}
        options={sensors}
        value={config.display.source.presOut.sens}
        onChange={val => dispatch(cf.displaySourcePresOutSensChange(val))}
    />
}