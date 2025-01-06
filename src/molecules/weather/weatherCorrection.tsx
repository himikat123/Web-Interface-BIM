import sensorCorrection from "../../atoms/sensorCorrection";
import i18n from "../../i18n/main";
import { useDispatch, useSelector } from "react-redux";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as cf from "../../redux/slices/config";

export default function WeatherCorrection() {
    const dispatch = useDispatch();
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    return <>
        {sensorCorrection(false, "t", 
            config.weather.corr.t, 
            i18n.t('temperature'), 
            data.weather.temp, 
            (val: number) => dispatch(cf.weatherCorrTemp(val)), 
            -10, 10, 0.1
        )}
        {sensorCorrection(false, "h", 
            config.weather.corr.h, 
            i18n.t('humidity'), 
            data.weather.hum, 
            (val: number) => dispatch(cf.weatherCorrHum(val)), 
            -10, 10, 0.1
        )}
        {sensorCorrection(false, "p", 
            config.weather.corr.p, 
            i18n.t('pressure'), 
            data.weather.pres, 
            (val: number) => dispatch(cf.weatherCorrPres(val)), 
            -20, 20, 0.1
        )}
    </>
}