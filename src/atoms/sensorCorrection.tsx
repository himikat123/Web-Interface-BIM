import React from "react";
import i18n from "../i18n/main";
import RangeInput from "./rangeInput";
import Indication from "./indication";
import { windDirStr } from "./indications/windDirStr";
import * as vl from "./validateValues";
import { hPaToMM } from "./indications/hPaMM";

export default function sensorCorrection(
    color: boolean, dataType: string, corr: number, 
    lblType: string | React.ReactNode, lblData: number, 
    onChange: any, localPres: number, hide?: boolean, lblName?: string
) {
    let min = 0;
    let max = 1;
    let step = 0.1;
    const countSymbolsAfterComma = () => (
        step.toString().includes('.') 
            ? step.toString().split('.').pop()?.length
            : 0
    );

    const round = () => {
        return (Math.round((lblData + corr) * (1 / step)) / (1 / step)).toFixed(countSymbolsAfterComma());
    }

    const toMM = () => {
        return (hPaToMM(Math.round(lblData * (1 / step)) / (1 / step)) + corr).toFixed(countSymbolsAfterComma());
    }

    let units: string = '';
    let val: string = '';

    switch(dataType) {
        case 't': // Temperature
            units = "°C";
            val = (vl.validateTemperature(lblData) ? round() : "--");
            min = -20;
            max = 20;
            step = 0.1;
            break;
        case 'h': // Humidity
            units = "%";
            val = (vl.validateHumidity(lblData) ? round() : "--");
            min = -20;
            max = 20;
            step = 0.1;
            break;
        case 'p': // Pressure
            units = localPres ? i18n.t('units.hpa') : i18n.t('units.mm');
            val = (vl.validatePressureHPA(lblData) ? (localPres ? round() : toMM()) : "--");
            min = -50;
            max = 50;
            step = 0.1;
            break;
        case 'ws': // Wind speed
            units = i18n.t('units.mps');
            val = (vl.validateWindSpeed(lblData) ? round() : "--");
            min = -10;
            max = 10;
            step = 0.1;
            break;
        case 'wd': // Wind direction
            units = '';
            val = (vl.validateWindDirection(lblData) ? `${windDirStr(lblData)} (${Math.round(lblData)}°)` : "--");
            min = -100;
            max = 100;
            step = 1;
            break;
        case 'l': // Ambient light
            units = i18n.t('units.lux');
            val = (vl.validateLight(lblData) ? round() : "--");
            min = -20;
            max = 20;
            step = 0.1;
            break;
        case 'v': // Voltage
            units = i18n.t('units.v');
            val = (vl.validateAnalogVoltage(lblData) ? round() : "--");
            min = -10;
            max = 10;
            step = 0.01;
            break;
        case 'i': // Index for Air Quality
            units = '';
            val = (vl.validateIaq(lblData) ? round() : "--");
            min = -20;
            max = 20;
            step = 0.1;
            break;
        case 'co2': // CO2
            units = 'ppm';
            val = (vl.validateCO2(lblData) ? round() : "--");
            min = -100;
            max = 100;
            step = 0.1;
            break;
        case 'hv': // High voltage
            units = i18n.t('units.v');
            val = (vl.validateHighVoltage(lblData) ? round() : "--");
            min = -50;
            max = 50;
            step = 0.1;
            break;
        case 'cr': // Current
            units = i18n.t('units.a');
            val = (vl.validateCurrent(lblData) ? round() : "--");
            min = -10;
            max = 10;
            step = 0.001;
            break;
        case 'pw': // Power
            units = i18n.t('units.w');
            val = (vl.validatePower(lblData) ? round() : "--");
            min = -100;
            max = 100;
            step = 0.1;
            break;
        case 'eg': // Energy
            units = i18n.t('units.wh');
            val = (vl.validateEnergy(lblData) ? round() : "--");
            min = -100;
            max = 100;
            step = 0.1;
            break;
        case 'fr': // Frequency
            units = i18n.t('units.hz');
            val = (vl.validateFrequency(lblData) ? round() : "--");
            min = -10;
            max = 10;
            step = 0.1;
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
        onRelese={() => {}}
        className={hide && (val === '--') ? 'hide' : ''}
    />
}