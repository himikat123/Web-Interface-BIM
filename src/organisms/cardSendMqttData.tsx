import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import { iConfig } from "../redux/configTypes";
import { iCardSend } from "../interfaces";
import * as cf from "../redux/slices/config";
import CloudSourceSensor from "../molecules/cloudSourceSensor";
import CloudSensorType from "../molecules/cloudSensorType";
import WsensorNumber from "../molecules/wsensorNumber";
import CloudWsensDataType from "../molecules/cloudWsensDataType";
import MqttTopic from "../molecules/mqttSensorTopic";

export default function CardSendMqttData(props: iCardSend) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    
    return <Card header={`${i18n.t('sensor.singular')} ${props.num + 1}`}
        content={<>
            {/* Data source */}
            <CloudSourceSensor num={props.num}
                value={config.mqttSend.sensors[props.num]}
                onChange={val => {
                    dispatch(cf.mqttSendSensorsChange({ num: props.num, val: val }));
                    dispatch(cf.mqttSendTypesChange({ num: props.num, val: 0 }))
                }}
            />

            {/* Sensor type */}
            <CloudSensorType num={props.num}
                value={config.mqttSend.types[props.num]}
                onChange={val => dispatch(cf.mqttSendTypesChange({ num: props.num, val: val }))}
                sens={config.mqttSend.sensors[props.num]}
            />

            {config.mqttSend.sensors[props.num] === 2 && <div className="mt-8">
                {/* Wireless sensor number */}
                <WsensorNumber value={config.mqttSend.wsensors[props.num]}
                    changeValue={val => dispatch(cf.mqttSendWsensorsChange({ num: props.num, val: val }))}
                />

                {/* Wireless sensor type of sensor */}
                <div className="mt-8">
                    <CloudWsensDataType num={props.num} 
                        value={config.mqttSend.wtypes[props.num]}
                        onChange={val => dispatch(cf.mqttSendWtypesChange({ num: props.num, val: val }))}
                        sens={config.mqttSend.wsensors[props.num]}
                    />
                </div>
            </div>}

            {/* Topic */}
            {config.mqttSend.sensors[props.num] > 0 && <MqttTopic num={props.num} />}
        </>} 
    />
}