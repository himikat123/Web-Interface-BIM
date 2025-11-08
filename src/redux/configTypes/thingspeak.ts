export interface iThingspeakSend {
    period: number,
    channelID: string,
    wrkey: string,
    rdkey: string,
    fields: number[],
    types: number[],
    wsensors?: number[],
    wtypes?: number[]
}

export interface iThingspeakReceive {
    period: number,
    channelID: string,
    rdkey: string,
    expire: number
}