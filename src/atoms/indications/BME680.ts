import i18n from "../../i18n/main";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import { useSelector } from 'react-redux';

export default function BME680() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    return {
        temp: vl.validateTemperature(data.bme680.temp) 
            ? ((data.bme680.temp + config.sensors.bme680.t).toFixed(2) + '°C') 
            : '--',

        hum: vl.validateHumidity(data.bme680.hum) 
            ? ((data.bme680.hum + config.sensors.bme680.h).toFixed(2) + '%') 
            : '--',

        pres: vl.validatePressure(data.bme680.pres) 
            ? ((data.bme680.pres + config.sensors.bme680.p).toFixed(2) + i18n.t('units.hpa') + ' / ' 
                + ((data.bme680.pres + config.sensors.bme680.p) * 0.75).toFixed(2) + i18n.t('units.mm')) 
            : '--',

        iaq: vl.validateIaq(data.bme680.iaq) 
            ? ('IAQ ' + (data.bme680.iaq + config.sensors.bme680.i).toFixed(2)) 
            : '--'
    }
}