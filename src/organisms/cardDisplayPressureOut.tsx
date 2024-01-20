import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import SensorData from "../atoms/sensorData";

const CardDisplayPressureOut = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const sensors = [
        "--",
        i18n.t('forecast') + ' (' + SensorData().ForecastPres + ')',
        i18n.t('wirelessSensor.singular'),
        'Thingspeak',
        'BME280 (' + SensorData().BME280pres + ')',
        'BMP180 (' + SensorData().BMP180pres + ')',
        'BME680 (' + SensorData().BME680pres + ')'
    ];

    let wsensors: string[] = [];
    for(let i=0; i<2; i++) wsensors.push(`${i18n.t('wirelessSensor.singular')} ${i} (${SensorData().Wsensor[i].pres})`);

    let things: string[] = [];
    for(let i=0; i<8; i++) things.push(`${i18n.t('field')} ${i + 1} (${SensorData().Thingspeak[i]})`);

    return <>
        <Card header={i18n.t('pressure')}
            content={<>
                {/* Sensor type */}
                <SelectSwitch label={i18n.t('dataSource.singular')}
                    options={sensors}
                    value={config.display.source.presOut.sens}
                    onChange={val => dispatch(cf.displaySourcePresOutSensChange(val))}
                />

                {/* Wireless sensor number */}
                {config.display.source.presOut.sens === 2 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('wirelessSensorNumber')}
                        options={wsensors}
                        value={config.display.source.presOut.wsensNum}
                        onChange={val => dispatch(cf.displaySourcePresOutWsensNumChange(val))}
                    />
                </div>}

                {/* Thingspeak */}
                {config.display.source.presOut.sens === 3 && <div className="mt-8">
                    <SelectSwitch label={i18n.t('field')}
                        options={things}
                        value={config.display.source.presOut.thing}
                        onChange={val => dispatch(cf.displaySourcePresOutThingChange(val))}
                    />
                </div>}
            </>} 
        />
    </>
}

export default CardDisplayPressureOut;