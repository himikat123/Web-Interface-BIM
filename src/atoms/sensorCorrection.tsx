import React from "react";
import RangeInput from "./rangeInput";
import i18n from "../i18n/main";
import Indication from "./indication";
import * as vl from "./validateValues";

export default function sensorCorrection(color: boolean, type: string, val: number, lblType: string | React.ReactNode, lblData: number, onChange: any, min: number, max: number, step: number, hide?: boolean, lblName?: string) {
    const countSymbolsAfterComma = () => ((step.toString().includes('.')) ? (step.toString().split('.').pop()?.length) : (0));

    const round = () => {
        return (Math.round((lblData + val) * (1 / step)) / (1 / step)).toFixed(countSymbolsAfterComma());
    }

    let units: string = "";
    let labels: string[] = ['', ''];
    switch(type) {
        case 't': // Temperature
            units = "°C";
            labels[0] = (vl.validateTemperature(lblData) ? round() : "--");
            break;
        case 'h': // Humidity
            units = "%";
            labels[0] = (vl.validateHumidity(lblData) ? round() : "--");
            break;
        case 'p': // Pressure
            const hpa = round();
            const mm = (Math.round((lblData + val) * 7.5) / 10).toFixed(1);
            units = i18n.t('units.hpa');
            labels[0] = (vl.validatePressure(lblData) ? hpa : "--");
            labels[1] = (vl.validatePressure(lblData) ? ` (~${mm}${i18n.t('units.mm')})` : '');
            break;
        case 'l': // Ambient light
            units = i18n.t('units.lux');
            labels[0] = (vl.validateLight(lblData) ? round() : "--");
            break;

        case 'v': // Voltage
            units = i18n.t('units.v');
            labels[0] = (vl.validateAnalogVoltage(lblData) ? round() : "--");
            break;

        case 'i': // Index for Air Quality
            units = '';
            labels[0] = (vl.validateIaq(lblData) ? round() : "--");
            break;

        case 'co2': // CO2
            units = 'ppm';
            labels[0] = (vl.validateCO2(lblData) ? round() : "--");
            break;

        case 'hv': // High voltage
            units = i18n.t('units.v');
            labels[0] = (vl.validateHighVoltage(lblData) ? round() : "--");
            break;

        case 'cr': // Current
            units = i18n.t('units.a');
            labels[0] = (vl.validateCurrent(lblData) ? round() : "--");
            break;

        case 'pw': // Power
            units = i18n.t('units.w');
            labels[0] = (vl.validatePower(lblData) ? round() : "--");
            break;

        case 'eg': // Energy
            units = i18n.t('units.wh');
            labels[0] = (vl.validateEnergy(lblData) ? round() : "--");
            break;

        case 'fr': // Frequency
            units = i18n.t('units.hz');
            labels[0] = (vl.validateFrequency(lblData) ? round() : "--");
            break;

        default: break;
    }

    return <RangeInput value={val}
        label={<div className="mt-8">
                {lblType}: 
                <Indication error={color} value={labels[0] + units + labels[1] + (lblName ? (', ' + lblName) : '')} />
            </div>} 
        min={min}
        max={max}
        limitMin={min}
        limitMax={max}
        step={step}
        indication={(val > 0 ? ("+" + val.toFixed(countSymbolsAfterComma())) : val.toFixed(countSymbolsAfterComma())) + units}
        onChange={onChange}
        className={hide && labels[0] === '--' ? 'hide' : ''}
    />
}