import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import device from "../../device";
import Card from "../../atoms/card";
import type { iConfig } from "../../redux/configTypes";
import type { iData } from "../../redux/dataTypes";
import * as cf from "../../redux/slices/config";
import SensorTypeHumOut from "../../molecules/sensor/sensorTypeHumOut";
import WsensorNumber from "../../molecules/wsensor/wsensorNumber";
import ThingspeakField from "../../molecules/thingspeak/thingspeakFields";
import wsensor from "../../atoms/indications/wsensor";

export default function CardDisplayHumidityOut() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const wsens = wsensor(config.wsensor, data.wsensor, config.units.pres);
    const indications = [`(${wsens[0].hum})`, `(${wsens[1].hum})`];

    return <Card header={i18n.t('humidityOut')}
        content={<>
            {/* Sensor type */}
            <SensorTypeHumOut />
            
            {/* Wireless sensor number */}
            {config.display.source.humOut.sens === (device() === 'WeatherMonitorBIM32' ? 2 : 400) && <>
                <WsensorNumber value={config.display.source.humOut.wsensNum ?? 0} 
                    changeValue={val => dispatch(cf.displaySourceHumOutWsensNumChange(val))}
                    indications={indications}
                />
            </>}

            {/* Thingspeak */}
            {config.display.source.humOut.sens === (device() === 'WeatherMonitorBIM32' ? 3 : 2) && <>
                <ThingspeakField value={config.display.source.humOut.thing}
                    changeValue={val => dispatch(cf.displaySourceHumOutThingChange(val))} 
                />
            </>}
        </>} 
    />
}