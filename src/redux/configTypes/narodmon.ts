export interface iNarodmonSend {
    period: number,
    lat: string,
    lon: string,
    name: string,
    sensors: number[],
    types: number[],
    wsensors?: number[],
    wtypes?: number[],
    metrics: string[]
}