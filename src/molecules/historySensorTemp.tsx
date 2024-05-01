import i18n from "../i18n/main";
import SelectSwitch from "../atoms/selectSwitch";
import { iHistorySensor } from "../interfaces";
import Forecast from "../atoms/indications/forecast";
import BME280 from "../atoms/indications/BME280";
import BMP180 from "../atoms/indications/BMP180";
import SHT21 from "../atoms/indications/SHT21";
import DHT22 from "../atoms/indications/DHT22";
import DS18B20 from "../atoms/indications/DS18B20";
import BME680 from "../atoms/indications/BME680";

export default function HistorySensorTemp(props: iHistorySensor) {
    const sensors = [
        "--",
        `${i18n.t('forecast')} (${Forecast().temp})`,
        i18n.t('wirelessSensor.singular'),
        'Thingspeak',
        `BME280 (${BME280().temp})`,
        `BMP180 (${BMP180().temp})`,
        `SHT21 (${SHT21().temp})`,
        `DHT22 (${DHT22().temp})`,
        `DS18B20 (${DS18B20().temp})`,
        `BME680 (${BME680().temp})`
    ];

    return <div className="mt-8">
        <SelectSwitch label={props.label}
            options={sensors}
            value={props.value}
            onChange={props.onChange}
        />
    </div>
}