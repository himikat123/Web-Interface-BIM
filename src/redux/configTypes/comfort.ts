export default interface iComfort {
    temp: {
        source: number,
        wsensNum?: number,
        sens?: number,
        thing: number,
        min: number[] | number,
        max: number[] | number,
        sound?: number
    },
    hum: {
        source: number,
        wsensNum?: number,
        thing: number,
        min: number[] | number,
        max: number[] | number,
        sound?: number
    },
    iaq?: {
        source: number,
        sound: number
    },
    co2?: {
        source: number,
        wsensNum: number,
        sound: number
    }
}