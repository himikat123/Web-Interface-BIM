interface iSensorConfigBase {
    t?: number
    h?: number
    p?: number
    i?: number
    v?: number
    l?: number
}

export interface iSensorAconfig extends Required<Pick<iSensorConfigBase, 'v'>> {}
export interface iSensorLconfig extends Required<Pick<iSensorConfigBase, 'l'>> {}
export interface iSensorTconfig extends Required<Pick<iSensorConfigBase, 't'>> {}
export interface iSensorTPconfig extends Required<Pick<iSensorConfigBase, 't' | 'p'>> {}
export interface iSensorTHconfig extends Required<Pick<iSensorConfigBase, 't' | 'h'>> {}
export interface iSensorTHPconfig extends Required<Pick<iSensorConfigBase, 't' | 'h' | 'p'>> {}
export interface iSensorTHPIconfig extends Required<Pick<iSensorConfigBase, 't' | 'h' | 'p' | 'i'>> {}

export interface iSensors {
    bme680?: iSensorTHPIconfig,
    bme280: iSensorTHPconfig,
    bmp180: iSensorTPconfig,
    sht21: iSensorTHconfig,
    dht22: iSensorTHconfig,
    ds18b20: iSensorTconfig,
    esp32?: iSensorTconfig,
    max44009: iSensorLconfig,
    bh1750: iSensorLconfig,
    analog: iSensorAconfig
}