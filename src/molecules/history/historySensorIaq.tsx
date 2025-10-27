import { useSelector } from "react-redux";
import SelectSwitch from "../../atoms/selectSwitch";
import { iHistorySensor } from "../../interfaces";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import tempHumPresIaq from "../../atoms/indications/tempHumPresIaq";

export default function HistorySensorIaq(props: iHistorySensor) {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const bme680indications = tempHumPresIaq(config.sensors.bme680, data.bme680);
    const sensors = [
        "--",
        `BME680 (${bme680indications.iaq})`
    ];

    return <div className="mt-8">
        <SelectSwitch label={props.label}
            options={sensors}
            value={props.value}
            onChange={props.onChange}
        />
    </div>
}