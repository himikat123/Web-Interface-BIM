export const validateTemp = (temp: number): boolean => {
    return (temp >= -55 && temp <= 100); 
}

export const validateHum = (hum: number): boolean => {
    return (hum >= 0 && hum <= 100); 
}

export const validatePres = (pres: number): boolean => {
    return (pres >= 800 && pres <= 1200); 
}

export const validateLight = (light: number): boolean => {
    return (light >= 0 && light <= 120000); 
}

export const validateLowVoltage = (volt: number): boolean => {
    return (volt >= 0 && volt <= 6);
}