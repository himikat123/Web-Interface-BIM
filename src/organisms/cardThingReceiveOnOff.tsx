import i18n from '../i18n/main';
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import Toggle from "../atoms/toggle";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import ThingReceiveDataDate from "../molecules/thingReceiveDataDate";
import ThingReceiveDataTable from "../molecules/thingReceiveDataTable";

export default function CardThingReceiveOnOff() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    
    return <Card content={<>
        <Toggle label={i18n.t('receiveDataFrom') + " thingspeak.com"}
            checked={config.thingspeakReceive.period > 0 ? 1 : 0}
            onChange={() => dispatch(cf.thingspeakReceivePeriodChange(config.thingspeakReceive.period > 0 ? 0 : 5))}
        />

        {config.thingspeakReceive.period > 0 && <div className="mt-8 table">
            <ThingReceiveDataDate />
            <ThingReceiveDataTable />
        </div>}
    </>} />
}