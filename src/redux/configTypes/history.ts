export default interface iHistory {
    period: number,
    channelID: string,
    wrkey: string,
    rdkey: string,
    fields: number[],
    wSensors: number[],
    wTypes: number[],
    tFields: number[]
}