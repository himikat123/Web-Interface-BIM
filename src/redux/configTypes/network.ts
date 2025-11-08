export interface iNetwork {
    ssid: string[],
    pass: string[],
    ip: string,
    mask: string,
    gw: string,
    dns1: string,
    dns2: string,
    type: number
}

export interface iAccessPoint {
    ssid: string,
    pass: string,
    chnl: number,
    ip: string,
    mask: string
}