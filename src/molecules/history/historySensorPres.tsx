import { useSelector } from "react-redux";
import i18n from "../../i18n/main";
import SelectSwitch from "../../atoms/selectSwitch";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import { iHistorySensor } from "../../interfaces";
import forecast from "../../atoms/indications/forecast";
import tempHumPres from "../../atoms/indications/tempHumPres";
import tempPres from "../../atoms/indications/tempPres";
import tempHumPresIaq from "../../atoms/indications/tempHumPresIaq";

export default function HistorySensorPres(props: iHistorySensor) {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const bme280indications = tempHumPres(config.sensors.bme280, data.bme280, config.units.pres);
    const bmp180indications = tempPres(config.sensors.bmp180, data.bmp180, config.units.pres);
    const bme680indications = tempHumPresIaq(config.sensors.bme680, data.bme680, config.units.pres);
    const weatherIndications = forecast(config.weather, data.weather, config.units.pres);

    const sensors = [
        "--",
        `${i18n.t('forecast')} (${weatherIndications.pres})`,
        i18n.t('wirelessSensor.singular'),
        'Thingspeak',
        `BME280 (${bme280indications.pres})`,
        `BMP180 (${bmp180indications.pres})`,
        `BME680 (${bme680indications.pres})`
    ];

    return <div className="mt-8">
        <SelectSwitch label={props.label}
            options={sensors}
            value={props.value}
            onChange={props.onChange}
        />
    </div>
}