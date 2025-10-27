export interface iSensorAdata {
    volt: number
}

export interface iSensorLdata {
    light: number
}

export interface iSensorTdata {
    temp: number
}

export interface iSensorTPdata {
    temp: number,
    pres: number
}

export interface iSensorTHdata {
    temp: number,
    hum: number
}

export interface iSensorTHPdata {
    temp: number,
    hum:number,
    pres: number
}

export interface iSensorTHPIdata {
    temp: number,
    hum:number,
    pres: number,
    iaq: number,
    iaqAccr: number
}

export interface iSensorWeatherData {
    icon: number,
    isDay: number,
    temp: number,
    hum: number,
    pres: number,
    wind: {
        speed: number,
        dir: number
    },
    descript: string,
    time: number,
    daily: {
        tMax: [number],
        tMin: [number],
        wind: [number],
        icon: [number],
    }
}

export interface iSensorWsensData {
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
    wind: {
        speed: {
            data: number[],
            name: string[]
        },
        dir: {
            data: number[],
            name: string[]
        }
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
}

export interface iData {
    data: {
        dataState: string,
        updateData: boolean,
        dataFetching: boolean,
        logged: string,
        adc?: number,
        fw: string,
        esp32?: iSensorTdata,
        runtime: number,
        time: number,
        cyd?: number,
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
        bme680?: iSensorTHPIdata,
        bme280: iSensorTHPdata,
        bmp180: iSensorTPdata,
        sht21: iSensorTHdata,
        dht22: iSensorTHdata,
        ds18b20: iSensorTdata,
        max44009: iSensorLdata,
        bh1750: iSensorLdata,
        analog: iSensorAdata,
        wsensor?: iSensorWsensData,
        weather: iSensorWeatherData,
        thing: {
            time: number,
            data: number[]
        },
        fs: { 
            total: number,
            free: number,
            list: string
        }
    }
}