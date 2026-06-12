import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import device from "../../device";
import { batLevelWsensor } from "../../atoms/indications/battery";
import Card from "../../atoms/card";
import type { iConfig } from "../../redux/configTypes";
import type { iData } from "../../redux/dataTypes";
import * as cf from "../../redux/slices/config";
import SensorTypeBatLevel from "../../molecules/sensor/sensorTypeBatLevel";
import WsensorNumber from "../../molecules/wsensor/wsensorNumber";
import ThingspeakField from "../../molecules/thingspeak/thingspeakFields";

export default function CardDisplayBatLevel() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    let indications = [];
    for(let i=0; i<2; i++) indications.push(batLevelWsensor(i, data.wsensor?.bat[i] ?? 0, config.wsensor?.bat.type[i] ?? 0, config.wsensor?.bat.k[i] ?? 0));

    return <Card header={i18n.t('batteryLevel')}
        content={<>
            {/* Sensor type */}
            <SensorTypeBatLevel />

            {/* Wireless sensor number */}
            {config.display.source.bat.sens === (device() === 'WeatherMonitorBIM32' ? 1 : 400) && <>
                <WsensorNumber value={config.display.source.bat.wsensNum ?? 0} 
                    changeValue={val => dispatch(cf.displaySourceBatWsensNumChange(val))}
                    indications={indications}
                />
            </>}

            {/* Thingspeak */}
            {config.display.source.bat.sens === 2 && <>
                <ThingspeakField value={config.display.source.bat.thing}
                    changeValue={val => dispatch(cf.displaySourceBatThingChange(val))} 
                />
            </>}
        </>} 
    />
}