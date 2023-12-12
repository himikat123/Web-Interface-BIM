import React from "react";
import RangeInput from "./rangeInput";
import i18n from "../i18n/main";
import * as vl from "./validateValues";

const sensorCorrection = (type: string, val: number, lblType: string, lblData: number, onChange: any, min: number, max: number, step: number, lblName?: string) => {
    const countSymbolsAfterComma = () => ((step.toString().includes('.')) ? (step.toString().split('.').pop()?.length) : (0));

    const round = () => {
        return (Math.round((lblData + val) * (1 / step)) / (1 / step)).toFixed(countSymbolsAfterComma());
    }

    let units: string = "";
    let label: string = "";
    switch(type) {
        case 't': { // Temperature
            units = "°C";
            label = (vl.validateTemperature(lblData) ? round() : "--") + units;
        }; break;
        case 'h': { // Humidity
            units = "%";
            label = (vl.validateHumidity(lblData) ? round() : "--") + units;
        }; break;
        case 'p': { // Pressure
            const hpa = round();
            const mm = (Math.round((lblData + val) * 7.5) / 10).toFixed(1);
            units = i18n.t('units.hpa');
            label = (vl.validatePressure(lblData) ? hpa : "--") + units + (vl.validatePressure(lblData) ? ` (~${mm}${i18n.t('units.mm')})` : '');
        }; break;
        case 'l': { // Ambient light
            units = i18n.t('units.lux');
            label = (vl.validateLight(lblData) ? round() : "--") + units;
        }; break;

        case 'v': { // Voltage
            units = i18n.t('units.v');
            label = (vl.validateAnalogVoltage(lblData) ? round() : "--") + units;
        }; break;

        case 'co2': { // CO2
            units = 'ppm';
            label = (vl.validateCO2(lblData) ? round() : "--") + units;
        }; break;

        case 'hv': { // High voltage
            units = i18n.t('units.v');
            label = (vl.validateHighVoltage(lblData) ? round() : "--") + units;
        }; break;

        case 'cr': { // Current
            units = i18n.t('units.a');
            label = (vl.validateCurrent(lblData) ? round() : "--") + units;
        }; break;

        case 'pw': { // Power
            units = i18n.t('units.w');
            label = (vl.validatePower(lblData) ? round() : "--") + units;
        }; break;

        case 'eg': { // Energy
            units = i18n.t('units.wh');
            label = (vl.validateEnergy(lblData) ? round() : "--") + units;
        }; break;

        case 'fr': { // Frequency
            units = i18n.t('units.hz');
            label = (vl.validateFrequency(lblData) ? round() : "--") + units;
        }; break;
    }

    return <RangeInput value={val}
            label={<div className="mt-8">
                {lblType}:
                <span className="ms-1 text-blue-700 dark:text-blue-400">
                    {label}{lblName ? (', ' + lblName) : ''}
                </span>
            </div>} 
            min={min}
            max={max}
            limitMin={min}
            limitMax={max}
            step={step}
            indication={(val > 0 ? ("+" + val.toFixed(countSymbolsAfterComma())) : val.toFixed(countSymbolsAfterComma())) + units}
            onChange={onChange}
        />
}

export default sensorCorrection;