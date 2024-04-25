import i18n from "../../i18n/main";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import { useSelector } from 'react-redux';

export default function Wsensor() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);

    function wsensData(num: number) {
        return vl.WsensorDataRelevance(num)
            ? {
                hum: `(${vl.validateHumidity(data.wsensor.hum.data[num]) 
                    ? ((data.wsensor.hum.data[num] + config.wsensor.hum.corr[num]).toFixed(2) + '%') 
                    : '--'})`,
                pres: `(${vl.validatePressure(data.wsensor.pres.data[num]) 
                    ? ((data.wsensor.pres.data[num] + config.wsensor.pres.corr[num]).toFixed(2) + i18n.t('units.hpa') + ' / ' 
                        + ((data.wsensor.pres.data[num] + config.wsensor.pres.corr[num]) * 0.75).toFixed(2) + i18n.t('units.mm')) 
                    : '--'})`
            }
            : {
                hum: i18n.t('dataExpired'),
                pres: i18n.t('dataExpired')
            }
    }

    return [
        wsensData(0),
        wsensData(1)
    ]
}