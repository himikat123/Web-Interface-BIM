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
    },
    hourly?: {
        date: [number],
        icon: [number],
        temp: [number],
        pres: [number],
        windSpeed: [number],
        windDir: [number],
        prec: [number],
        hum?: [number]
    }
}