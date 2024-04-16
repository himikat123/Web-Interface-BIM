import { useState, useEffect } from "react";
import i18n from "../i18n/main";
import { useSelector, useDispatch } from 'react-redux';
import SelectSwitch from "../atoms/selectSwitch";
import { iConfig } from "../redux/configTypes";
import * as cf from "../redux/slices/config";
import Forecast from "../atoms/data/forecast";
import BME280 from "../atoms/data/BME280";
import BMP180 from "../atoms/data/BMP180";
import SHT21 from "../atoms/data/SHT21";
import DHT22 from "../atoms/data/DHT22";
import DS18B20 from "../atoms/data/DS18B20";
import BME680 from "../atoms/data/BME680";

export default function SensorTypeTempIn() {
    const [prevSens, setPrevSens] = useState<number>(0);
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);

    const sensors = [
        '--', 
        Forecast().temp, 
        i18n.t('wirelessSensor.singular'), 
        'Thingspeak', 
        i18n.t('sequence'),
        BME280().temp, 
        BMP180().temp, 
        SHT21().temp, 
        DHT22().temp, 
        DS18B20().temp, 
        BME680().temp
    ];

    useEffect(() => {
        setPrevSens(config.display.source.tempIn.sens);
    }, [config.display.source.tempIn.sens]);

    return <SelectSwitch label={i18n.t('dataSource.singular')}
        options={sensors}
        value={config.display.source.tempIn.sens}
        onChange={val => {
            dispatch(cf.displaySourceTempInSensChange(val));
            if(val === 4) dispatch(cf.displaySourceHumInSensChange(val));
            if(prevSens === 4) dispatch(cf.displaySourceHumInSensChange(0));
        }}
    />
}