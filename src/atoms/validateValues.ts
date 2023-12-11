export const validateTemp = (temp: number): boolean => {
    return (temp >= -55 && temp <= 125); 
}

export const validateHum = (hum: number): boolean => {
    return (hum >= 0 && hum <= 100); 
}

export const validatePres = (pres: number): boolean => {
    return (pres >= 300 && pres <= 1100); 
}

export const validateLight = (light: number): boolean => {
    return (light >= 0 && light <= 188000); 
}

export const validateLowVoltage = (volt: number): boolean => {
    return (volt >= 0 && volt <= 6);
}