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
        stateChange: (state, action) => { state.state = action.payload },
        setState: (state, action) => { Object.assign(state, action.payload) },
        // ?Change: (state, action) => { state.comfort.temp.source = action.payload },
        // ?Change: (state, action) => { state.comfort.temp.wsensNum = action.payload },
        // ?Change: (state, action) => { state.comfort.temp.sens = action.payload },
        // ?Change: (state, action) => { state.comfort.temp.thing = action.payload },
        // ?Change: (state, action) => { state.comfort.temp.min = action.payload },
        // ?Change: (state, action) => { state.comfort.temp.max = action.payload },
        // 
        // ?Change: (state, action) => { state.comfort.hum.source = action.payload },
        // ?Change: (state, action) => { state.comfort.hum.wsensNum = action.payload },
        // ?Change: (state, action) => { state.comfort.hum.thing = action.payload },
        // ?Change: (state, action) => { state.comfort.hum.min = action.payload },
        // ?Change: (state, action) => { state.comfort.hum.max = action.payload },
        // 
        netSsidChange: (state, action) => { state.network.ssid[action.payload.num] = action.payload.val },
        netPassChange: (state, action) => { state.network.pass[action.payload.num] = action.payload.val },
        // ?Change: (state, action) => { state.network.ip: "", = action.payload },
        // ?Change: (state, action) => { state.network.mask: "", = action.payload },
        // ?Change: (state, action) => { state.network.gw: "", = action.payload },
        // ?Change: (state, action) => { state.network.dns1: "", = action.payload },
        // ?Change: (state, action) => { state.network.dns2: "", = action.payload },
        // ?Change: (state, action) => { state.network.type: 0 = action.payload },
        // 
        // ?Change: (state, action) => { state.accessPoint.ssid: "", = action.payload },
        // ?Change: (state, action) => { state.accessPoint.pass: "", = action.payload },
        // ?Change: (state, action) => { state.accessPoint.chnl: 1, = action.payload },
        // ?Change: (state, action) => { state.accessPoint.ip: "192.168.1.4", = action.payload },
        // ?Change: (state, action) => { state.accessPoint.mask: "255.255.255.0" = action.payload },
        // 
        // ?Change: (state, action) => { state.weather.appid: ["", ""], = action.payload },
        // ?Change: (state, action) => { state.weather.city: "", = action.payload },
        // ?Change: (state, action) => { state.weather.cityid: 0, = action.payload },
        // ?Change: (state, action) => { state.weather.lat: 0, = action.payload },
        // ?Change: (state, action) => { state.weather.lon: 0, = action.payload },
        // ?Change: (state, action) => { state.weather.provider: 0, = action.payload },
        // ?Change: (state, action) => { state.weather.citysearch: 0, = action.payload },
        // ?Change: (state, action) => { state.weather.parsingServer: "" = action.payload },
        //
        languageSwitch: (state, action) => { state.lang = action.payload },
        //
        // ?Change: (state, action) => { state.clock.format: 0, = action.payload },
        // ?Change: (state, action) => { state.clock.ntp: "time.nist.gov", = action.payload },
        // ?Change: (state, action) => { state.clock.utc: 0, = action.payload },
        // ?Change: (state, action) => { state.clock.dlst: 0, = action.payload },
        // ?Change: (state, action) => { state.clock.ntp_period: 15 = action.payload },
        // 
        // ?Change: (state, action) => { state.display.type: [0, 2], = action.payload },
        // ?Change: (state, action) => { state.display.sled: 0, = action.payload },
        // ?Change: (state, action) => { state.display.dayTime: ["07:00", "07:00"], = action.payload },
        // ?Change: (state, action) => { state.display.nightTime: ["21:00", "21:00"], = action.payload },
        // ?Change: (state, action) => { state.display.brightMethod: [3, 3], = action.payload },
        // ?Change: (state, action) => { state.display.autoOff: [0, 0], = action.payload },
        // ?Change: (state, action) => { state.display.nightOff.need: [0, 0], = action.payload },
        // ?Change: (state, action) => { state.display.nightOff.from: [22, 22], = action.payload },
        // ?Change: (state, action) => { state.display.nightOff.to: [7, 7] = action.payload },
        // ?Change: (state, action) => { state.display.brightness.day: [100, 100], = action.payload },
        // ?Change: (state, action) => { state.display.brightness.night: [50, 50], = action.payload },
        // ?Change: (state, action) => { state.display.brightness.min: [1, 1], = action.payload },
        // ?Change: (state, action) => { state.display.brightness.max: [255, 50] = action.payload },
        // ?Change: (state, action) => { state.display.lightSensor: [0, 0], = action.payload },
        // ?Change: (state, action) => { state.display.sensitivity: [50, 50], = action.payload },
        // ?Change: (state, action) => { state.display.animation.type: 0, = action.payload },
        // ?Change: (state, action) => { state.display.animation.speed: 10, = action.payload },
        // ?Change: (state, action) => { state.display.animation.points: 0 = action.payload },
        // ?Change: (state, action) => { state.display.source.tempOut.sens: 0, = action.payload },
        // ?Change: (state, action) => { state.display.source.tempOut.wsensNum: 0, = action.payload },
        // ?Change: (state, action) => { state.display.source.tempOut.temp: 0, = action.payload },
        // ?Change: (state, action) => { state.display.source.tempOut.thing: 0 = action.payload },
        // ?Change: (state, action) => { state.display.source.humOut.sens: 0, = action.payload },
        // ?Change: (state, action) => { state.display.source.humOut.wsensNum: 0, = action.payload },
        // ?Change: (state, action) => { state.display.source.humOut.thing: 0 = action.payload },
        // ?Change: (state, action) => { state.display.source.presOut.sens: 0, = action.payload },
        // ?Change: (state, action) => { state.display.source.presOut.wsensNum: 0, = action.payload },
        // ?Change: (state, action) => { state.display.source.presOut.thing: 0 = action.payload },
        // ?Change: (state, action) => { state.display.source.tempIn.sens: 0, = action.payload },
        // ?Change: (state, action) => { state.display.source.tempIn.wsensNum: 0, = action.payload },
        // ?Change: (state, action) => { state.display.source.tempIn.temp: 0, = action.payload },
        // ?Change: (state, action) => { state.display.source.tempIn.thing: 0 = action.payload },
        // ?Change: (state, action) => { state.display.source.humIn.sens: 0, = action.payload },
        // ?Change: (state, action) => { state.display.source.humIn.wsensNum: 0, = action.payload },
        // ?Change: (state, action) => { state.display.source.humIn.thing: 0 = action.payload },
        // ?Change: (state, action) => { state.display.source.volt.sens: 0, = action.payload },
        // ?Change: (state, action) => { state.display.source.volt.wsensNum: 0, = action.payload },
        // ?Change: (state, action) => { state.display.source.volt.volt: 0, = action.payload },
        // ?Change: (state, action) => { state.display.source.volt.thing: 0 = action.payload },
        // ?Change: (state, action) => { state.display.source.bat.sens: 0, = action.payload },
        // ?Change: (state, action) => { state.display.source.bat.wsensNum: 0, = action.payload },
        // ?Change: (state, action) => { state.display.source.bat.thing: 0 = action.payload },
        // ?Change: (state, action) => { state.display.source.descr: 0, = action.payload },
        // ?Change: (state, action) => { state.display.source.sequence.name: ["", "", "", ""], = action.payload },
        // ?Change: (state, action) => { state.display.source.sequence.temp: [0, 0, 0, 0], = action.payload },
        // ?Change: (state, action) => { state.display.source.sequence.thngtemp: [0, 0, 0, 0], = action.payload },
        // ?Change: (state, action) => { state.display.source.sequence.wsenstemp: [[0, 0], [0, 0], [0, 0], [0, 0]], = action.payload },
        // ?Change: (state, action) => { state.display.source.sequence.hum: [0, 0, 0, 0], = action.payload }, = action.payload },
        // ?Change: (state, action) => { state.display.source.sequence.thnghum: [0, 0, 0, 0], = action.payload },
        // ?Change: (state, action) => { state.display.source.sequence.wsenshum: [0, 0, 0, 0], = action.payload },
        // ?Change: (state, action) => { state.display.source.sequence.dur: 5 = action.payload },
        // ?Change: (state, action) => { state.display.timeSlot.period: [6, 2, 2, 0, 0, 0, 0, 0], = action.payload },
        // ?Change: (state, action) => { state.display.timeSlot.sensor: [0, 9, 9, 0, 0, 0, 0, 0], = action.payload },
        // ?Change: (state, action) => { state.display.timeSlot.data: [0, 0, 1, 0, 0, 0, 0, 0], = action.payload },
        // ?Change: (state, action) => { state.display.timeSlot.thing: [0, 0, 0, 0, 0, 0, 0, 0], = action.payload },
        // ?Change: (state, action) => { state.display.timeSlot.wsensor.num: [0, 0, 0, 0, 0, 0, 0, 0], = action.payload },
        // ?Change: (state, action) => { state.display.timeSlot.wsensor.type: [0, 0, 0, 0, 0, 0, 0, 0] = action.payload },
        // ?Change: (state, action) => { state.display.timeSlot.color: ["#FFFFFF", "#FFFF00", "#00FFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"] = action.payload },
        // 
        // ?Change: (state, action) => { state.sound.vol: 15, = action.payload },
        // ?Change: (state, action) => { state.sound.eq: 0, = action.payload },
        // ?Change: (state, action) => { state.sound.hourly: 0, = action.payload },
        // ?Change: (state, action) => { state.sound.hour.from: 7, = action.payload },
        // ?Change: (state, action) => { state.sound.hour.to: 21 = action.payload },
        // 
        // ?Change: (state, action) => { state.sensors.bme280.t: 0, = action.payload },
        // ?Change: (state, action) => { state.sensors.bme280.h: 0, = action.payload },
        // ?Change: (state, action) => { state.sensors.bme280.p: 0 = action.payload },
        // ?Change: (state, action) => { state.sensors.bmp180.t: 0, = action.payload },
        // ?Change: (state, action) => { state.sensors.bmp180.p: 0 = action.payload },
        // ?Change: (state, action) => { state.sensors.sht21.t: 0, = action.payload },
        // ?Change: (state, action) => { state.sensors.sht21.h: 0 = action.payload },
        // ?Change: (state, action) => { state.sensors.dht22.t: 0, = action.payload },
        // ?Change: (state, action) => { state.sensors.dht22.h: 0 = action.payload },
        // ?Change: (state, action) => { state.sensors.ds18b20.t: 0 = action.payload },
        // ?Change: (state, action) => { state.sensors.esp32.t: 0 = action.payload },
        // ?Change: (state, action) => { state.sensors.max44009.l: 0 = action.payload },
        // ?Change: (state, action) => { state.sensors.bh1750.l: 0 = action.payload },
        // ?Change: (state, action) => { state.sensors.analog.v: 0 = action.payload },
        // 
        // ?Change: (state, action) => { state.wsensor.temp.corr: [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]] = action.payload },
        // ?Change: (state, action) => { state.wsensor.hum.corr: [0, 0] = action.payload },
        // ?Change: (state, action) => { state.wsensor.pres.corr: [0, 0] = action.payload },
        // ?Change: (state, action) => { state.wsensor.light.corr: [0, 0] = action.payload },
        // ?Change: (state, action) => { state.wsensor.volt.corr: [0, 0] = action.payload },
        // ?Change: (state, action) => { state.wsensor.curr.corr: [0, 0] = action.payload },
        // ?Change: (state, action) => { state.wsensor.pow.corr: [0, 0] = action.payload },
        // ?Change: (state, action) => { state.wsensor.enrg.corr: [0, 0] = action.payload },
        // ?Change: (state, action) => { state.wsensor.freq.corr: [0, 0] = action.payload },
        // ?Change: (state, action) => { state.wsensor.bat.k: [125, 125], = action.payload },
        // ?Change: (state, action) => { state.wsensor.bat.type: [0, 0] = action.payload },
        // ?Change: (state, action) => { state.wsensor.expire: [10, 10], = action.payload },
        // ?Change: (state, action) => { state.wsensor.channel: 1 = action.payload },
        // 
        // ?Change: (state, action) => { state.thingspeakSend.turnOn: 0, = action.payload },
        // ?Change: (state, action) => { state.thingspeakSend.period: 5, = action.payload },
        // ?Change: (state, action) => { state.thingspeakSend.channelID: "", = action.payload },
        // ?Change: (state, action) => { state.thingspeakSend.wrkey: "", = action.payload },
        // ?Change: (state, action) => { state.thingspeakSend.rdkey: "", = action.payload },
        // ?Change: (state, action) => { state.thingspeakSend.fields: [0, 0, 0, 0, 0, 0, 0, 0], = action.payload },
        // ?Change: (state, action) => { state.thingspeakSend.types: [0, 0, 0, 0, 0, 0, 0, 0], = action.payload },
        // ?Change: (state, action) => { state.thingspeakSend.wsensors: [0, 0, 0, 0, 0, 0, 0, 0], = action.payload },
        // ?Change: (state, action) => { state.thingspeakSend.wtypes: [0, 0, 0, 0, 0, 0, 0, 0] = action.payload },
        // 
        // ?Change: (state, action) => { state.thingspeakReceive.turnOn: 0, = action.payload },
        // ?Change: (state, action) => { state.thingspeakReceive.period: 5, = action.payload },
        // ?Change: (state, action) => { state.thingspeakReceive.channelID: "", = action.payload },
        // ?Change: (state, action) => { state.thingspeakReceive.rdkey: "", = action.payload },
        // ?Change: (state, action) => { state.thingspeakReceive.expire: 20 = action.payload },
        // 
        // ?Change: (state, action) => { state.narodmonSend.turnOn: 0, = action.payload },
        // ?Change: (state, action) => { state.narodmonSend.period: 5, = action.payload },
        // ?Change: (state, action) => { state.narodmonSend.lat: "", = action.payload },
        // ?Change: (state, action) => { state.narodmonSend.lon: "", = action.payload },
        // ?Change: (state, action) => { state.narodmonSend.name: "", = action.payload },
        // ?Change: (state, action) => { state.narodmonSend.sensors: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], = action.payload },
        // ?Change: (state, action) => { state.narodmonSend.types: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], = action.payload },
        // ?Change: (state, action) => { state.narodmonSend.wsensors: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], = action.payload },
        // ?Change: (state, action) => { state.narodmonSend.wtypes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], = action.payload },
        // ?Change: (state, action) => { state.narodmonSend.thing: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], = action.payload },
        // ?Change: (state, action) => { state.narodmonSend.metrics: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"] = action.payload },
        // 
        // ?Change: (state, action) => { state.history.period: 60, = action.payload },
        // ?Change: (state, action) => { state.history.channelID: "", = action.payload },
        // ?Change: (state, action) => { state.history.wrkey: "", = action.payload },
        // ?Change: (state, action) => { state.history.rdkey: "", = action.payload },
        // ?Change: (state, action) => { state.history.fields: [0, 0, 0, 0, 0], = action.payload },
        // ?Change: (state, action) => { state.history.wSensors: [0, 0, 0, 0, 0], = action.payload },
        // ?Change: (state, action) => { state.history.wTypes: [0, 0, 0, 0, 0], = action.payload },
        // ?Change: (state, action) => { state.history.tFields: [0, 0, 0, 0, 0] = action.payload },
        //
        usernameChange: (state, action) => { state.account.name = action.payload },
        passwordRequiredSwitch: (state, action) => { state.account.required = action.payload }
    }
});

export const { 
    stateChange, 
    languageSwitch, 
    setState, 
    usernameChange, 
    passwordRequiredSwitch,
    netSsidChange,
    netPassChange
} = configSlice.actions;
  
export default configSlice.reducer;