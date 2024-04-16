import i18n from "../../i18n/main";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../../atoms/validateValues";
import { useSelector } from 'react-redux';

export default function BMP180() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    return {
        temp: `BMP180 (${vl.validateTemperature(data.bmp180.temp) 
            ? ((data.bmp180.temp + config.sensors.bmp180.t).toFixed(2) + '°C') 
            : '--'})`,

        pres: `BMP180 (${vl.validatePressure(data.bmp180.pres) 
            ? ((data.bmp180.pres + config.sensors.bmp180.p).toFixed(2) + i18n.t('units.hpa') + ' / ' 
                + ((data.bmp180.pres + config.sensors.bmp180.p) * 0.75).toFixed(2) + i18n.t('units.mm')) 
            : '--'})`
    }
}