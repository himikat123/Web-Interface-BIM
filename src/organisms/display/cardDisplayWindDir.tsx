import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import SensorTypeWindDir from "../../molecules/sensor/sensorTypeWindDir";
import WsensorNumber from "../../molecules/wsensor/wsensorNumber";
import ThingspeakField from "../../molecules/thingspeak/thingspeakFields";
import wsensor from "../../atoms/indications/wsensor";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as cf from "../../redux/slices/config";

export default function CardDisplayWindDir() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const wsens = wsensor(config.wsensor, data.wsensor, config.units.pres);
    const indications = [
        `{${wsens[0].windDirStr}} (${wsens[0].windDir})`, 
        `{${wsens[1].windDirStr}} (${wsens[1].windDir})`
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