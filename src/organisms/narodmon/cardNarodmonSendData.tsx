import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import { iConfig } from "../../redux/configTypes";
import { iCardSend } from "../../interfaces";
import * as cf from "../../redux/slices/config";
import CloudSourceSensor from "../../molecules/cloud/cloudSourceSensor";
import CloudSensorType from "../../molecules/cloud/cloudSensorType";
import WsensorNumber from "../../molecules/wsensor/wsensorNumber";
import CloudWsensDataType from "../../molecules/cloud/cloudWsensDataType";
import NarodmonSensorMetric from "../../molecules/narodmonSensorMetric";

export default function CardNarodmonSendData(props: iCardSend) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    
    return <Card header={`${i18n.t('sensor.singular')} ${props.num + 1}`}
        content={<>
            {/* Data source */}
            <CloudSourceSensor num={props.num}
                value={config.narodmonSend.sensors[props.num]}
                onChange={(val: number) => {
                    dispatch(cf.narodmonSendSensorsChange({ num: props.num, val: val }));
                    dispatch(cf.narodmonSendTypesChange({ num: props.num, val: 0 }))
                }}
            />

            {/* Sensor type */}
            <CloudSensorType num={props.num}
                value={config.narodmonSend.types[props.num]}
                onChange={(val: number) => dispatch(cf.narodmonSendTypesChange({ num: props.num, val: val }))}
                sens={config.narodmonSend.sensors[props.num]}
            />

            {config.narodmonSend.sensors[props.num] === 2 && <div className="mt-8">
                {/* Wireless sensor number */}
                <WsensorNumber value={config.narodmonSend.wsensors[props.num]}
                    changeValue={val => dispatch(cf.narodmonSendWsensorsChange({ num: props.num, val: val }))}
                />

                {/* Wireless sensor type of sensor */}
                <div className="mt-8">
                    <CloudWsensDataType num={props.num} 
                        value={config.narodmonSend.wtypes[props.num]}
                        onChange={(val: number) => dispatch(cf.narodmonSendWtypesChange({ num: props.num, val: val }))}
                        sens={config.narodmonSend.wsensors[props.num]}
                    />
                </div>
            </div>}

            {/* Sensor metric */}
            {config.narodmonSend.sensors[props.num] > 0 && <NarodmonSensorMetric num={props.num} />}
        </>} 
    />
}