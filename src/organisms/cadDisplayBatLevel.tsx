import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as cf from "../redux/slices/config";
import * as vl from "../atoms/validateValues";

const CardDisplayBatLevel = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const batLevel = (num: number) => {
        if(vl.WsensorDataRelevance(num)) {
            if(vl.validateBatteryADC(data.wsensor.bat[num])) {
                const voltage = data.wsensor.bat[num] / (300.0 - config.wsensor.bat.k[num]);
                const umin = 3.75;
                const umax = config.wsensor.bat.type[num] == 0 ? 4.5 : 3.9;
                const stp = (umax - umin) / 4;
                let level = 0;
                if(voltage < (umin + stp)) level = 1;
                else if(voltage < (umin + stp * 2)) level = 2;
                else if(voltage < (umin + stp * 3)) level = 3;
                else level = 4;
                return level.toFixed() + ' ' + i18n.t(`units.bar.${level === 1 ? 'singular' : 'plural'}`);
            }
            else return '--';
        }
        else return i18n.t('dataExpired');
    }

    const sensors = [
        "--",
        i18n.t('wirelessSensor.singular'),
        'Thingspeak'
    ];

    let wsensors: string[] = [];
    for(let i=0; i<2; i++) wsensors.push(`${i18n.t('wirelessSensor.singular')} ${i} (${batLevel(i)})`);

    let things: string[] = [];
    for(let i=0; i<8; i++) {
        things.push(`${i18n.t('field')} ${i + 1} (${vl.ThingspeakDataRelevance() 
            ? data.thing.data[i] 
            : i18n.t('dataExpired')})`
        );
    }

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