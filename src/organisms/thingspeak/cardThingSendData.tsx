import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import { iConfig } from "../../redux/configTypes";
import { iCardSend } from "../../interfaces";
import * as cf from "../../redux/slices/config";
import CloudSourceSensor from "../../molecules/cloud/cloudSourceSensor";
import CloudSensorType from "../../molecules/cloud/cloudSensorType";
import CloudWsensDataType from "../../molecules/cloud/cloudWsensDataType";
import WsensorNumber from "../../molecules/wsensor/wsensorNumber";
import device from "../../device";

export default function CardThingpeakSendData(props: iCardSend) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    
    return <Card header={`${i18n.t('field')} ${props.num + 1}`}
        content={<>
            {/* Data source */}
            <CloudSourceSensor num={props.num}
                value={config.thingspeakSend.fields[props.num]}
                onChange={(val: number) => {
                    dispatch(cf.thingspeakSendFieldsChange({ num: props.num, val: val }));
                    dispatch(cf.thingspeakSendTypesChange({ num: props.num, val: 0 }));
                }}
            />

            {/* Sensor type */}
            <CloudSensorType num={props.num}
                value={config.thingspeakSend.types[props.num]}
                onChange={(val: number) => dispatch(cf.thingspeakSendTypesChange({ num: props.num, val: val }))}
                sens={config.thingspeakSend.fields[props.num]}
            />

            {config.thingspeakSend.fields[props.num] === (device() === 'WeatherMonitorBIM32' ? 2 : 400) && <div className="mt-8">
                {/* Wireless sensor number */}
                <WsensorNumber value={config.thingspeakSend?.wsensors ? config.thingspeakSend.wsensors[props.num] : 0}
                    changeValue={val => dispatch(cf.thingspeakSendWsensorsChange({ num: props.num, val: val }))}
                />

                {/* Wireless sensor type of sensor */}
                <div className="mt-8">
                    <CloudWsensDataType num={props.num} 
                        value={config.thingspeakSend?.wtypes ? config.thingspeakSend.wtypes[props.num] : 0}
                        onChange={(val: number) => dispatch(cf.thingspeakSendWtypesChange({ num: props.num, val: val }))}
                        sens={config.thingspeakSend?.wsensors ? config.thingspeakSend.wsensors[props.num] : 0}
                    />
                </div>
            </div>}
        </>} 
    />
}