import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../../atoms/selectSwitch";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as cf from "../../redux/slices/config";
import tempHumPresIaq from "../../atoms/indications/tempHumPresIaq";

export default function ComfortIaqSource() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const bme680indications = tempHumPresIaq(config.sensors.bme680, data.bme680);

    const sensors = [
        "--",
        `BME680 (${bme680indications.iaq})`
    ];

    return <SelectSwitch label={i18n.t('dataSource.singular')}
        options={sensors}
        value={config.comfort.iaq?.source ?? 0}
        onChange={val => dispatch(cf.comfortIaqSourceChange(val))}
    />
}