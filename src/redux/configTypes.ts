export interface iConfig {
    config: {
        configState: string,
        comfort: {
            temp: {
                source: number,
                wsensNum?: number,
                sens?: number,
                thing: number,
                min: number[] | number,
                max: number[] | number,
                sound?: number
            },
            hum: {
                source: number,
                wsensNum?: number,
                thing: number,
                min: number[] | number,
                max: number[] | number,
                sound?: number
            },
            iaq?: {
                source: number,
                sound: number
            },
            co2?: {
                source: number,
                wsensNum: number,
                sound: number
            }
        },
        network: {
            ssid: string[],
            pass: string[],
            ip: string,
            mask: string,
            gw: string,
            dns1: string,
            dns2: string,
            type: number
        },
        accessPoint: {
            ssid: string,
            pass: string,
            chnl: number,
            ip: string,
            mask: string
        },
        weather: {
            appid: string[],
            city: string,
            cityid: number,
            lat: number,
            lon: number,
            provider: number,
            citysearch: number,
            corr: {
                t: number,
                h: number,
                p: number
            }
        },
        lang: string,
        clock: {
            format: number,
            ntp: string,
            utc: number,
            dlst: number,
            ntp_period: number
        },
        display: {
            type?: number[],
            model: number[],
            order?: number[][],
            dayTime: string[] | string,
            nightTime: string[] | string,
            brightMethod: number[] | number,
            autoOff?: number[],
            nightOff?: {
                need: number[],
                from: number[],
                to: number[]
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
        },
        sound?: {
            vol: number,
            eq: number,
            hourly: number,
            hour: {
                from: number,
                to: number
            }
        },
        sensors: {
            bme680?: {
                t: number,
                h: number,
                p: number,
                i: number
            },
            bme280: {
                t: number,
                h: number,
                p: number
            },
            bmp180: {
                t: number,
                p: number
            },
            sht21: {
                t: number,
                h: number
            },
            dht22: {
                t: number,
                h: number
            },
            ds18b20: {
                t: number
            },
            esp32?: {
                t: number
            },
            max44009: {
                l: number
            },
            bh1750: {
                l: number
            },
            analog: {
                v: number
            }
        },
        wsensor?: {
            temp: {
                corr: number[][]
            },
            hum: {
                corr: number[]
            },
            pres: {
                corr: number[]
            },
            light: {
                corr: number[]
            },
            co2: {
                corr: number[]
            },
            volt: {
                corr: number[]
            },
            curr: {
                corr: number[]
            },
            pow: {
                corr: number[]
            },
            enrg: {
                corr: number[]
            },
            freq: {
                corr: number[]
            },
            bat: {
                k: number[],
                type: number[]
            },
            expire: number[],
            channel: number
        },
        thingspeakSend: {
            period: number,
            channelID: string,
            wrkey: string,
            rdkey: string,
            fields: number[],
            types: number[],
            wsensors?: number[],
            wtypes?: number[]
        },
        thingspeakReceive: {
            period: number,
            channelID: string,
            rdkey: string,
            expire: number
        },
        narodmonSend: {
            period: number,
            lat: string,
            lon: string,
            name: string,
            sensors: number[],
            types: number[],
            wsensors?: number[],
            wtypes?: number[],
            metrics: string[]
        },
        mqttSend?: {
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
        },
        history?: {
            period: number,
            channelID: string,
            wrkey: string,
            rdkey: string,
            fields: number[],
            wSensors: number[],
            wTypes: number[],
            tFields: number[]
        },
        account: {
            name: string,
            required: number
        }
    }
}