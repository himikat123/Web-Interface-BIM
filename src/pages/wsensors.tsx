import React, { useEffect, useState} from "react";
import TwoColumns from "../templates/twoColumns";
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../i18n/main';
import Card from "../atoms/card";
import Button from "../atoms/button";
import RangeInput from "../atoms/rangeInput";
import sensorCorrection from "../atoms/sensorCorrection";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as cf from "../redux/slices/config";
import * as vl from "../atoms/validateValues";

const WSensors = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const [hideUnnecessary, setHideUnnecessary] = useState<boolean>(true);

    const content = <>{[...Array(2)].map((c, wsensorNum: number) =>
        <Card key={'ws' + wsensorNum} header={`${i18n.t('wirelessSensor.singular')} ${wsensorNum}`}
            content={<div className="flex flex-col justify-between">
                <div>
                    <div className="text-center mb-4">
                        {i18n.t('dataFrom')}: 
                        <span className="ms-1 text-blue-700 dark:text-blue-400">{data.wsensor.time[wsensorNum]}</span>
                    </div>
                    {[...Array(5)].map((x, tempSensorNum: number) => <div key={'t' + tempSensorNum}>
                        {sensorCorrection("t", 
                            config.wsensor.temp.corr[wsensorNum][tempSensorNum], 
                            `${i18n.t('temperature')} ${tempSensorNum}`, 
                            data.wsensor.temp.data[tempSensorNum][wsensorNum], 
                            (val: number) => dispatch(cf.WSensTempChange({val: val, sens: wsensorNum, num: tempSensorNum})), 
                            -10, 10, 0.1,
                            hideUnnecessary,
                            data.wsensor.temp.name[tempSensorNum][wsensorNum]
                        )}
                    </div>)}

                    {sensorCorrection("h", 
                        config.wsensor.hum.corr[wsensorNum], 
                        i18n.t('humidity'), 
                        data.wsensor.hum.data[wsensorNum], 
                        (val: number) => dispatch(cf.WSensHumChange({val: val, num: wsensorNum})),
                        -10, 10, 0.1, 
                        hideUnnecessary,
                        data.wsensor.hum.name[wsensorNum]
                    )}

                    {sensorCorrection("p", 
                        config.wsensor.pres.corr[wsensorNum], 
                        i18n.t('pressure'), 
                        data.wsensor.pres.data[wsensorNum], 
                        (val: number) => dispatch(cf.WSensPresChange({val: val, num: wsensorNum})),
                        -10, 10, 0.1, 
                        hideUnnecessary,
                        data.wsensor.pres.name[wsensorNum]
                    )}

                    {sensorCorrection("l", 
                        config.wsensor.light.corr[wsensorNum], 
                        i18n.t('ambientLight'), 
                        data.wsensor.light.data[wsensorNum], 
                        (val: number) => dispatch(cf.WSensLightChange({val: val, num: wsensorNum})),
                        -10, 10, 0.1, 
                        hideUnnecessary,
                        data.wsensor.light.name[wsensorNum]
                    )}

                    {sensorCorrection("co2", 
                        config.wsensor.co2.corr[wsensorNum], 
                        i18n.t('CO2Level'), 
                        data.wsensor.co2.data[wsensorNum], 
                        (val: number) => dispatch(cf.WSensCO2Change({val: val, num: wsensorNum})),
                        -10, 10, 0.1, 
                        hideUnnecessary,
                        data.wsensor.co2.name[wsensorNum]
                    )}

                    {sensorCorrection("hv", 
                        config.wsensor.volt.corr[wsensorNum], 
                        i18n.t('voltage'), 
                        data.wsensor.voltage.data[wsensorNum], 
                        (val: number) => dispatch(cf.WSensHighVoltChange({val: val, num: wsensorNum})),
                        -10, 10, 0.1, 
                        hideUnnecessary,
                        data.wsensor.voltage.name[wsensorNum]
                    )}

                    {sensorCorrection("cr", 
                        config.wsensor.curr.corr[wsensorNum], 
                        i18n.t('current'), 
                        data.wsensor.current.data[wsensorNum], 
                        (val: number) => dispatch(cf.WSensCurrentChange({val: val, num: wsensorNum})),
                        -1, 1, 0.001,
                        hideUnnecessary,
                        data.wsensor.current.name[wsensorNum]
                    )}

                    {sensorCorrection("pw", 
                        config.wsensor.pow.corr[wsensorNum], 
                        i18n.t('power'), 
                        data.wsensor.power.data[wsensorNum], 
                        (val: number) => dispatch(cf.WSensPowerChange({val: val, num: wsensorNum})),
                        -10, 10, 0.1,
                        hideUnnecessary,
                        data.wsensor.power.name[wsensorNum]
                    )}

                    {sensorCorrection("eg", 
                        config.wsensor.enrg.corr[wsensorNum], 
                        i18n.t('energy'), 
                        data.wsensor.energy.data[wsensorNum], 
                        (val: number) => dispatch(cf.WSensEnergyChange({val: val, num: wsensorNum})),
                        -10, 10, 0.1,
                        hideUnnecessary,
                        data.wsensor.energy.name[wsensorNum]
                    )}

                    {sensorCorrection("fr", 
                        config.wsensor.freq.corr[wsensorNum], 
                        i18n.t('frequency'), 
                        data.wsensor.freq.data[wsensorNum], 
                        (val: number) => dispatch(cf.WSensFreqChange({val: val, num: wsensorNum})),
                        -10, 10, 0.1,
                        hideUnnecessary,
                        data.wsensor.power.name[wsensorNum]
                    )}
                </div>

                <div>
                    <hr className="my-8" />
                    <RangeInput value={config.wsensor.bat.k[wsensorNum]}
                        label={<div className="mt-8">
                            {i18n.t('batteryVoltage')}:
                            <span className="ms-1 text-blue-700 dark:text-blue-400">
                                {vl.validateBatteryADC(data.wsensor.bat[wsensorNum])
                                    ? (Math.round((data.wsensor.bat[wsensorNum] / (300 - config.wsensor.bat.k[wsensorNum])) * 1000) / 1000).toFixed(3)
                                    : "--"
                                }
                                {i18n.t('units.v')}
                            </span>
                        </div>} 
                        min={10}
                        max={250}
                        limitMin={10}
                        limitMax={250}
                        step={0.2}
                        indication={config.wsensor.bat.k[wsensorNum].toFixed(1)}
                        onChange={(val: number) => dispatch(cf.WSensBatKChange({val: val, num: wsensorNum}))}
                    />
                </div>
            </div>}
        />)}
    </>;

    return <>
        <TwoColumns navbar={true}
            header={[i18n.t('wirelessSensor.plural')]} 
            content={[content]} 
            buttons={['save', 'reset']} 
            footer={<div className="text-center">
                <Button className="bg-green-600 hover:bg-green-700 text-text_dark"
                    label={i18n.t(hideUnnecessary ? 'showAll' : 'hideUnused')}
                    onClick={() => {setHideUnnecessary(!hideUnnecessary)}}
                />
            </div>}
        />
    </>
}

export default WSensors;