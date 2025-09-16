import React from "react";
import RangeInput from "./rangeInput";
import i18n from "../i18n/main";
import Indication from "./indication";
import * as vl from "./validateValues";
import { celsiusToFahrenheit } from "./indications/celsiusToFahrenheit";
import { hPaToMM } from "./indications/hPaToMM";

export default function sensorCorrection(
    color: boolean, dataType: string, corr: number, lblType: string | React.ReactNode, 
    lblData: number, onChange: any, min: number, max: number, step: number, localTemp: number, 
    localPres: number, hide?: boolean, lblName?: string
) {
    const countSymbolsAfterComma = () => (
        step.toString().includes('.') 
            ? step.toString().split('.').pop()?.length
            : 0
    );

    const round = () => {
        return (Math.round((lblData + corr) * (1 / step)) / (1 / step)).toFixed(countSymbolsAfterComma());
    }

    const toFahrenheit = () => {
        return (celsiusToFahrenheit(Math.round(lblData * (1 / step)) / (1 / step)) + corr).toFixed(countSymbolsAfterComma());
    }

    const toMM = () => {
        return (hPaToMM(Math.round(lblData * (1 / step)) / (1 / step)) + corr).toFixed(countSymbolsAfterComma());
    }

    const windDir = (deg: number) => {
        const keys = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(deg / 45) % 8;
        return i18n.t(`windDirs.${keys[index]}`);
    }

    let units: string = '';
    let val: string = '';

    switch(dataType) {
        case 't': // Temperature
            units = localTemp ? "°F" : "°C";
            val = (vl.validateTemperature(lblData) ? (localTemp ? toFahrenheit() : round()) : "--");
            break;
        case 'h': // Humidity
            units = "%";
            val = (vl.validateHumidity(lblData) ? round() : "--");
            break;
        case 'p': // Pressure
            units = localPres ? i18n.t('units.hpa') : i18n.t('units.mm');
            val = (vl.validatePressure(lblData) ? (localPres ? round() : toMM()) : "--");
            break;
        case 'ws': // Wind speed
            units = i18n.t('units.mps');
            val = (vl.validateWindSpeed(lblData) ? round() : "--");
            break;
        case 'wd': // Wind direction
            units = '';
            val = (vl.validateWindDirection(lblData) ? `${windDir(lblData)} (${Math.round(lblData)}°)` : "--");
            break;
        case 'l': // Ambient light
            units = i18n.t('units.lux');
            val = (vl.validateLight(lblData) ? round() : "--");
            break;
        case 'v': // Voltage
            units = i18n.t('units.v');
            val = (vl.validateAnalogVoltage(lblData) ? round() : "--");
            break;
        case 'i': // Index for Air Quality
            units = '';
            val = (vl.validateIaq(lblData) ? round() : "--");
            break;
        case 'co2': // CO2
            units = 'ppm';
            val = (vl.validateCO2(lblData) ? round() : "--");
            break;
        case 'hv': // High voltage
            units = i18n.t('units.v');
            val = (vl.validateHighVoltage(lblData) ? round() : "--");
            break;
        case 'cr': // Current
            units = i18n.t('units.a');
            val = (vl.validateCurrent(lblData) ? round() : "--");
            break;
        case 'pw': // Power
            units = i18n.t('units.w');
            val = (vl.validatePower(lblData) ? round() : "--");
            break;
        case 'eg': // Energy
            units = i18n.t('units.wh');
            val = (vl.validateEnergy(lblData) ? round() : "--");
            break;
        case 'fr': // Frequency
            units = i18n.t('units.hz');
            val = (vl.validateFrequency(lblData) ? round() : "--");
            break;
        default: ; break;
    }

    return <RangeInput value={corr}
        label={
            <div className="mt-4 sm:mt-8">
                {lblType}: 
                <Indication error={color} 
                    value={val + units + (
                        lblName 
                            ? (val !== '--' 
                                ? (', ' + lblName) 
                                : '') 
                            : ''
                    )} 
                />
            </div>} 
        min={min}
        max={max}
        limitMin={min}
        limitMax={max}
        step={step}
        indication={
            (corr > 0 
                ? ("+" + corr.toFixed(countSymbolsAfterComma())) 
                : corr.toFixed(countSymbolsAfterComma())
            ) + units
        }
        onChange={onChange}
        className={hide && (val === '--') ? 'hide' : ''}
    />
}