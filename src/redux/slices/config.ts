import { createSlice } from '@reduxjs/toolkit';

export const configSlice = createSlice({
    name: 'config',
    initialState: {
        configState: 'default',
        comfort: {
            temp: {
                source: 0,
                wsensNum: 0,
                sens: 0,
                thing: 0,
                min: 0,
                max: 0
            },
            hum: {
                source: 0,
                wsensNum: 0,
                thing: 0,
                min: 0,
                max: 0
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
            chnl: 0,
            ip: "",
            mask: ""
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
            ntp: "",
            utc: 0,
            dlst: 0,
            ntp_period: 0
        },
        display: {
            type: [0, 0],
            sled: [0, 0],
            dayTime: ["", ""],
            nightTime: ["", ""],
            brightMethod: [0, 0],
            autoOff: [0, 0],
            nightOff: {
                need: [0, 0],
                from: [0, 0],
                to: [0, 0]
            },
            brightness: {
                day: [0, 0],
                night: [0, 0],
                min: [0, 0],
                max: [0, 0]
            },
            lightSensor: [0, 0],
            sensitivity: [0, 0],
            animation: {
                type: 0,
                speed: 0,
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
                period: [0, 0, 0, 0, 0, 0, 0, 0],
                sensor: [0, 0, 0, 0, 0, 0, 0, 0],
                data: [0, 0, 0, 0, 0, 0, 0, 0],
                thing: [0, 0, 0, 0, 0, 0, 0, 0],
                wsensor: {
                    num: [0, 0, 0, 0, 0, 0, 0, 0],
                    type: [0, 0, 0, 0, 0, 0, 0, 0]
                },
                color: ["", "", "", "", "", "", "", ""]
            }
        },
        sound: {
            vol: 0,
            eq: 0,
            hourly: 0,
            hour: {
                from: 0,
                to: 0
            }
        },
        sensors: {
            bme680: {
                t: 0,
                h: 0,
                p: 0,
                i: 0
            },
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
            co2: {
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
                k: [0, 0],
                type: [0, 0]
            },
            expire: [0, 0],
            channel: 0
        },
        thingspeakSend: {
            turnOn: 0,
            period: 0,
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
            period: 0,
            channelID: "",
            rdkey: "",
            expire: 0
        },
        narodmonSend: {
            turnOn: 0,
            period: 0,
            lat: "",
            lon: "",
            name: "",
            sensors: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            types: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            wsensors: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            wtypes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            thing: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            metrics: ["", "", "", "", "", "", "", "", "", "", "", ""]
        },
        history: {
            period: 0,
            channelID: "",
            wrkey: "",
            rdkey: "",
            fields: [0, 0, 0, 0, 0],
            wSensors: [0, 0, 0, 0, 0],
            wTypes: [0, 0, 0, 0, 0],
            tFields: [0, 0, 0, 0, 0]
        },
        account: {
            name: "",
            required: 0
        }
    },
    reducers: {
        configStateChange: (state, action) => { state.configState = action.payload },
        setConfigState: (state, action) => { Object.assign(state, action.payload) },
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

        netSsidChange: (state, action) => { state.network.ssid[action.payload.num] = action.payload.val },
        netPassChange: (state, action) => { state.network.pass[action.payload.num] = action.payload.val },
        netIpChange: (state, action) => { state.network.ip = action.payload },
        netMaskChange: (state, action) => { state.network.mask = action.payload },
        netGwChange: (state, action) => { state.network.gw = action.payload },
        netDns1Change: (state, action) => { state.network.dns1 = action.payload },
        netDns2Change: (state, action) => { state.network.dns2 = action.payload },
        netTypeSwitch: (state, action) => { state.network.type = action.payload },

        acPointSsidChange: (state, action) => { state.accessPoint.ssid = action.payload },
        acPointPassChange: (state, action) => { state.accessPoint.pass = action.payload },
        // ?Change: (state, action) => { state.accessPoint.chnl: 1, = action.payload },
        // ?Change: (state, action) => { state.accessPoint.ip: "192.168.1.4", = action.payload },
        // ?Change: (state, action) => { state.accessPoint.mask: "255.255.255.0" = action.payload },

        WeatherAppIdChange: (state, action) => { state.weather.appid[action.payload.num] = action.payload.val },
        WeatherCityChange: (state, action) => { state.weather.city = action.payload },
        WeatherCityIdChange: (state, action) => { state.weather.cityid = Math.round(action.payload) },
        WeatherLatChange: (state, action) => { state.weather.lat = Number(action.payload.toFixed(6)) },
        WeatherLonChange: (state, action) => { state.weather.lon = Number(action.payload.toFixed(6)) },
        WeatherProwiderChange: (state, action) => { state.weather.provider = action.payload },
        WeatherCitySearchChange: (state, action) => { state.weather.citysearch = action.payload },
        WeatherParsingServerChange: (state, action) => { state.weather.parsingServer = action.payload },

        languageSwitch: (state, action) => { state.lang = action.payload },

        // ?Change: (state, action) => { state.clock.format: 0, = action.payload },
        // ?Change: (state, action) => { state.clock.ntp: "time.nist.gov", = action.payload },
        // ?Change: (state, action) => { state.clock.utc: 0, = action.payload },
        // ?Change: (state, action) => { state.clock.dlst: 0, = action.payload },
        // ?Change: (state, action) => { state.clock.ntp_period: 15 = action.payload },

        DisplayTypeChange: (state, action) => { state.display.type[action.payload.num] = action.payload.val },
        DisplaySledChange: (state, action) => { state.display.sled[action.payload.num] = action.payload.val },
        DisplayDayTimeChange: (state, action) => { state.display.dayTime[action.payload.num] = action.payload.val },
        DisplayNightTimeChange: (state, action) => { state.display.nightTime[action.payload.num] = action.payload.val },
        DisplayBrightMethodChange: (state, action) => { state.display.brightMethod[action.payload.num] = action.payload.val },
        DisplayAutoOffChange: (state, action) => { state.display.autoOff[action.payload.num] = action.payload.val },
        DisplayNightOffNeedChange: (state, action) => { state.display.nightOff.need[action.payload.num] = action.payload.val },
        DisplayNightOffFromChange: (state, action) => { state.display.nightOff.from[action.payload.num] = action.payload.val },
        DisplayNightOffToChange: (state, action) => { state.display.nightOff.to[action.payload.num] = action.payload.val },
        DisplayBrightDayChange: (state, action) => { state.display.brightness.day[action.payload.num] = action.payload.val },
        DisplayBrightNightChange: (state, action) => { state.display.brightness.night[action.payload.num] = action.payload.val },
        DisplayBrightMinChange: (state, action) => { state.display.brightness.min[action.payload.num] = action.payload.val },
        DisplayBrightMaxChange: (state, action) => { state.display.brightness.max[action.payload.num] = action.payload.val },
        DisplayLightSensorChange: (state, action) => { state.display.lightSensor[action.payload.num] = action.payload.val },
        DisplaySensitivityChange: (state, action) => { state.display.sensitivity[action.payload.num] = action.payload.val },
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
        BME680TempCorrChange: (state, action) => { state.sensors.bme680.t = action.payload },
        BME680HumCorrChange: (state, action) => { state.sensors.bme680.h = action.payload },
        BME680PresCorrChange: (state, action) => { state.sensors.bme680.p = action.payload },
        BME680IaqCorrChange: (state, action) => { state.sensors.bme680.i = action.payload }, 
        BME280TempCorrChange: (state, action) => { state.sensors.bme280.t = action.payload },
        BME280HumCorrChange: (state, action) => { state.sensors.bme280.h = action.payload },
        BME280PresCorrChange: (state, action) => { state.sensors.bme280.p = action.payload },
        BMP180TempCorrChange: (state, action) => { state.sensors.bmp180.t = action.payload },
        BMP180PresCorrChange: (state, action) => { state.sensors.bmp180.p = action.payload },
        SHT21TempCorrChange: (state, action) => { state.sensors.sht21.t = action.payload },
        SHT21HumCorrChange: (state, action) => { state.sensors.sht21.h = action.payload },
        DHT22TempCorrChange: (state, action) => { state.sensors.dht22.t = action.payload },
        DHT22HumCorrChange: (state, action) => { state.sensors.dht22.h = action.payload },
        DS18B20TempCorrChange: (state, action) => { state.sensors.ds18b20.t = action.payload },
        ESP32TempCorrChange: (state, action) => { state.sensors.esp32.t = action.payload },
        MAX44009LightCorrChange: (state, action) => { state.sensors.max44009.l = action.payload },
        BH1750LightCorrChange: (state, action) => { state.sensors.bh1750.l = action.payload },
        AnalogCorrChange: (state, action) => { state.sensors.analog.v = action.payload },

        WSensTempChange: (state, action) => { state.wsensor.temp.corr[action.payload.sens][action.payload.num] = action.payload.val },
        WSensHumChange: (state, action) => { state.wsensor.hum.corr[action.payload.num] = action.payload.val },
        WSensPresChange: (state, action) => { state.wsensor.pres.corr[action.payload.num] = action.payload.val },
        WSensLightChange: (state, action) => { state.wsensor.light.corr[action.payload.num] = action.payload.val },
        WSensCO2Change: (state, action) => { state.wsensor.co2.corr[action.payload.num] = action.payload.val },
        WSensHighVoltChange: (state, action) => { state.wsensor.volt.corr[action.payload.num] = action.payload.val },
        WSensCurrentChange: (state, action) => { state.wsensor.curr.corr[action.payload.num] = action.payload.val },
        WSensPowerChange: (state, action) => { state.wsensor.pow.corr[action.payload.num] = action.payload.val },
        WSensEnergyChange: (state, action) => { state.wsensor.enrg.corr[action.payload.num] = action.payload.val },
        WSensFreqChange: (state, action) => { state.wsensor.freq.corr[action.payload.num] = action.payload.val },
        WSensBatKChange: (state, action) => { state.wsensor.bat.k[action.payload.num] = action.payload.val },
        WSensBatTypeChange: (state, action) => { state.wsensor.bat.type[action.payload.num] = action.payload.val },
        WSensExpireChange: (state, action) => { state.wsensor.expire[action.payload.num] = Math.round(action.payload.val) },
        WSensChannelChange: (state, action) => { state.wsensor.channel = Math.round(action.payload) },

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
    configStateChange, 
    languageSwitch, 
    setConfigState, 
    usernameChange, passwordRequiredSwitch,
    netSsidChange, netPassChange, netTypeSwitch, netIpChange, netMaskChange, netGwChange, netDns1Change, netDns2Change,
    acPointSsidChange, acPointPassChange,
    BME680TempCorrChange, BME680HumCorrChange, BME680PresCorrChange, BME680IaqCorrChange,
    BME280TempCorrChange, BME280HumCorrChange, BME280PresCorrChange, BMP180TempCorrChange, BMP180PresCorrChange,
    SHT21TempCorrChange, SHT21HumCorrChange, DHT22TempCorrChange, DHT22HumCorrChange, DS18B20TempCorrChange,
    ESP32TempCorrChange, MAX44009LightCorrChange, BH1750LightCorrChange, AnalogCorrChange,
    WSensTempChange, WSensHumChange, WSensPresChange, WSensLightChange, WSensCO2Change,
    WSensHighVoltChange, WSensCurrentChange, WSensPowerChange, WSensEnergyChange, WSensFreqChange,
    WSensBatKChange, WSensBatTypeChange, WSensExpireChange, WSensChannelChange,
    WeatherAppIdChange, WeatherCityChange, WeatherCityIdChange, WeatherLatChange, 
    WeatherLonChange, WeatherProwiderChange, WeatherCitySearchChange, WeatherParsingServerChange,
    DisplayTypeChange, DisplayBrightMinChange, DisplayBrightMaxChange, DisplaySledChange,
    DisplayBrightMethodChange, DisplayBrightDayChange, DisplayBrightNightChange, DisplayLightSensorChange, DisplaySensitivityChange,
    DisplayDayTimeChange, DisplayNightTimeChange, DisplayAutoOffChange,
    DisplayNightOffNeedChange, DisplayNightOffFromChange, DisplayNightOffToChange
} = configSlice.actions;
  
export default configSlice.reducer;