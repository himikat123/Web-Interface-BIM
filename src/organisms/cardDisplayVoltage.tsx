import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import SensorTypeVoltage from "../molecules/sensorTypeVoltage";
import WsensorNumber from "../molecules/wsensorNumber";
import WsensorType from "../molecules/wsensorVoltType";
import ThingspeakField from "../molecules/thingspeakFields";
import ThingVoltType from "../molecules/thingVoltType";

export default function CardDisplayVoltage() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <Card header={<div>{`${i18n.t('voltage')} / ${i18n.t('air')}`}</div>}
        content={<>
            {/* Sensor type */}
            <SensorTypeVoltage />

            {/* Wireless sensor number */}
            {config.display.source.volt.sens === 1 && <div className="mt-8">
                <WsensorNumber value={config.display.source.volt.wsensNum} 
                    changeValue={val => dispatch(cf.displaySourceVoltWsensNumChange(val))}
                />

                {/* Wireless sensor type of sensor */}
                <div className="mt-8"><WsensorType /></div>
            </div>}

            {/* Thingspeak */}
            {config.display.source.volt.sens === 2 && <div className="mt-8">
                <ThingVoltType />
                <ThingspeakField value={config.display.source.volt.thing}
                    changeValue={val => dispatch(cf.displaySourceVoltThingChange(val))} 
                />
            </div>}
        </>} 
    />
}