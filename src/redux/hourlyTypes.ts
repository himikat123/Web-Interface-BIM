export interface iHourly {
    hourly: {
        updated: number,
        date: number[],
        icon: number[],
        temp: number[],
        hum: number[],
        pres: number[],
        windSpeed: number[],
        windDir: number[],
        prec: number[]
    }
}