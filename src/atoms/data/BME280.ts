import i18n from "../../i18n/main";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../../atoms/validateValues";
import { useSelector } from 'react-redux';

export default function BME280() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    return {
        temp: `BME280 (${vl.validateTemperature(data.bme280.temp) 
            ? ((data.bme280.temp + config.sensors.bme280.t).toFixed(2) + '°C') 
            : '--'})`,

        hum: `BME280 (${vl.validateHumidity(data.bme280.hum) 
            ? ((data.bme280.hum + config.sensors.bme280.h).toFixed(2) + '%') 
            : '--'})`,

        pres: `BME280 (${vl.validatePressure(data.bme280.pres) 
            ? ((data.bme280.pres + config.sensors.bme280.p).toFixed(2) + i18n.t('units.hpa') + ' / ' 
                + ((data.bme280.pres + config.sensors.bme280.p) * 0.75).toFixed(2) + i18n.t('units.mm')) 
            : '--'})`
    }
}