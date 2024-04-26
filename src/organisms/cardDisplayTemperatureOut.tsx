import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import SensorTypeTempOut from "../molecules/sensorTypeTempOut";
import WsensorNumber from "../molecules/wsensorNumber";
import WsensorTempNumber from "../molecules/wsensorTempNumber";
import ThingspeakField from "../molecules/thingspeakFields";

export default function CardDisplayTemperatureOut() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <Card header={i18n.t('temperatureOut')} content={<>
        {/* Sensor Type */}
        <SensorTypeTempOut />

        {/* Wireless Sensor */}
        {config.display.source.tempOut.sens === 2 && <>
            <WsensorNumber value={config.display.source.tempOut.wsensNum} 
                changeValue={val => dispatch(cf.displaySourceTempOutWsensNumChange(val))}
            />
            <WsensorTempNumber wSensNum={config.display.source.tempOut.wsensNum}
                value={config.display.source.tempOut.temp}
                changeValue={val => dispatch(cf.displaySourceTempOutTempChange(val))}
            />
        </>}

        {/* Thingspeak */}
        {config.display.source.tempOut.sens === 3 && <ThingspeakField value={config.display.source.tempOut.thing}
            changeValue={val => dispatch(cf.displaySourceTempOutThingChange(val))} 
        />}
    </>} />
}