export const validateTemperature = (temp: number): boolean => {
    return (temp >= -55 && temp <= 125); 
}

export const validateHumidity = (hum: number): boolean => {
    return (hum >= 0 && hum <= 100); 
}

export const validatePressure = (pres: number): boolean => {
    return (pres >= 300 && pres <= 1100); 
}

export const validateLight = (light: number): boolean => {
    return (light >= 0 && light <= 188000); 
}

export const validateAnalogVoltage = (volt: number): boolean => {
    return (volt >= 0 && volt <= 5);
}

export const validateBatteryVoltage = (volt: number): boolean => {
    return (volt >= 0.6 && volt <= 20); 
}

export const validateBatteryADC = (adc: number): boolean => {
    return (adc >= 0 && adc < 1024); 
}

export const validateHighVoltage = (volt: number): boolean => {
    return (volt >= 80 && volt <= 260); 
}

export const validateCurrent = (curr: number): boolean => {
    return (curr >= 0 && curr <= 100); 
}

export const validatePower = (powr: number): boolean => {
    return (powr >= 0 && powr <= 23000); 
}

export const validateEnergy = (enrg: number): boolean => {
    return (enrg >= 0 && enrg <= 10000); 
}

export const validateFrequency = (freq: number): boolean => {
    return (freq >= 45 && freq <= 65); 
}

export const validateCO2 = (co2: number): boolean => {
    return (co2 >= 400 && co2 <= 2000); 
}