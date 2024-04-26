import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import SequenceDuration from "./sequenceDuration";
import SensorTypeTempSequence from "./sensorTypeTempSequence";
import WsensorNumber from "./wsensorNumber";
import WsensorTempNumber from "./wsensorTempNumber";
import ThingspeakField from "./thingspeakFields";
import SequenceSlotName from "./sequenceSlotName";

export default function SequenceTemp() {
    const [tempWsensNum, setTempWsensNum] = useState<number>(0);
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
                <WsensorNumber value={tempWsensNum}
                    changeValue={val => {
                        setTempWsensNum(val);
                        dispatch(cf.displaySourceSequenceWsensTempChange({ num: num, wsens: 0, val: 0 }));
                        dispatch(cf.displaySourceSequenceWsensTempChange({ num: num, wsens: 1, val: 0 }))
                    }}
                />
                <WsensorTempNumber wSensNum={tempWsensNum}
                    value={config.display.source.sequence.wsenstemp[num][tempWsensNum]}
                    changeValue={val => dispatch(cf.displaySourceSequenceWsensTempChange({ num: num, wsens: tempWsensNum, val: val }))}
                />
            </>}

            {/* Thingspeak */}
            {config.display.source.sequence.temp[num] === 3 && <ThingspeakField value={config.display.source.sequence.thngtemp[num]}
                changeValue={val => dispatch(cf.displaySourceSequenceThngTempChange({ num: num, val: val }))}
            />}

            {/* Slot name */}
            <SequenceSlotName num={num} />
        </div>)}
    </div>
}