import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import device from "../../device";
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
            {config.display.source.bat.sens === (device() === 'WeatherMonitorBIM32' ? 1 : 400) && <>
                <WsensorNumber value={config.display.source.bat.wsensNum ?? 0} 
                    changeValue={val => dispatch(cf.displaySourceBatWsensNumChange(val))}
                    indications={indications}
                />
            </>}

            {/* Thingspeak */}
            {config.display.source.bat.sens === (device() === 'WeatherMonitorBIM32' ? 2 : 1) && <>
                <ThingspeakField value={config.display.source.bat.thing}
                    changeValue={val => dispatch(cf.displaySourceBatThingChange(val))} 
                />
            </>}
        </>} 
    />
}