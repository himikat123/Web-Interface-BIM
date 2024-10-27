import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import device from "../../device";
import Card from "../../atoms/card";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";
import SensorTypeTempOut from "../../molecules/sensor/sensorTypeTempOut";
import WsensorNumber from "../../molecules/wsensor/wsensorNumber";
import WsensorTempNumber from "../../molecules/wsensor/wsensorTempNumber";
import ThingspeakField from "../../molecules/thingspeak/thingspeakFields";

export default function CardDisplayTemperatureOut() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <Card header={i18n.t('temperatureOut')} content={<>
        {/* Sensor Type */}
        <SensorTypeTempOut />

        {/* Wireless Sensor */}
        {config.display.source.tempOut.sens === (device() === 'WeatherMonitorBIM32' ? 2 : 400) && <>
            <WsensorNumber value={config.display.source.tempOut.wsensNum} 
                changeValue={val => dispatch(cf.displaySourceTempOutWsensNumChange(val))}
            />
            <WsensorTempNumber wSensNum={config.display.source.tempOut.wsensNum}
                value={config.display.source.tempOut.temp}
                changeValue={val => dispatch(cf.displaySourceTempOutTempChange(val))}
            />
        </>}

        {/* Thingspeak */}
        {config.display.source.tempOut.sens === (device() === 'WeatherMonitorBIM32' ? 3 : 2) && <>
            <ThingspeakField value={config.display.source.tempOut.thing}
                changeValue={val => dispatch(cf.displaySourceTempOutThingChange(val))} 
            />
        </>}
    </>} />
}