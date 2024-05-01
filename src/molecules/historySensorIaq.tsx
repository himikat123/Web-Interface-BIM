import SelectSwitch from "../atoms/selectSwitch";
import { iHistorySensor } from "../interfaces";
import BME680 from "../atoms/indications/BME680";

export default function HistorySensorIaq(props: iHistorySensor) {
    const sensors = [
        "--",
        `BME680 (${BME680().iaq})`
    ];

    return <div className="mt-8">
        <SelectSwitch label={props.label}
            options={sensors}
            value={props.value}
            onChange={props.onChange}
        />
    </div>
}