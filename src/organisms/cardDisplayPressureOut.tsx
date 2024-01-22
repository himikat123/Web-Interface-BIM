import React from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import Card from "../atoms/card";
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import { iData } from "../redux/dataTypes";
import * as cf from "../redux/slices/config";
import * as vl from "../atoms/validateValues";

const CardDisplayPressureOut = () => {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    
    const sensors = [
        "--",
        `${i18n.t('forecast')} (${vl.validatePressure(data.weather.pres) ? (data.weather.pres.toFixed(2) + i18n.t('units.hpa') + ' / ' + (data.weather.pres * 0.75).toFixed(2) + i18n.t('units.mm')) : '--'})`,
        i18n.t('wirelessSensor.singular'),
        'Thingspeak',
        `BME280 (${vl.validatePressure(data.bme280.pres) ? ((data.bme280.pres + config.sensors.bme280.p).toFixed(2) + i18n.t('units.hpa') + ' / ' + ((data.bme280.pres + config.sensors.bme280.p) * 0.75).toFixed(2) + i18n.t('units.mm')) : '--'})`,
        `BMP180 (${vl.validatePressure(data.bmp180.pres) ? ((data.bmp180.pres + config.sensors.bmp180.p).toFixed(2) + i18n.t('units.hpa') + ' / ' + ((data.bmp180.pres + config.sensors.bmp180.p) * 0.75).toFixed(2) + i18n.t('units.mm')) : '--'})`,
        `BME680 (${vl.validatePressure(data.bme680.pres) ? ((data.bme680.pres + config.sensors.bme680.p).toFixed(2) + i18n.t('units.hpa') + ' / ' + ((data.bme680.pres + config.sensors.bme680.p) * 0.75).toFixed(2) + i18n.t('units.mm')) : '--'})`
    ];

    let wsensors: string[] = [];
    for(let i=0; i<2; i++) wsensors.push(`${i18n.t('wirelessSensor.singular')} ${i} (${vl.WsensorDataRelevance(i) 
        ? vl.validatePressure(data.wsensor.pres.data[i]) 
            ? ((data.wsensor.pres.data[i] + config.wsensor.pres.corr[i]).toFixed(2) + i18n.t('units.hpa') + ' / ' + ((data.wsensor.pres.data[i] + config.wsensor.pres.corr[i]) * 0.75).toFixed(2) + i18n.t('units.mm')) 
            : '--' 
        : i18n.t('dataExpired')})`);

    let things: string[] = [];
    for(let i=0; i<8; i++) things.push(`${i18n.t('field')} ${i + 1} (${vl.ThingspeakDataRelevance() ? data.thing.data[i] : i18n.t('dataExpired')})`);

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