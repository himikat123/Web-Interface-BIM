import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import BME680 from "../atoms/indications/BME680";

export default function ComfortIaqSource() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const sensors = [
        "--",
        `BME680 (${BME680().iaq})`
    ];

    return <SelectSwitch label={i18n.t('dataSource.singular')}
        options={sensors}
        value={config.comfort.iaq.source}
        onChange={val => dispatch(cf.comfortIaqSourceChange(val))}
    />
}