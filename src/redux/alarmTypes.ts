export interface iAlrms {
    alarmState: string,
    alarm: {
        time: number[][],
        weekdays: number[][],
        states: number[],
        melodies: number[]
    }
}

export interface iAlarms {
    alarm: iAlrms
}