import i18n from "../../i18n/main";
import { iData } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import { useSelector } from 'react-redux';

export default function Forecast() {
    const data = useSelector((state: iData) => state.data);

    return {
        temp: vl.validateTemperature(data.weather.temp) 
            ? (data.weather.temp.toFixed(2) + '°C') 
            : '--',

        hum: vl.validateHumidity(data.weather.hum) 
            ? (data.weather.hum.toFixed(2) + '%') 
            : '--',

        pres: vl.validatePressure(data.weather.pres) 
            ? (data.weather.pres.toFixed(2) + i18n.t('units.hpa') + ' / ' 
                + ((data.weather.pres) * 0.75).toFixed(2) + i18n.t('units.mm')) 
            : '--'
    }
}