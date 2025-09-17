import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import SensorTypeWindDir from "../../molecules/sensor/sensorTypeWindDir";
import WsensorNumber from "../../molecules/wsensor/wsensorNumber";
import ThingspeakField from "../../molecules/thingspeak/thingspeakFields";
import Wsensor from "../../atoms/indications/wsensor";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";

export default function CardDisplayWindDir() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const indications = [
        `{${Wsensor()[0].windDirStr}} (${Wsensor()[0].windDir})`, 
        `{${Wsensor()[1].windDirStr}} (${Wsensor()[1].windDir})`
    ];

    return <Card header={i18n.t('windDirection')}
        content={<>
            {/* Sensor type */}
            <SensorTypeWindDir />
            
            {/* Wireless sensor number */}
            {((config.display.source.wind?.dir.sens ?? 0) === 2) && <>
                <WsensorNumber value={config.display.source.wind?.dir.wsensNum ?? 0} 
                    changeValue={val => dispatch(cf.displaySourceWindDirWsensNumChange(val))}
                    indications={indications}
                />
            </>}

            {/* Thingspeak */}
            {((config.display.source.wind?.dir.sens ?? 0) === 3) && <>
                <ThingspeakField value={config.display.source.wind?.dir.thing ?? 0}
                    changeValue={val => dispatch(cf.displaySourceWindDirThingChange(val))} 
                />
            </>}
        </>} 
    />
}