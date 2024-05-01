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

export default function CardThingpeakSendData(props: iCardSend) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    
    return <Card header={`${i18n.t('field')} ${props.num + 1}`}
        content={<>
            {/* Data source */}
            <CloudSourceSensor num={props.num}
                value={config.thingspeakSend.fields[props.num]}
                onChange={val => {
                    dispatch(cf.thingspeakSendFieldsChange({ num: props.num, val: val }));
                    dispatch(cf.thingspeakSendTypesChange({ num: props.num, val: 0 }));
                }}
            />

            {/* Sensor type */}
            <CloudSensorType num={props.num}
                value={config.thingspeakSend.types[props.num]}
                onChange={val => dispatch(cf.thingspeakSendTypesChange({ num: props.num, val: val }))}
                sens={config.thingspeakSend.fields[props.num]}
            />

            {config.thingspeakSend.fields[props.num] === 2 && <div className="mt-8">
                {/* Wireless sensor number */}
                <WsensorNumber value={config.thingspeakSend.wsensors[props.num]}
                    changeValue={val => dispatch(cf.thingspeakSendWsensorsChange({ num: props.num, val: val }))}
                />

                {/* Wireless sensor type of sensor */}
                <div className="mt-8">
                    <CloudWsensDataType num={props.num} 
                        value={config.thingspeakSend.wtypes[props.num]}
                        onChange={val => dispatch(cf.thingspeakSendWtypesChange({ num: props.num, val: val }))}
                        sens={config.thingspeakSend.wsensors[props.num]}
                    />
                </div>
            </div>}
        </>} 
    />
}