interface iSens {
    data: number[],
    name: string[]
}

export interface iSensorWsensData {
    time: [number, number],
    temp: {
        data: number[][],
        name: string[][]
    },
    hum: iSens,
    pres: iSens,
    wind: {
        speed: iSens,
        dir: iSens
    },
    light: iSens,
    co2: iSens,
    voltage: iSens,
    current: iSens,
    power: iSens,
    energy: iSens,
    freq: iSens,
    bat: number[]
}