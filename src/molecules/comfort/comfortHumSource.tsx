import { useSelector, useDispatch } from 'react-redux';
import device from '../../device';
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";
import ComfortHumSensorType from "./comfortHumSensorType";
import WsensorNumber from "../wsensor/wsensorNumber";
import ThingspeakFields from "../thingspeak/thingspeakFields";
import Wsensor from '../../atoms/indications/wsensor';

export default function ComfortHumSource() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const indications = [`(${Wsensor()[0].hum})`, `(${Wsensor()[1].hum})`];

    return <>
        {/* Sensor type */}
        <ComfortHumSensorType />

        {/* Wireless sensor number */}
        {config.comfort.hum.source === (device() === 'WeatherMonitorBIM32' ? 2 : 400) && <div className="mt-8">
            <WsensorNumber value={config.comfort.hum.wsensNum}
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