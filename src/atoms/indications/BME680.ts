import i18n from "../../i18n/main";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import { useSelector } from 'react-redux';

export default function BME680() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    return {
        temp: vl.validateTemperature(data.bme680?.temp ?? 0) 
            ? (((data.bme680?.temp ?? 0) + (config.sensors.bme680?.t ?? 0)).toFixed(2) + '°C') 
            : '--',

        hum: vl.validateHumidity(data.bme680?.hum ?? 0) 
            ? (((data.bme680?.hum ?? 0) + (config.sensors.bme680?.h ?? 0)).toFixed(2) + '%') 
            : '--',

        pres: vl.validatePressure(data.bme680?.pres ?? 0) 
            ? (((data.bme680?.pres ?? 0) + (config.sensors.bme680?.p ?? 0)).toFixed(2) + i18n.t('units.hpa') + ' / ' 
                + (((data.bme680?.pres ?? 0) + (config.sensors.bme680?.p ?? 0)) * 0.75).toFixed(2) + i18n.t('units.mm')) 
            : '--',

        iaq: vl.validateIaq(data.bme680?.iaq ?? 0) 
            ? ('IAQ ' + ((data.bme680?.iaq ?? 0) + (config.sensors.bme680?.i ?? 0)).toFixed(2)) 
            : '--'
    }
}