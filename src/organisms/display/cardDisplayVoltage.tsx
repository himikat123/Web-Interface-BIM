import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import device from "../../device";
import Card from "../../atoms/card";
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";
import SensorTypeVoltage from "../../molecules/sensor/sensorTypeVoltage";
import WsensorNumber from "../../molecules/wsensor/wsensorNumber";
import WsensorType from "../../molecules/wsensor/wsensorVoltType";
import ThingspeakField from "../../molecules/thingspeak/thingspeakFields";
import ThingVoltType from "../../molecules/thingspeak/thingVoltType";

export default function CardDisplayVoltage() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <Card header={<div>
        {device() === 'WeatherMonitorBIM32' ? (i18n.t('voltage') + ' / ' + i18n.t('air')) : i18n.t('batteryVoltage')}
    </div>}
        content={<>
            {/* Sensor type */}
            <SensorTypeVoltage />

            {/* Wireless sensor number */}
            {config.display.source.volt.sens === (device() === 'WeatherMonitorBIM32' ? 1 : 400) && <div className="mt-8">
                <WsensorNumber value={config.display.source.volt.wsensNum ?? 0} 
                    changeValue={val => dispatch(cf.displaySourceVoltWsensNumChange(val))}
                />

                {/* Wireless sensor type of sensor */}
                <div className="mt-8"><WsensorType /></div>
            </div>}

            {/* Thingspeak */}
            {config.display.source.volt.sens === (device() === 'WeatherMonitorBIM32' ? 2 : 1) && <div className="mt-8">
                {device() === 'WeatherMonitorBIM32' && <ThingVoltType />}
                <ThingspeakField value={config.display.source.volt.thing}
                    changeValue={val => dispatch(cf.displaySourceVoltThingChange(val))} 
                />
            </div>}
        </>} 
    />
}