export interface iDisplay {
    type?: number[],
    model: number[],
    cntLeds?: number[],
    sLed?: number[],
    order?: number[][],
    dayTime: string[] | string,
    nightTime: string[] | string,
    brightMethod: number[] | number,
    autoOff?: number[],
    nightOff?: {
        need: number[],
        from: string[],
        to: string[]
    },
    brightness: {
        day: number[] | number,
        night: number[] | number,
        min?: number[],
        max?: number[]
    },
    lightSensor: number[] | number,
    sensitivity: number[] | number,
    animation?: {
        type: number[],
        speed: number[],
        points: number[]
    },
    source: {
        tempOut: {
            sens: number,
            wsensNum?: number,
            temp?: number,
            thing: number
        },
        humOut: {
            sens: number,
            wsensNum?: number,
            thing: number
        },
        presOut: {
            sens: number,
            wsensNum?: number,
            thing: number
        },
        tempIn: {
            sens: number,
            wsensNum?: number,
            temp?: number,
            thing: number
        },
        humIn: {
            sens: number,
            wsensNum?: number,
            thing: number
        },
        volt: {
            sens: number,
            wsensNum?: number,
            volt: number,
            thing: number,
            thingType: number
        },
        bat: {
            sens: number,
            wsensNum?: number,
            thing: number
        },
        descr: number,
        wind?: {
            speed: {
                sens: number,
                wsensNum: number,
                thing: number
            },
            dir: {
                sens: number,
                wsensNum: number,
                thing: number
            }
        },
        sequence?: {
            name: string[],
            temp: number[],
            thngtemp: number[],
            wsenstemp: number[][],
            hum: number[],
            thnghum: number[],
            wsenshum: number[],
            dur: number
        }
    },
    timeSlot?: {
        period: number[][],
        sensor: number[][],
        data: number[][],
        thing: number[][],
        wsensor: {
            num: number[][],
            type: number[][]
        },
        color: string[][]
    }
}