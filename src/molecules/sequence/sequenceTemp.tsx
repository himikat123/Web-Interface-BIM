import { useSelector, useDispatch } from 'react-redux';
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";
import SequenceDuration from "./sequenceDuration";
import SensorTypeTempSequence from "../sensor/sensorTypeTempSequence";
import WsensorNumber from "../wsensor/wsensorNumber";
import WsensorTempNumber from "../wsensor/wsensorTempNumber";
import ThingspeakField from "../thingspeak/thingspeakFields";
import SequenceSlotName from "./sequenceSlotName";

export default function SequenceTemp() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    return <div className="mt-8">
        <SequenceDuration />

        {[...Array(4)].map((m, num) => <div key={num}>
            <hr className="my-8 border-menu_light dark:border-menu_dark" />

            {/* Sensor type */}
            <div className="mt-8">
                <SensorTypeTempSequence num={num} />
            </div>

            {/* Wireless sensor */}
            {config.display.source.sequence.temp[num] === 2 && <>
                <WsensorNumber value={config.display.source.sequence.wsenstemp[num][0]}
                    changeValue={val => dispatch(cf.displaySourceSequenceWsensTempChange({ num: num, wsens: 0, val: val }))}
                />
                <WsensorTempNumber wSensNum={config.display.source.sequence.wsenstemp[num][0]}
                    value={config.display.source.sequence.wsenstemp[num][1]}
                    changeValue={(val: number) => dispatch(cf.displaySourceSequenceWsensTempChange({ num: num, wsens: 1, val: val }))}
                />
            </>}

            {/* Thingspeak */}
            {config.display.source.sequence.temp[num] === 3 && <ThingspeakField value={config.display.source.sequence.thngtemp[num]}
                changeValue={(val: number) => dispatch(cf.displaySourceSequenceThngTempChange({ num: num, val: val }))}
            />}

            {/* Slot name */}
            <SequenceSlotName num={num} />
        </div>)}
    </div>
}