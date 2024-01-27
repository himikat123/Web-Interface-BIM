import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import Toggle from "../atoms/toggle";
import Indication from "../atoms/indication";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as cf from "../redux/slices/config";
import * as vl from "../atoms/validateValues";
import "./cardComfort.scss";

const CardComfortAirQuality = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    const sensors = [
        "--",
        `BME680 (${vl.validateIaq(data.bme680.iaq) ? ('iaq ' + (data.bme680.iaq + config.sensors.bme680.i).toFixed(2)) : '--'})`
    ];

    let iaq = -40400;
    if(config.comfort.iaq.source === 1) iaq = data.bme680.iaq + config.sensors.bme680.i; // IAQ from BME680

    let comfort = i18n.t('cleanAir');
    if(vl.validateIaq(iaq)) {
        if(iaq >= 100) comfort = i18n.t('polutedAir');
        if(iaq >= 200) comfort = i18n.t('havilyPolutedAir');
    }
    else comfort = '--';

    return <>
        <Card header={i18n.t('indexForAirQuality')}
            content={<>
                {/* Sensor type */}
                <SelectSwitch label={i18n.t('dataSource.singular')}
                    options={sensors}
                    value={config.comfort.iaq.source}
                    onChange={val => dispatch(cf.comfortIaqSourceChange(val))}
                />
                
                {<div className={'card-comfort ' + (config.comfort.iaq.source > 0 ? 'show' : 'hide')}>
                    <div className="mt-6"><Indication error={false} value={comfort} /></div>

                    <div className="mt-8">
                        <Toggle label={i18n.t('soundNotification')}
                            checked={config.comfort.iaq.sound}
                            onChange={() => dispatch(cf.comfortIaqSoundChange(config.comfort.iaq.sound ? 0 : 1))}
                        />
                    </div>

                    <table className="table-auto w-full mt-8">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-600">
                                <th>{i18n.t('indexForAirQuality')}</th>
                                <th>{i18n.t('airQuality')}</th>
                            </tr>
                        </thead>
                        <tbody className="text-center text-black">
                            <tr className="bg-green-200">
                                <td>&lt; 100</td>
                                <td>{i18n.t('cleanAir')}</td>
                            </tr>
                            <tr className="bg-yellow-200">
                                <td>100 - 200</td>
                                <td>{i18n.t('polutedAir')}</td>
                            </tr>
                            <tr className="bg-red-300">
                                <td>&gt; 200</td>
                                <td>{i18n.t('havilyPolutedAir')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>}
            </>} 
        />
    </>
}

export default CardComfortAirQuality;