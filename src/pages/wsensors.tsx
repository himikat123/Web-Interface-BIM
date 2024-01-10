import React, { useEffect, useState} from "react";
import TwoColumns from "../templates/twoColumns";
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'react-moment';
import i18n from '../i18n/main';
import Card from "../atoms/card";
import Button from "../atoms/button";
import RangeInput from "../atoms/rangeInput";
import SelectSwitch from "../atoms/selectSwitch";
import NumberInput from "../atoms/numberInput";
import sensorCorrection from "../atoms/sensorCorrection";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import { wsensorsValidChange } from "../redux/slices/valid";
import * as cf from "../redux/slices/config";
import * as vl from "../atoms/validateValues";

const WSensors = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const [hideUnnecessary, setHideUnnecessary] = useState<boolean>(true);
    const [isValid, setIsValid] = useState<boolean[]>([]);

    useEffect(() => {
        dispatch(wsensorsValidChange(!isValid.includes(false)));
    });

    const dataRelevance = (num: number) => {
        return (Math.floor(Date.now() / 1000) - data.wsensor.time[num] > config.wsensor.expire[num] * 60) && data.wsensor.time[num] > 0;
    }

    const content = <>{[...Array(2)].map((c, wsensorNum: number) =>
        <Card key={'ws' + wsensorNum} header={`${i18n.t('wirelessSensor.singular')} ${wsensorNum}`}
            content={<>
                <div className="text-center mb-4">
                    {i18n.t('dataFrom')}:
                    <span className={"ms-1 " + (dataRelevance(wsensorNum) 
                        ? "text-red-500 dark:text-red-600" 
                        : "text-blue-700 dark:text-blue-400"
                    )}>
                        {data.wsensor.time[wsensorNum] === 0
                            ? <span>--</span>
                            : <Moment unix format="HH:mm:ss DD.MM.YYYY">{data.wsensor.time[wsensorNum]}</Moment>
                        }
                        {dataRelevance(wsensorNum) 
                            ? <div>{i18n.t("dataExpired")}</div>
                            : <div className="h-6"></div>
                        }
                    </span>
                </div>

                <hr className="mt-8" />
                
                {[...Array(5)].map((x, tempSensorNum: number) => <div key={'t' + tempSensorNum}>
                    {sensorCorrection(dataRelevance(wsensorNum), "t", 
                        config.wsensor.temp.corr[wsensorNum][tempSensorNum], 
                        `${i18n.t('temperature')} ${tempSensorNum}`, 
                        data.wsensor.temp.data[tempSensorNum][wsensorNum], 
                        (val: number) => dispatch(cf.WSensTempChange({val: val, sens: wsensorNum, num: tempSensorNum})), 
                        -10, 10, 0.1,
                        hideUnnecessary,
                        data.wsensor.temp.name[tempSensorNum][wsensorNum]
                    )}
                </div>)}

                {sensorCorrection(dataRelevance(wsensorNum), "h", 
                    config.wsensor.hum.corr[wsensorNum], 
                    i18n.t('humidity'), 
                    data.wsensor.hum.data[wsensorNum], 
                    (val: number) => dispatch(cf.WSensHumChange({val: val, num: wsensorNum})),
                    -10, 10, 0.1, 
                    hideUnnecessary,
                    data.wsensor.hum.name[wsensorNum]
                )}

                {sensorCorrection(dataRelevance(wsensorNum), "p", 
                    config.wsensor.pres.corr[wsensorNum], 
                    i18n.t('pressure'), 
                    data.wsensor.pres.data[wsensorNum], 
                    (val: number) => dispatch(cf.WSensPresChange({val: val, num: wsensorNum})),
                    -10, 10, 0.1, 
                    hideUnnecessary,
                    data.wsensor.pres.name[wsensorNum]
                )}

                {sensorCorrection(dataRelevance(wsensorNum), "l", 
                    config.wsensor.light.corr[wsensorNum], 
                    i18n.t('ambientLight'), 
                    data.wsensor.light.data[wsensorNum], 
                    (val: number) => dispatch(cf.WSensLightChange({val: val, num: wsensorNum})),
                    -10, 10, 0.1, 
                    hideUnnecessary,
                    data.wsensor.light.name[wsensorNum]
                )}

                {sensorCorrection(dataRelevance(wsensorNum), "co2", 
                    config.wsensor.co2.corr[wsensorNum], 
                    i18n.t('CO2Level'), 
                    data.wsensor.co2.data[wsensorNum], 
                    (val: number) => dispatch(cf.WSensCO2Change({val: val, num: wsensorNum})),
                    -10, 10, 0.1, 
                    hideUnnecessary,
                    data.wsensor.co2.name[wsensorNum]
                )}

                {sensorCorrection(dataRelevance(wsensorNum), "hv", 
                    config.wsensor.volt.corr[wsensorNum], 
                    i18n.t('voltage'), 
                    data.wsensor.voltage.data[wsensorNum], 
                    (val: number) => dispatch(cf.WSensHighVoltChange({val: val, num: wsensorNum})),
                    -10, 10, 0.1, 
                    hideUnnecessary,
                    data.wsensor.voltage.name[wsensorNum]
                )}

                {sensorCorrection(dataRelevance(wsensorNum), "cr", 
                    config.wsensor.curr.corr[wsensorNum], 
                    i18n.t('current'), 
                    data.wsensor.current.data[wsensorNum], 
                    (val: number) => dispatch(cf.WSensCurrentChange({val: val, num: wsensorNum})),
                    -1, 1, 0.001,
                    hideUnnecessary,
                    data.wsensor.current.name[wsensorNum]
                )}

                {sensorCorrection(dataRelevance(wsensorNum), "pw", 
                    config.wsensor.pow.corr[wsensorNum], 
                    i18n.t('power'), 
                    data.wsensor.power.data[wsensorNum], 
                    (val: number) => dispatch(cf.WSensPowerChange({val: val, num: wsensorNum})),
                    -10, 10, 0.1,
                    hideUnnecessary,
                    data.wsensor.power.name[wsensorNum]
                )}

                {sensorCorrection(dataRelevance(wsensorNum), "eg", 
                    config.wsensor.enrg.corr[wsensorNum], 
                    i18n.t('energy'), 
                    data.wsensor.energy.data[wsensorNum], 
                    (val: number) => dispatch(cf.WSensEnergyChange({val: val, num: wsensorNum})),
                    -10, 10, 0.1,
                    hideUnnecessary,
                    data.wsensor.energy.name[wsensorNum]
                )}

                {sensorCorrection(dataRelevance(wsensorNum), "fr", 
                    config.wsensor.freq.corr[wsensorNum], 
                    i18n.t('frequency'), 
                    data.wsensor.freq.data[wsensorNum], 
                    (val: number) => dispatch(cf.WSensFreqChange({val: val, num: wsensorNum})),
                    -10, 10, 0.1,
                    hideUnnecessary,
                    data.wsensor.power.name[wsensorNum]
                )}

                <hr className="mt-8" />

                <RangeInput value={config.wsensor.bat.k[wsensorNum]}
                    label={<div className="mt-8">
                        {i18n.t('batteryVoltage')}:
                        <span className={"ms-1 " + (dataRelevance(wsensorNum) ? "text-red-500 dark:text-red-600" : "text-blue-700 dark:text-blue-400")}>
                            {vl.validateBatteryADC(data.wsensor.bat[wsensorNum])
                                ? (Math.round((data.wsensor.bat[wsensorNum] / (300 - config.wsensor.bat.k[wsensorNum])) * 1000) / 1000).toFixed(3)
                                : "--"
                            }
                            {i18n.t('units.v')}
                        </span></div>
                    } 
                    min={10}
                    max={250}
                    limitMin={10}
                    limitMax={250}
                    step={0.2}
                    indication={config.wsensor.bat.k[wsensorNum].toFixed(1)}
                    onChange={(val: number) => dispatch(cf.WSensBatKChange({val: val, num: wsensorNum}))}
                />

                <div className="my-8">
                    <SelectSwitch label={i18n.t('sourceOfPower')}
                        options={[
                            i18n.t('threeBatteries'), 
                            i18n.t('liIonBattery')
                        ]}
                        value={config.wsensor.bat.type[wsensorNum]}
                        onChange={(val: number) => dispatch(cf.WSensBatTypeChange({val: val, num: wsensorNum}))}
                    />
                </div>

                <div className="my-8">
                    <NumberInput value={config.wsensor.channel}
                        min={1}
                        max={100}
                        label={i18n.t('channelNumber')}
                        onChange={val => dispatch(cf.WSensChannelChange(val))}
                        isValid={(valid: boolean) => {
                            let nv = isValid;
                            nv[wsensorNum] = valid;
                            setIsValid(nv);
                        }}
                    />
                </div>

                <div className="my-8">
                    <NumberInput value={config.wsensor.expire[wsensorNum]}
                        min={1}
                        max={100}
                        label={i18n.t('dataExpirationTime')}
                        onChange={val => dispatch(cf.WSensExpireChange({val: val, num: wsensorNum}))}
                        isValid={(valid: boolean) => {
                            let nv = isValid;
                            nv[wsensorNum + 2] = valid;
                            setIsValid(nv);
                        }}
                    />
                </div>
            </>}
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