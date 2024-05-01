import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import SensorTypeHumIn from "../molecules/sensorTypeHumIn";
import WsensorNumber from "../molecules/wsensorNumber";
import ThingspeakField from "../molecules/thingspeakFields";
import SequenceHum from "../molecules/sequenceHum";
import Wsensor from "../atoms/indications/wsensor";

export default function CardDisplayHumidityIn() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const indications = [`(${Wsensor()[0].hum})`, `(${Wsensor()[1].hum})`];

    return <Card header={i18n.t('humidityIn')}
        content={<>
            {/* Sensor type */}
            <SensorTypeHumIn />
            
            {/* Wireless sensor number */}
            {config.display.source.humIn.sens === 2 && <WsensorNumber value={config.display.source.humIn.wsensNum} 
                changeValue={val => dispatch(cf.displaySourceHumInWsensNumChange(val))}
                indications={indications}
            />}

            {/* Thingspeak */}
            {config.display.source.humIn.sens === 3 && <ThingspeakField value={config.display.source.humIn.thing}
                changeValue={val => dispatch(cf.displaySourceHumInThingChange(val))} 
            />}

            {/* Sequence */}
            {config.display.source.humIn.sens === 4 && <SequenceHum />}
        </>} 
    />
}