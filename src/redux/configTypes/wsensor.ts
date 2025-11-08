export interface iSensorWsensConfig {
    temp: number[][],
    hum: number[],
    pres: number[],
    wind: {
        speed: number[],
        dir: number[]
    },
    light: number[],
    co2: number[],
    volt: number[],
    curr: number[],
    pow: number[],
    enrg: number[],
    freq: number[],
    bat: {
        k: number[],
        type: number[]
    },
    expire: number[],
    channel: number
}