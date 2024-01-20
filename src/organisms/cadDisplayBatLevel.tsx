import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import SensorData from "../atoms/sensorData";

const CardDisplayBatLevel = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const sensors = [
        "--",
        i18n.t('wirelessSensor.singular'),
        'Thingspeak'
    ];

    let wsensors: string[] = [];
    for(let i=0; i<2; i++) wsensors.push(`${i18n.t('wirelessSensor.singular')} ${i} (${SensorData().Wsensor[i].batLevel})`);

    let things: string[] = [];
    for(let i=0; i<8; i++) things.push(`${i18n.t('field')} ${i + 1} (${SensorData().Thingspeak[i]})`);

    return <>
        <Card header={i18n.t('batteryLevel')}
            content={<>
                {/* Sensor type */}
                <SelectSwitch label={i18n.t('dataSource.singular')}
                    options={sensors}
                    value={config.display.source.bat.sens}
                    onChange={val => dispatch(cf.displaySourceBatSensChange(val))}
                />

                {/* Wireless sensor number */}
                {config.display.source.bat.sens === 1 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('wirelessSensorNumber')}
                        options={wsensors}
                        value={config.display.source.bat.wsensNum}
                        onChange={val => dispatch(cf.displaySourceBatWsensNumChange(val))}
                    />
                </div>}

                {/* Thingspeak */}
                {config.display.source.bat.sens === 2 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('field')}
                        options={things}
                        value={config.display.source.bat.thing}
                        onChange={val => dispatch(cf.displaySourceBatThingChange(val))}
                    />
                </div>}
            </>} 
        />
    </>
}

export default CardDisplayBatLevel;