import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";
import SensorTypeTempIn from "../../molecules/sensor/sensorTypeTempIn";
import WsensorNumber from "../../molecules/wsensor/wsensorNumber";
import WsensorTempNumber from "../../molecules/wsensor/wsensorTempNumber";
import ThingspeakField from "../../molecules/thingspeak/thingspeakFields";
import SequenceTemp from "../../molecules/sequence/sequenceTemp";

export default function CardDisplayTemperatureIn() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <Card header={i18n.t('temperatureIn')} content={<>
        {/* Sensor Type */}
        <SensorTypeTempIn />

        {/* Wireless Sensor */}
        {config.display.source.tempIn.sens === 2 && <>
            <WsensorNumber value={config.display.source.tempIn.wsensNum} 
                changeValue={val => dispatch(cf.displaySourceTempInWsensNumChange(val))}
            />
            <WsensorTempNumber wSensNum={config.display.source.tempIn.wsensNum}
                value={config.display.source.tempIn.temp}
                changeValue={val => dispatch(cf.displaySourceTempInTempChange(val))}
            />
        </>}

        {/* Thingspeak */}
        {config.display.source.tempIn.sens === 3 && <ThingspeakField value={config.display.source.tempIn.thing}
            changeValue={val => dispatch(cf.displaySourceTempInThingChange(val))} 
        />}

        {/* Sequence */}
        {config.display.source.tempIn.sens === 4 && <SequenceTemp />}
    </>} />
}