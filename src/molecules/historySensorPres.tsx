import i18n from "../i18n/main";
import SelectSwitch from "../atoms/selectSwitch";
import { iHistorySensor } from "../interfaces";
import Forecast from "../atoms/indications/forecast";
import BME280 from "../atoms/indications/BME280";
import BMP180 from "../atoms/indications/BMP180";
import BME680 from "../atoms/indications/BME680";

export default function HistorySensorPres(props: iHistorySensor) {
    const sensors = [
        "--",
        `${i18n.t('forecast')} (${Forecast().pres})`,
        i18n.t('wirelessSensor.singular'),
        'Thingspeak',
        `BME280 (${BME280().pres})`,
        `BMP180 (${BMP180().pres})`,
        `BME680 (${BME680().pres})`
    ];

    return <div className="mt-8">
        <SelectSwitch label={props.label}
            options={sensors}
            value={props.value}
            onChange={props.onChange}
        />
    </div>
}