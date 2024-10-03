import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import { BatLevel } from "../../atoms/indications/battery";
import Card from "../../atoms/card";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";
import SensorTypeBatLevel from "../../molecules/sensor/sensorTypeBatLevel";
import WsensorNumber from "../../molecules/wsensor/wsensorNumber";
import ThingspeakField from "../../molecules/thingspeak/thingspeakFields";

export default function CardDisplayBatLevel() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const indications = [BatLevel(0), BatLevel(1)];

    return <Card header={i18n.t('batteryLevel')}
        content={<>
            {/* Sensor type */}
            <SensorTypeBatLevel />

            {/* Wireless sensor number */}
            {config.display.source.bat.sens === 1 && <WsensorNumber value={config.display.source.bat.wsensNum} 
                changeValue={val => dispatch(cf.displaySourceBatWsensNumChange(val))}
                indications={indications}
            />}

            {/* Thingspeak */}
            {config.display.source.bat.sens === 2 && <ThingspeakField value={config.display.source.bat.thing}
                changeValue={val => dispatch(cf.displaySourceBatThingChange(val))} 
            />}
        </>} 
    />
}