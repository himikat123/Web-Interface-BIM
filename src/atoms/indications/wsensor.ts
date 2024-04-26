import i18n from "../../i18n/main";
import { iConfig } from "../../redux/configTypes";
import { iData } from "../../redux/dataTypes";
import { iWsensIndications } from "../../interfaces";
import * as vl from "../validateValues";
import { useSelector } from 'react-redux';

export default function Wsensor() {
    const config = useSelector((state: iConfig) => state.config);
    const data = useSelector((state: iData) => state.data);
    const exp = i18n.t('dataExpired');

    function wsensData(num: number) {
        const sens: iWsensIndications = {
            temp: [],
            hum: `(${vl.validateHumidity(data.wsensor.hum.data[num]) 
                ? ((data.wsensor.hum.data[num] + config.wsensor.hum.corr[num]).toFixed(2) + '%') 
                : '--'})`,
            pres: `(${vl.validatePressure(data.wsensor.pres.data[num]) 
                ? ((data.wsensor.pres.data[num] + config.wsensor.pres.corr[num]).toFixed(2) + i18n.t('units.hpa') + ' / ' 
                    + ((data.wsensor.pres.data[num] + config.wsensor.pres.corr[num]) * 0.75).toFixed(2) + i18n.t('units.mm')) 
                : '--'})`,
            volt: `(${vl.validateHighVoltage(data.wsensor.voltage.data[num]) 
                ? ((data.wsensor.voltage.data[num] + config.wsensor.volt.corr[num]).toFixed(2) + i18n.t('units.v')) 
                : '--'})`,
            co2: `(${vl.validateCO2(data.wsensor.co2.data[num]) 
                ? ((data.wsensor.co2.data[num] + config.wsensor.co2.corr[num]).toFixed(2) + 'ppm') 
                : '--'})` 
        };
        for(let i=0; i<5; i++) {
            sens.temp.push(
                `${vl.validateTemperature(data.wsensor.temp.data[i][num]) 
                    ? ((data.wsensor.temp.data[i][num] + config.wsensor.temp.corr[num][i]).toFixed(2) + '°C') 
                    : '--'}`
            );
        }

        return vl.WsensorDataRelevance(num)
            ? sens
            : {
                temp: [exp, exp, exp, exp, exp],
                hum: `(${exp})`,
                pres: `(${exp})`,
                volt: `(${exp})`,
                co2: `(${exp})`
            }
    }

    return [
        wsensData(0),
        wsensData(1)
    ]
}