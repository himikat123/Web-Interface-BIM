import { useSelector, useDispatch } from 'react-redux';
import device from '../../device';
import { iConfig } from "../../redux/configTypes";
import { iData } from '../../redux/dataTypes';
import * as cf from "../../redux/slices/config";
import ComfortHumSensorType from "./comfortHumSensorType";
import WsensorNumber from "../wsensor/wsensorNumber";
import ThingspeakFields from "../thingspeak/thingspeakFields";
import wsensor from '../../atoms/indications/wsensor';

export default function ComfortHumSource() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const wsens = wsensor(config.wsensor, data.wsensor, config.units.pres);

    const indications = [`(${wsens[0].hum})`, `(${wsens[1].hum})`];

    return <>
        {/* Sensor type */}
        <ComfortHumSensorType />

        {/* Wireless sensor number */}
        {config.comfort.hum.source === (device() === 'WeatherMonitorBIM32' ? 2 : 400) && <div className="mt-8">
            <WsensorNumber value={config.comfort.hum.wsensNum ?? 0}
                changeValue={val => dispatch(cf.comfortHumWsensNumChange(val))}
                indications={indications}
            />
        </div>}

        {/* Thingspeak */}
        {config.comfort.hum.source === (device() === 'WeatherMonitorBIM32' ? 3 : 2) && <div className="mt-8">
            <ThingspeakFields value={config.comfort.hum.thing}
                changeValue={val => dispatch(cf.comfortHumThingChange(val))}
            />
        </div>}
    </>
}