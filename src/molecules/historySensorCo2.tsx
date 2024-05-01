import i18n from "../i18n/main";
import SelectSwitch from "../atoms/selectSwitch";
import { iHistorySensor } from "../interfaces";

export default function HistorySensorCo2(props: iHistorySensor) {
    const sensors = [
        "--",
        i18n.t('wirelessSensor.singular')
    ];

    return <div className="mt-8">
        <SelectSwitch label={props.label}
            options={sensors}
            value={props.value}
            onChange={props.onChange}
        />
    </div>
}