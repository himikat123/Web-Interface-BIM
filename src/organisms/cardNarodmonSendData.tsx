import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import { iConfig } from "../redux/configTypes";
import { iCardSend } from "../interfaces";
import * as cf from "../redux/slices/config";
import NarodmonSourceSensor from "../molecules/narodmonSourceSensor";
import NarodmonSensorType from "../molecules/narodmonSensorType";
import WsensorNumber from "../molecules/wsensorNumber";
import NarodmonWsensDataType from "../molecules/narodmonWsensDataType";
import NarodmonSensorMetric from "../molecules/narodmonSensorMetric";

export default function CardNarodmonSendData(props: iCardSend) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    
    return <Card header={`${i18n.t('sensor.singular')} ${props.num + 1}`}
        content={<>
            {/* Data source */}
            <NarodmonSourceSensor num={props.num} />

            {/* Sensor type */}
            <NarodmonSensorType num={props.num} />

            {config.narodmonSend.sensors[props.num] === 2 && <div className="mt-8">
                {/* Wireless sensor number */}
                <WsensorNumber value={config.narodmonSend.wsensors[props.num]}
                    changeValue={val => dispatch(cf.narodmonSendWsensorsChange({ num: props.num, val: val }))}
                />

                {/* Wireless sensor type of sensor */}
                <div className="mt-8">
                    <NarodmonWsensDataType num={props.num} />
                </div>
            </div>}

            {/* Sensor metric */}
            {config.narodmonSend.sensors[props.num] > 0 && <NarodmonSensorMetric num={props.num} />}
        </>} 
    />
}