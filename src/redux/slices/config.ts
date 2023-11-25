import { createSlice } from '@reduxjs/toolkit';

export const configSlice = createSlice({
    name: 'config',
    initialState: {
        state: 'default',
        comfort: {
            temp: {
                source: 0,
                wsensNum: 0,
                sens: 0,
                thing: 0,
                min: 21,
                max: 25
            },
            hum: {
                source: 0,
                wsensNum: 0,
                thing: 0,
                min: 30,
                max: 60
            }
        },
        network: {
            ssid: ["", "", ""],
            pass: ["", "", ""],
            ip: "",
            mask: "",
            gw: "",
            dns1: "",
            dns2: "",
            type: 0
        },
        accessPoint:{
            ssid: "",
            pass: "",
            chnl: 1,
            ip: "192.168.1.4",
            mask: "255.255.255.0"
        },
        weather: {
            appid: ["", ""],
            city: "",
            cityid: 0,
            lat: 0,
            lon: 0,
            provider: 0,
            citysearch: 0,
            parsingServer: ""
        },
        lang: "en",
        clock: {
            format: 0,
            ntp: "time.nist.gov",
            utc: 0,
            dlst: 0,
            ntp_period: 15
        },
        display: {
            type: [0, 2],
            sled: 0,
            dayTime: ["07:00", "07:00"],
            nightTime: ["21:00", "21:00"],
            brightMethod: [3, 3],
            autoOff: [0, 0],
            nightOff: {
                need: [0, 0],
                from: [22, 22],
                to: [7, 7]
            },
            brightness: {
                day: [100, 100],
                night: [50, 50],
                min: [1, 1],
                max: [255, 50]
            },
            lightSensor: [0, 0],
            sensitivity: [50, 50],
            animation: {
                type: 0,
                speed: 10,
                points: 0
            },
            source: {
                tempOut: {
                    sens: 0,
                    wsensNum: 0,
                    temp: 0,
                    thing: 0
                },
                humOut: {
                    sens: 0,
                    wsensNum: 0,
                    thing: 0
                },
                presOut: {
                    sens: 0,
                    wsensNum: 0,
                    thing: 0
                },
                tempIn: {
                    sens: 0,
                    wsensNum: 0,
                    temp: 0,
                    thing: 0
                },
                humIn: {
                    sens: 0,
                    wsensNum: 0,
                    thing: 0
                },
                volt: {
                    sens: 0,
                    wsensNum: 0,
                    volt: 0,
                    thing: 0
                },
                bat: {
                    sens: 0,
                    wsensNum: 0,
                    thing: 0
                },
                descr: 0,
                sequence: {
                    name: ["", "", "", ""],
                    temp: [0, 0, 0, 0],
                    thngtemp: [0, 0, 0, 0],
                    wsenstemp: [[0, 0], [0, 0], [0, 0], [0, 0]],
                    hum: [0, 0, 0, 0],
                    thnghum: [0, 0, 0, 0],
                    wsenshum: [0, 0, 0, 0],
                    dur: 5
                }
            },
            timeSlot: {
                period: [6, 2, 2, 0, 0, 0, 0, 0],
                sensor: [0, 9, 9, 0, 0, 0, 0, 0],
                data: [0, 0, 1, 0, 0, 0, 0, 0],
                thing: [0, 0, 0, 0, 0, 0, 0, 0],
                wsensor: {
                    num: [0, 0, 0, 0, 0, 0, 0, 0],
                    type: [0, 0, 0, 0, 0, 0, 0, 0]
                },
                color: ["#FFFFFF", "#FFFF00", "#00FFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]
            }
        },
        sound: {
            vol: 15,
            eq: 0,
            hourly: 0,
            hour: {
                from: 7,
                to: 21
            }
        },
        sensors: {
            bme280: {
                t: 0,
                h: 0,
                p: 0
            },
            bmp180: {
                t: 0,
                p: 0
            },
            sht21: {
                t: 0,
                h: 0
            },
            dht22: {
                t: 0,
                h: 0
            },
            ds18b20: {
                t: 0
            },
            esp32: {
                t: 0
            },
            max44009: {
                l: 0
            },
            bh1750: {
                l: 0
            },
            analog: {
                v: 0
            }
        },
        wsensor: {
            temp: {
                corr: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]
            },
            hum: {
                corr: [0, 0]
            },
            pres: {
                corr: [0, 0]
            },
            light: {
                corr: [0, 0]
            },
            volt: {
                corr: [0, 0]
            },
            curr: {
                corr: [0, 0]
            },
            pow: {
                corr: [0, 0]
            },
            enrg: {
                corr: [0, 0]
            },
            freq: {
                corr: [0, 0]
            },
            bat: {
                k: [125, 125],
                type: [0, 0]
            },
            expire: [10, 10],
            channel: 1
        },
        thingspeakSend: {
            turnOn: 0,
            period: 5,
            channelID: "",
            wrkey: "",
            rdkey: "",
            fields: [0, 0, 0, 0, 0, 0, 0, 0],
            types: [0, 0, 0, 0, 0, 0, 0, 0],
            wsensors: [0, 0, 0, 0, 0, 0, 0, 0],
            wtypes: [0, 0, 0, 0, 0, 0, 0, 0]
        },
        thingspeakReceive: {
            turnOn: 0,
            period: 5,
            channelID: "",
            rdkey: "",
            expire: 20
        },
        narodmonSend: {
            turnOn: 0,
            period: 5,
            lat: "",
            lon: "",
            name: "",
            sensors: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            types: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            wsensors: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            wtypes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            thing: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            metrics: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]
        },
        history: {
            period: 60,
            channelID: "",
            wrkey: "",
            rdkey: "",
            fields: [0, 0, 0, 0, 0],
            wSensors: [0, 0, 0, 0, 0],
            wTypes: [0, 0, 0, 0, 0],
            tFields: [0, 0, 0, 0, 0]
        },
        account: {
            name: "admin",
            required: 0
        }
    },
    reducers: {
        stateChange: (state, action) => {
            state.state = action.payload;
        },
        setState: (state, action) => {
            Object.assign(state, action.payload);
        },
        languageSwitch: (state, action) => {
            state.lang = action.payload;
        },
        usernameChange: (state, action) => {
            state.account.name = action.payload;
        },
        passwordRequiredSwitch: (state, action) => {
            state.account.required = action.payload;
        }
    }
});

export const { stateChange, languageSwitch, setState } = configSlice.actions;
  
export default configSlice.reducer;