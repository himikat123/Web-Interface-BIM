import React, { useEffect, useState} from "react";
import TwoColumns from "../templates/twoColumns";
import { useSelector, useDispatch } from 'react-redux';
import i18n from '../i18n/main';
import Card from "../atoms/card";
import sensorCorrection from "../atoms/sensorCorrection";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as cf from "../redux/slices/config";

const WSensors = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    

    const content = <>{[...Array(2)].map((c, wsensorNum: number) =>
        <Card key={'ws' + wsensorNum} header={`${i18n.t('wirelessSensor.singular')} ${wsensorNum}`}
            content={<>
                <div className="text-center mb-4">
                    {i18n.t('dataFrom')}: 
                    <span className="ms-1 text-blue-700 dark:text-blue-400">{data.wsensor.time[wsensorNum]}</span>
                </div>
                {[...Array(5)].map((x, tempSensorNum: number) => <div key={'w' + tempSensorNum}>
                    {sensorCorrection("t", 
                        config.wsensor.temp.corr[wsensorNum][tempSensorNum], 
                        `${i18n.t('temperature')} ${tempSensorNum}`, 
                        data.wsensor.temp.data[tempSensorNum][wsensorNum], 
                        (val: number) => dispatch(cf.WSensTempChange({val: val, sens: wsensorNum, num: tempSensorNum})), 
                        data.wsensor.temp.name[tempSensorNum][wsensorNum]
                    )}
                </div>)}

                {sensorCorrection("h", 
                    config.wsensor.hum.corr[wsensorNum], 
                    i18n.t('humidity'), 
                    data.wsensor.hum.data[wsensorNum], 
                    (val: number) => dispatch(cf.WSensHumChange({val: val, num: wsensorNum})), 
                    data.wsensor.hum.name[wsensorNum]
                )}

                {sensorCorrection("p", 
                    config.wsensor.pres.corr[wsensorNum], 
                    i18n.t('pressure'), 
                    data.wsensor.pres.data[wsensorNum], 
                    (val: number) => dispatch(cf.WSensPresChange({val: val, num: wsensorNum})), 
                    data.wsensor.pres.name[wsensorNum]
                )}

                {sensorCorrection("l", 
                    config.wsensor.light.corr[wsensorNum], 
                    i18n.t('ambientLight'), 
                    data.wsensor.light.data[wsensorNum], 
                    (val: number) => dispatch(cf.WSensLightChange({val: val, num: wsensorNum})), 
                    data.wsensor.light.name[wsensorNum]
                )}
                {sensorCorrection("co2", 
                    config.wsensor.co2.corr[wsensorNum], 
                    i18n.t('CO2Level'), 
                    data.wsensor.co2.data[wsensorNum], 
                    (val: number) => dispatch(cf.WSensCO2Change({val: val, num: wsensorNum})), 
                    data.wsensor.co2.name[wsensorNum]
                )}
            </>}
        />)}
    </>;

    return <TwoColumns navbar={true}
        header={[i18n.t('wirelessSensor.plural')]} 
        content={[content]} 
        buttons={['save', 'reset']} 
    />
}

export default WSensors;