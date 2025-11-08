import type { iSensorTHPIconfig } from "../../redux/configTypes/sensors";
import type { iSensorTHPIdata } from "../../redux/dataTypes";
import * as vl from "../validateValues";
import * as calculate from "../calculate";
import { PresLocale } from "./hPaMM";

export default function tempHumPresIaq(conf: iSensorTHPIconfig | undefined, data: iSensorTHPIdata | undefined, units: number) {
    const temp = data?.temp ?? 40400;
    const hum = data?.hum ?? 40400;
    const pres = data?.pres ?? 40400;
    const iaq = data?.iaq ?? 40400;
    const tempCorr = temp + (conf?.t ?? 0);
    const humCorr = hum + (conf?.h ?? 0);

    return {
        temp: vl.validateTemperature(temp) ? tempCorr.toFixed(1) + '°C' : '--',
        hum: vl.validateHumidity(hum) ? humCorr.toFixed(1) + '%' : '--',
        pres: vl.validatePressureHPA(pres) ? PresLocale(pres, conf?.p ?? 0, units) : '--',
        iaq: vl.validateIaq(iaq) ? 'IAQ ' + iaq.toFixed(1) : '--',
        aHum: calculate.absoluteHum(tempCorr, humCorr),
        dp: calculate.dewPoint(tempCorr, humCorr)
    }
}