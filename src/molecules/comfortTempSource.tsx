import { useSelector, useDispatch } from 'react-redux';
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import ComfortTempSensorType from "../molecules/comfortTempSensorType";
import WsensorNumber from "../molecules/wsensorNumber";
import WsensorTempNumber from "../molecules/wsensorTempNumber";
import ThingspeakFields from "../molecules/thingspeakFields";

export default function ComfortTempSource() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <>
        {/* Sensor type */}
        <ComfortTempSensorType />

        {config.comfort.temp.source === 2 && <div className="mt-8">
            {/* Wireless sensor number */}
            <WsensorNumber value={config.comfort.temp.wsensNum}
                changeValue={val => dispatch(cf.comfortTempWsensNumChange(val))}
            />

            {/* Wireless sensor temperature sensor number */}
            <div className="mt-8">
                <WsensorTempNumber wSensNum={config.comfort.temp.wsensNum}
                    value={config.comfort.temp.sens}
                    changeValue={val => dispatch(cf.comfortTempSensChange(val))}
                />
            </div>
        </div>}

        {config.comfort.temp.source === 3 && <div className="mt-8">
            {/* Thingspeak */}
            <ThingspeakFields value={config.comfort.temp.thing}
                changeValue={val => dispatch(cf.comfortTempThingChange(val))}
            />
        </div>}
    </>
}