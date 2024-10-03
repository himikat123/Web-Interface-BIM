import i18n from "../../i18n/main";
import SelectSwitch from "../../atoms/selectSwitch";
import { iHistorySensor } from "../../interfaces";
import Forecast from "../../atoms/indications/forecast";
import BME280 from "../../atoms/indications/BME280";
import SHT21 from "../../atoms/indications/SHT21";
import DHT22 from "../../atoms/indications/DHT22";
import BME680 from "../../atoms/indications/BME680";

export default function HistorySensorHum(props: iHistorySensor) {
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

    return <div className="mt-8">
        <SelectSwitch label={props.label}
            options={sensors}
            value={props.value}
            onChange={props.onChange}
        />
    </div>
}