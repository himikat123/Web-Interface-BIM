export interface iData {
    data: {
        dataState: string,
        logged: string,
        fw: string,
        esp32: {
            temp: number
        },
        runtime: string,
        time: string,
        network: {
            ssid: string,
            ch: number,
            sig: string,
            mac: string,
            ip: string,
            mask: string,
            gw: string,
            dns1: string,
            dns2: string
        },    
        ssids: [ [string, number] ],
        bme680: {
            temp: number,
            hum: number,
            pres: number,
            iaq: number,
            iaqAccr: number
        },
        bme280: {
            temp: number,
            hum: number,
            pres: number
        },
        bmp180: {
            temp: number,
            pres: number
        },
        sht21: {
            temp: number,
            hum: number
        },
        dht22: {
            temp: number,
            hum: number
        },
        ds18b20: {
            temp: number
        },
        max44009: {
            light: number
        },
        bh1750: {
            light: number
        },
        analog: {
            volt: number
        },
        wsensor: {
            time: [number, number],
            temp: {
                data: number[][],
                name: string[][]
            },
            hum: {
                data: number[],
                name: string[]
            },
            pres: {
                data: number[],
                name: string[]
            },
            light: {
                data: number[],
                name: string[]
            },
            co2: {
                data: number[],
                name: string[]
            },
            voltage: {
                data: number[],
                name: string[]
            },
            current: {
                data: number[],
                name: string[]
            },
            power: {
                data: number[],
                name: string[]
            },
            energy: {
                data: number[],
                name: string[]
            },
            freq: {
                data: number[],
                name: string[]
            },
            bat: number[]
        },
        weather: {
            temp: number,
            hum: number,
            pres: number,
            wind: {
                speed: number,
                dir: number
            },
            descript: string
        },
        thing?: {
            time?: number,
            data?: number[]
        },
        fs: { 
            total: number,
            free: number,
            list: [
                {
                    name: string,
                    size: string
                }
            ]
        }
    }
}