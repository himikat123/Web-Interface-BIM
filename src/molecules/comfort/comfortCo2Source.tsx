import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../../atoms/selectSwitch";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as cf from "../../redux/slices/config";
import WsensorNumber from "./../wsensor/wsensorNumber";
import wsensor from "../../atoms/indications/wsensor";

export default function ComfortCo2Source() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const wsens = wsensor(config.wsensor, data.wsensor);
    const indications = [`(${wsens[0].co2})`, `(${wsens[1].co2})`];
    const source = config.comfort.co2?.source ?? 0;

    const sensors = [
        "--",
        i18n.t('wirelessSensor.singular')
    ];

    return <>
        <SelectSwitch label={i18n.t('dataSource.singular')}
            options={sensors}
            value={source}
            onChange={val => dispatch(cf.comfortCo2SourceChange(val))}
        />

        {source > 0 && <div className="mt-8">
            <WsensorNumber value={config.comfort.co2?.wsensNum ?? 0}
                changeValue={val => dispatch(cf.comfortCo2WsensNumChange(val))}
                indications={indications}
            />
        </div>}
    </>
}