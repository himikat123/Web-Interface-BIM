export default interface iMqttSend {
    period: number,
    broker: string,
    port: number,
    user: string,
    pass: string,
    sensors: number[],
    types: number[],
    wsensors: number[],
    wtypes: number[],
    topics: string[]
}