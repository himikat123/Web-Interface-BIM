import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import SensorData from "../atoms/sensorData";

const CardDisplayComfort = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const comforts = [
        "--",
        `${i18n.t('comfortLevel')} (${SensorData().ForecastPres})`,
        `${i18n.t('nameSequence')}`
    ];

    return <>
        <Card header={i18n.t('additionalDescription')}
            content={<>
                {/* Sensor type */}
                <SelectSwitch label={i18n.t('dataSource.singular')}
                    options={comforts}
                    value={config.display.source.descr}
                    onChange={val => dispatch(cf.DisplaySourceDescrChange(val))}
                />
            </>} 
        />
    </>
}

export default CardDisplayComfort;