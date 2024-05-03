import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import WsensorNumber from "./wsensorNumber";
import Wsensor from "../atoms/indications/wsensor";

export default function ComfortCo2Source() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const indications = [`(${Wsensor()[0].co2})`, `(${Wsensor()[1].co2})`];

    const sensors = [
        "--",
        i18n.t('wirelessSensor.singular')
    ];

    return <>
        <SelectSwitch label={i18n.t('dataSource.singular')}
            options={sensors}
            value={config.comfort.co2.source}
            onChange={val => dispatch(cf.comfortCo2SourceChange(val))}
        />

        {config.comfort.co2.source > 0 && <div className="mt-8">
            <WsensorNumber value={config.comfort.co2.wsensNum}
                changeValue={val => dispatch(cf.comfortCo2WsensNumChange(val))}
                indications={indications}
            />
        </div>}
    </>
}