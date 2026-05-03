import i18n from "../../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../../atoms/card";
import type { iConfig } from "../../redux/configTypes";
import type { iDisplayTimeSlot } from "../../interfaces";
import * as cf from "../../redux/slices/config";
import TimeSlotDuration from "../../molecules/timeslot/timeSlotDuration";
import TimeSlotColor from "../../molecules/timeslot/timeSlotColor";
import TimeSlotDataSource from "../../molecules/timeslot/timeSlotDataSource";
import TimeSlotSensorType from "../../molecules/timeslot/timeSlotSensorType";
import TimeSlotThingSensType from "../../molecules/timeslot/timeSlotThingSensType";
import ThingspeakFields from "../../molecules/thingspeak/thingspeakFields";
import WsensorNumber from "../../molecules/wsensor/wsensorNumber";
import TimeSlotWsensDataType from "../../molecules/timeslot/timeSlotWsensDataType";
import * as D from "../../atoms/constants/displayTypes";
import * as S from "../../atoms/constants/sensorTypes";

export default function CardDisplayTimeSlot(props: iDisplayTimeSlot) {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const displayType = config.display.type ? config.display.type[props.num] : 0;

    return <Card header={i18n.t('timeSlot') + ' ' + String(props.slot + 1)} 
        content={<>
            {/* Duration */}
            <TimeSlotDuration slot={props.slot} num={props.num} />

            {config.display.timeSlot && config.display.timeSlot.period[props.slot][props.num] > 0 && <>
                {/* Color */}
                {(displayType === D.PIXEL || displayType === D.NUMITRON || displayType === D.VFD) && <div className="mt-8">
                    <TimeSlotColor slot={props.slot} num={props.num} />
                </div>}

                {/* Data source */}
                <div className="mt-8">
                    <TimeSlotDataSource slot={props.slot} num={props.num} />
                </div>

                {/* Sensor type */}
                <TimeSlotSensorType slot={props.slot} num={props.num} />

                {/* Thingspeak sensor type */}
                {config.display.timeSlot.sensor[props.slot][props.num] === S.DISPLAY_THINGSPEAK && <div className="mt-8">
                    <TimeSlotThingSensType slot={props.slot} num={props.num} />
                </div>}

                {/* Thingspeak field number */}
                {config.display.timeSlot.sensor[props.slot][props.num] === S.DISPLAY_THINGSPEAK && <div className="mt-8">
                    <ThingspeakFields value={config.display.timeSlot.thing[props.slot][props.num]}
                        changeValue={val => dispatch(cf.displayTimeslotThingChange({slot: props.slot, num: props.num, val: val}))}
                    />
                </div>}

                {/* Radio sensor */}
                {config.display.timeSlot.sensor[props.slot][props.num] === S.DISPLAY_RADIO_SENSOR && <div className="mt-8">
                    {/* Wireless sensor number */}
                    <WsensorNumber value={config.display.timeSlot.wsensor.num[props.slot][props.num]} 
                        changeValue={val => dispatch(cf.displayTimeslotWsensorNumChange({slot: props.slot, num: props.num, val: val}))}
                    />
                
                    {/* Wireless sensor data type */}
                    <div className="mt-8">
                        <TimeSlotWsensDataType slot={props.slot} num={props.num} />
                    </div>
                </div>}
            </>}
        </>}
    />
}