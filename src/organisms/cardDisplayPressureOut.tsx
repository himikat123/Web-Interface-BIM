import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import SensorTypePresOut from "../molecules/sensorTypePresOut";
import WsensorNumber from "../molecules/wsensorNumber";
import ThingspeakField from "../molecules/thingspeakField";
import Wsensor from "../atoms/indications/wsensor";

export default function CardDisplayPressureOut() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const indications = [Wsensor()[0].pres, Wsensor()[1].pres];

    return <Card header={i18n.t('pressureOut')}
        content={<>
            {/* Sensor type */}
            <SensorTypePresOut />
            
            {/* Wireless sensor number */}
            {config.display.source.presOut.sens === 2 && <WsensorNumber value={config.display.source.presOut.wsensNum} 
                changeValue={val => dispatch(cf.displaySourcePresOutWsensNumChange(val))}
                indications={indications}
            />}

            {/* Thingspeak */}
            {config.display.source.presOut.sens === 3 && <ThingspeakField value={config.display.source.presOut.thing}
                changeValue={val => dispatch(cf.displaySourcePresOutThingChange(val))} 
            />}
        </>} 
    />
}