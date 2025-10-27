import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import device from "../../device";
import Card from "../../atoms/card";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as cf from "../../redux/slices/config";
import SensorTypePresOut from "../../molecules/sensor/sensorTypePresOut";
import WsensorNumber from "../../molecules/wsensor/wsensorNumber";
import ThingspeakField from "../../molecules/thingspeak/thingspeakFields";
import wsensor from "../../atoms/indications/wsensor";

export default function CardDisplayPressureOut() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const wsens = wsensor(config.wsensor, data.wsensor);
    const indications = [`(${wsens[0].pres})`, `(${wsens[1].pres})`];

    return <Card header={i18n.t('pressure')}
        content={<>
            {/* Sensor type */}
            <SensorTypePresOut />

            {/* Wireless sensor number */}
            {config.display.source.presOut.sens === (device() === 'WeatherMonitorBIM32' ? 2 : 400) && <>
                <WsensorNumber value={config.display.source.presOut.wsensNum ?? 0} 
                    changeValue={val => dispatch(cf.displaySourcePresOutWsensNumChange(val))}
                    indications={indications}
                />
            </>}

            {/* Thingspeak */}
            {config.display.source.presOut.sens === (device() === 'WeatherMonitorBIM32' ? 3 : 2) && <>
                <ThingspeakField value={config.display.source.presOut.thing}
                    changeValue={val => dispatch(cf.displaySourcePresOutThingChange(val))} 
                />
            </>}
        </>} 
    />
}