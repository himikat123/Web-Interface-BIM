import { useSelector, useDispatch } from 'react-redux';
import device from '../../device';
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";
import ComfortTempSensorType from "./comfortTempSensorType";
import WsensorNumber from "../wsensor/wsensorNumber";
import WsensorTempNumber from "../wsensor/wsensorTempNumber";
import ThingspeakFields from "../thingspeak/thingspeakFields";

export default function ComfortTempSource() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <>
        {/* Sensor type */}
        <ComfortTempSensorType />

        {config.comfort.temp.source === (device() === 'WeatherMonitorBIM32' ? 2 : 400) && <div className="mt-8">
            {/* Wireless sensor number */}
            <WsensorNumber value={config.comfort.temp.wsensNum ?? 0}
                changeValue={val => dispatch(cf.comfortTempWsensNumChange(val))}
            />

            {/* Wireless sensor temperature sensor number */}
            <div className="mt-8">
                <WsensorTempNumber wSensNum={config.comfort.temp.wsensNum ?? 0}
                    value={config.comfort.temp.sens ?? 0}
                    changeValue={val => dispatch(cf.comfortTempSensChange(val))}
                />
            </div>
        </div>}

        {config.comfort.temp.source === (device() === 'WeatherMonitorBIM32' ? 3 : 2) && <div className="mt-8">
            {/* Thingspeak */}
            <ThingspeakFields value={config.comfort.temp.thing}
                changeValue={val => dispatch(cf.comfortTempThingChange(val))}
            />
        </div>}
    </>
}