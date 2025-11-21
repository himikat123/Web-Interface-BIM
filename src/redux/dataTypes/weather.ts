export interface iSensorWeatherData {
    icon: number,
    isDay: number,
    temp: number,
    hum: number,
    pres: number,
    wind: {
        speed: number,
        dir: number
    },
    descript: string,
    time: number,
    daily: {
        tMax: [number],
        tMin: [number],
        wind: [number],
        icon: [number],
    }
}