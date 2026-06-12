import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import type { iConfig } from "../../redux/configTypes";
import type { iData } from "../../redux/dataTypes";
import * as cf from "../../redux/slices/config";
import SensorTypeWindSpeed from "../../molecules/sensor/sensorTypeWindSpeed";
import WsensorNumber from "../../molecules/wsensor/wsensorNumber";
import ThingspeakField from "../../molecules/thingspeak/thingspeakFields";
import wsensor from "../../atoms/indications/wsensor";

export default function CardDisplayWindSpeed() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const wsens = wsensor(config.wsensor, data.wsensor, config.units.pres);
    const indications = [`(${wsens[0].windSpeed})`, `(${wsens[1].windSpeed})`];

    return <Card header={i18n.t('windSpeed')}
        content={<>
            {/* Sensor type */}
            <SensorTypeWindSpeed />
            
            {/* Wireless sensor number */}
            {((config.display.source.wind?.speed.sens ?? 0) === 2) && <>
                <WsensorNumber value={config.display.source.wind?.speed.wsensNum ?? 0} 
                    changeValue={val => dispatch(cf.displaySourceWindSpeedWsensNumChange(val))}
                    indications={indications}
                />
            </>}

            {/* Thingspeak */}
            {((config.display.source.wind?.speed.sens ?? 0) === 3) && <>
                <ThingspeakField value={config.display.source.wind?.speed.thing ?? 0}
                    changeValue={val => dispatch(cf.displaySourceWindSpeedThingChange(val))} 
                />
            </>}
        </>} 
    />
}