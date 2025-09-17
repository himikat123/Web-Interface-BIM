import { vaidateAbsHum, validateDewPoint } from "./validateValues";
import i18n from "../i18n/main";
import { TempLocale } from "./indications/celsiusToFahrenheit";
import * as vl from "./validateValues";

/*
 * Calculate absolute humidity
 */
export function absoluteHumVal(temp: number | undefined, hum: number | undefined): number {
    let abs = -4040;
    const t = temp ?? -4040;
    const h = hum ?? -4040;
    if(vl.validateTemperature(t) && vl.validateHumidity(h)) {
        const sat = 6.112 * Math.exp((17.67 * t) / (t + 243.5));
        const vap = sat * (h / 100.0);
        abs = (2.1674 * vap / (273.15 + t)) * 100;
    }

    return abs;
}

/*
 * Calculate absolute humidity
 */
export function absoluteHum(temp: number | undefined, hum: number | undefined): string {
    const abs = absoluteHumVal(temp, hum);
    return vaidateAbsHum(abs) ? (abs.toFixed(2) + i18n.t('units.gpm')) : '--';
}

/*
 * Calculate dew point
 */
export function dewPointVal(temp: number | undefined, hum: number | undefined): number {
    let dp = -4040;
    const t = temp ?? -4040;
    const h = hum ?? -4040;
    const A = 17.67, B = 243.5;
    if(vl.validateTemperature(t) && vl.validateHumidity(h)) {
        const alpha = Math.log(h / 100.0) + (A * t) / (B + t);
        dp = (B * alpha) / (A - alpha);
    }
    return dp;
}

/*
 * Calculate dew point
 */
export function dewPoint(temp: number | undefined, hum: number | undefined, useFahrenheit: number): string {
    const dp = dewPointVal(temp, hum);
    return validateDewPoint(dp, temp) 
        ? TempLocale(dp, useFahrenheit)
        : '--';
}