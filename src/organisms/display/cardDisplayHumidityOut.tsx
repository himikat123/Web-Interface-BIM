import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";
import SensorTypeHumOut from "../../molecules/sensor/sensorTypeHumOut";
import WsensorNumber from "../../molecules/wsensor/wsensorNumber";
import ThingspeakField from "../../molecules/thingspeak/thingspeakFields";
import Wsensor from "../../atoms/indications/wsensor";

export default function CardDisplayHumidityOut() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const indications = [`(${Wsensor()[0].hum})`, `(${Wsensor()[1].hum})`];

    return <Card header={i18n.t('humidityOut')}
        content={<>
            {/* Sensor type */}
            <SensorTypeHumOut />
            
            {/* Wireless sensor number */}
            {config.display.source.humOut.sens === 2 && <WsensorNumber value={config.display.source.humOut.wsensNum} 
                changeValue={val => dispatch(cf.displaySourceHumOutWsensNumChange(val))}
                indications={indications}
            />}

            {/* Thingspeak */}
            {config.display.source.humOut.sens === 3 && <ThingspeakField value={config.display.source.humOut.thing}
                changeValue={val => dispatch(cf.displaySourceHumOutThingChange(val))} 
            />}
        </>} 
    />
}