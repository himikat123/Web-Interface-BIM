import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../../atoms/selectSwitch";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";
import Forecast from "../../atoms/indications/forecast";
import BME280 from "../../atoms/indications/BME280";
import SHT21 from "../../atoms/indications/SHT21";
import DHT22 from "../../atoms/indications/DHT22";
import BME680 from "../../atoms/indications/BME680";

export default function ComfortHumSensorType() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const sensors = [
        "--",
        `${i18n.t('forecast')} (${Forecast().hum})`,
        i18n.t('wirelessSensor.singular'),
        'Thingspeak',
        `BME280 (${BME280().hum})`,
        `SHT21 (${SHT21().hum})`,
        `DHT22 (${DHT22().hum})`,
        `BME680 (${BME680().hum})`
    ];

    return <SelectSwitch label={i18n.t('dataSource.singular')}
        options={sensors}
        value={config.comfort.hum.source}
        onChange={val => dispatch(cf.comfortHumSourceChange(val))}
    />
}