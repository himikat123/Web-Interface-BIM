import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { iConfig } from "../../redux/configTypes";
import * as cf from "../../redux/slices/config";
import SequenceDuration from "./sequenceDuration";
import SensorTypeHumSequence from "../sensor/sensorTypeHumSequence";
import WsensorNumber from "../wsensor/wsensorNumber";
import ThingspeakField from "../thingspeak/thingspeakFields";
import SequenceSlotName from "./sequenceSlotName";
import Wsensor from "../../atoms/indications/wsensor";

export default function SequenceHum() {
    const [humWsensNum, setHumWsensNum] = useState<number>(0);
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const indications = [`(${Wsensor()[0].hum})`, `(${Wsensor()[1].hum})`];

    return <div className="mt-8">
        <SequenceDuration />

        {[...Array(4)].map((m, num) => <div key={num}>
            <hr className="my-8 border-menu_light dark:border-menu_dark" />

            {/* Sensor type */}
            <div className="mt-8">
                <SensorTypeHumSequence num={num} />
            </div>

            {/* Wireless sensor */}
            {config.display.source.sequence.hum[num] === 2 && <>
                <WsensorNumber value={humWsensNum}
                    changeValue={(val: number) => {
                        setHumWsensNum(val);
                        dispatch(cf.displaySourceSequenceWsensHumChange({ num: num, wsens: 0, val: 0 }));
                        dispatch(cf.displaySourceSequenceWsensHumChange({ num: num, wsens: 1, val: 0 }))
                    }}
                    indications={indications}
                />
            </>}

            {/* Thingspeak */}
            {config.display.source.sequence.hum[num] === 3 && <ThingspeakField value={config.display.source.sequence.thnghum[num]}
                changeValue={(val: number) => dispatch(cf.displaySourceSequenceThngHumChange({ num: num, val: val }))}
            />}

            {/* Slot name */}
            <SequenceSlotName num={num} />
        </div>)}
    </div>
}