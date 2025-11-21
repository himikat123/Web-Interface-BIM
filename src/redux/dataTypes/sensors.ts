export interface iSensorAdata {
    volt: number
}

export interface iSensorLdata {
    light: number
}

export interface iSensorTdata {
    temp: number
}

export interface iSensorTPdata extends iSensorTdata {
    pres: number
}

export interface iSensorTHdata extends iSensorTdata {
    hum: number
}

export interface iSensorTHPdata extends iSensorTHdata {
    pres: number
}

export interface iSensorTHPIdata extends iSensorTHPdata {
    iaq: number,
    iaqAccr: number
}