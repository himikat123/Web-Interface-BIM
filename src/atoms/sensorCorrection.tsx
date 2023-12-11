import React from "react";
import RangeInput from "./rangeInput";
import i18n from "../i18n/main";
import * as vl from "./validateValues";

const sensorCorrection = (type: string, val: number, lblType: string, lblData: number, onChange: any, lblName?: string) => {
    let units: string = "";
    let label: string = "";
    switch(type) {
        case 't': { // Temperature
            units = "°C";
            label = (vl.validateTemperature(lblData) ? (Math.round((lblData + val) * 10) / 10).toFixed(1) : "--") + units;
        }; break;
        case 'h': { // Humidity
            units = "%";
            label = (vl.validateHumidity(lblData) ? (Math.round((lblData + val) * 10) / 10).toFixed(1) : "--") + units;
        }; break;
        case 'p': { // Pressure
            const hpa = (Math.round((lblData + val) * 10) / 10).toFixed(1);
            const mm = (Math.round((lblData + val) * 7.5) / 10).toFixed(1);
            units = i18n.t('units.hpa');
            label = (vl.validatePressure(lblData) ? hpa : "--") + units + (vl.validatePressure(lblData) ? ` (~${mm}${i18n.t('units.mm')})` : '');
        }; break;
        case 'l': { // Ambient light
            units = i18n.t('units.lux');
            label = (vl.validateLight(lblData) ? (Math.round((lblData + val) * 10) / 10).toFixed(1) : "--") + units;
        }; break;

        case 'v': { // Voltage
            units = i18n.t('units.v');
            label = (vl.validateAnalogVoltage(lblData) ? (Math.round((lblData + val) * 10) / 10).toFixed(1) : "--") + units;
        }; break;
    }

    return <RangeInput value={val}
            label={<>
                {lblType}:
                <span className="ms-1 text-blue-700 dark:text-blue-400">
                    {label}{lblName ? (', ' + lblName) : ''}
                </span>
            </>} 
            min={-10}
            max={10}
            limitMin={-10}
            limitMax={10}
            step={0.1}
            indication={(val > 0 ? ("+" + val.toFixed(1)) : val.toFixed(1)) + units}
            onChange={onChange}
        />
}

export default sensorCorrection;