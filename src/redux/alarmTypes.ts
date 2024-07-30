export interface iAlarms {
    alarm: {
        alarmState: string,
        alarm: {
            time: number[][],
            weekdays: number[][],
            states: number[],
            melodies: number[]
        }
    }
}