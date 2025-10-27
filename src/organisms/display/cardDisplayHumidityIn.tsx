import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import device from "../../device";
import Card from "../../atoms/card";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as cf from "../../redux/slices/config";
import SensorTypeHumIn from "../../molecules/sensor/sensorTypeHumIn";
import WsensorNumber from "../../molecules/wsensor/wsensorNumber";
import ThingspeakField from "../../molecules/thingspeak/thingspeakFields";
import SequenceHum from "../../molecules/sequence/sequenceHum";
import wsensor from "../../atoms/indications/wsensor";

export default function CardDisplayHumidityIn() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const wsens = wsensor(config.wsensor, data.wsensor, config.units.pres);
    const indications = [`(${wsens[0].hum})`, `(${wsens[1].hum})`];

    return <Card header={i18n.t('humidityIn')}
        content={<>
            {/* Sensor type */}
            <SensorTypeHumIn />
            
            {/* Wireless sensor number */}
            {config.display.source.humIn.sens === (device() === 'WeatherMonitorBIM32' ? 2 : 400) && <>
                <WsensorNumber value={config.display.source.humIn.wsensNum ?? 0} 
                    changeValue={val => dispatch(cf.displaySourceHumInWsensNumChange(val))}
                    indications={indications}
                />
            </>}

            {/* Thingspeak */}
            {config.display.source.humIn.sens === (device() === 'WeatherMonitorBIM32' ? 3 : 2) && <>
                <ThingspeakField value={config.display.source.humIn.thing}
                    changeValue={val => dispatch(cf.displaySourceHumInThingChange(val))} 
                />
            </>}

            {/* Sequence */}
            {config.display.source.humIn.sens === (device() === 'WeatherMonitorBIM32' ? 4 : 400) && <SequenceHum />}
        </>} 
    />
}