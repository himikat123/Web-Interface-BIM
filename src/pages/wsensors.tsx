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
                <div className="text-center mb-6">
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