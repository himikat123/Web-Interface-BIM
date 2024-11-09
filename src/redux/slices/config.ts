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
                min: [0, 0],
                max: [0, 0],
                sound: 0
            },
            hum: {
                source: 0,
                wsensNum: 0,
                thing: 0,
                min: [0, 0],
                max: [0, 0],
                sound: 0
            },
            iaq: {
                source: 0,
                sound: 0
            },
            co2: {
                source: 0,
                wsensNum: 0,
                sound: 0
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
            model: [0, 0],
            order: [[1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 3, 4, 5, 6, 7, 8]],
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
                type: [0, 0],
                speed: [0, 0],
                points: [0, 0]
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
                    thing: 0,
                    thingType: 0
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
                period: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                sensor: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                data: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                thing: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                wsensor: {
                    num: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                    type: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
                },
                color: [["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""]]
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
            period: 0,
            channelID: "",
            rdkey: "",
            expire: 0
        },
        narodmonSend: {
            period: 0,
            lat: "",
            lon: "",
            name: "",
            sensors: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            types: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            wsensors: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            wtypes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            metrics: ["", "", "", "", "", "", "", "", "", "", "", ""]
        },
        mqttSend: {
            period: 0,
            broker: "",
            port: 1883,
            user: "",
            pass: "",
            sensors: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            types: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            wsensors: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            wtypes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            topics: ["", "", "", "", "", "", "", "", "", "", "", ""]
        },
        history: {
            period: 0,
            channelID: "",
            wrkey: "",
            rdkey: "",
            fields: [0, 0, 0, 0, 0, 0, 0],
            wSensors: [0, 0, 0, 0, 0, 0, 0],
            wTypes: [0, 0, 0, 0, 0, 0, 0],
            tFields: [0, 0, 0, 0, 0, 0, 0]
        },
        account: {
            name: "",
            required: 0
        }
    },
    reducers: {
        configStateChange: (state, action) => { state.configState = action.payload },
        setConfigState: (state, action) => { Object.assign(state, action.payload) },

        comfortTempSourceChange: (state, action) => { state.comfort.temp.source = action.payload },
        comfortTempWsensNumChange: (state, action) => { state.comfort.temp.wsensNum = action.payload },
        comfortTempSensChange: (state, action) => { state.comfort.temp.sens = action.payload },
        comfortTempThingChange: (state, action) => { state.comfort.temp.thing = action.payload },
        comfortTempMinChange: (state, action) => { state.comfort.temp.min[action.payload.num] = action.payload.val },
        comfortTempMaxChange: (state, action) => { state.comfort.temp.max[action.payload.num] = action.payload.val },
        comfortTempSoundChange: (state, action) => { state.comfort.temp.sound = action.payload },
        comfortHumSourceChange: (state, action) => { state.comfort.hum.source = action.payload },
        comfortHumWsensNumChange: (state, action) => { state.comfort.hum.wsensNum = action.payload },
        comfortHumThingChange: (state, action) => { state.comfort.hum.thing = action.payload },
        comfortHumMinChange: (state, action) => { state.comfort.hum.min[action.payload.num] = action.payload.val },
        comfortHumMaxChange: (state, action) => { state.comfort.hum.max[action.payload.num] = action.payload.val },
        comfortHumSoundChange: (state, action) => { state.comfort.hum.sound = action.payload },
        comfortIaqSourceChange: (state, action) => { state.comfort.iaq.source = action.payload },
        comfortIaqSoundChange: (state, action) => { state.comfort.iaq.sound = action.payload },
        comfortCo2SourceChange: (state, action) => { state.comfort.co2.source = action.payload },
        comfortCo2WsensNumChange: (state, action) => { state.comfort.co2.wsensNum = action.payload },
        comfortCo2SoundChange: (state, action) => { state.comfort.co2.sound = action.payload },

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

        weatherAppIdChange: (state, action) => { state.weather.appid[action.payload.num] = action.payload.val },
        weatherCityChange: (state, action) => { state.weather.city = action.payload },
        weatherCityIdChange: (state, action) => { state.weather.cityid = Math.round(action.payload) },
        weatherLatChange: (state, action) => { state.weather.lat = Number(action.payload.toFixed(6)) },
        weatherLonChange: (state, action) => { state.weather.lon = Number(action.payload.toFixed(6)) },
        weatherProwiderChange: (state, action) => { state.weather.provider = action.payload },
        weatherCitySearchChange: (state, action) => { state.weather.citysearch = action.payload },
        weatherParsingServerChange: (state, action) => { state.weather.parsingServer = action.payload },

        languageSwitch: (state, action) => { state.lang = action.payload },

        clockFormatChange: (state, action) => { state.clock.format = action.payload },
        clockNtpChange: (state, action) => { state.clock.ntp = action.payload },
        clockUtcChange: (state, action) => { state.clock.utc = action.payload },
        clockDlstChange: (state, action) => { state.clock.dlst = action.payload },
        clockNtpPeriodChange: (state, action) => { state.clock.ntp_period = action.payload },

        displayTypeChange: (state, action) => { state.display.type[action.payload.num] = action.payload.val },
        displayModelChange: (state, action) => { state.display.model[action.payload.num] = action.payload.val },
        displayOrderChange: (state, action) => { state.display.order[action.payload.num][action.payload.dig] = action.payload.val },
        displayDayTimeChange: (state, action) => { state.display.dayTime[action.payload.num] = action.payload.val },
        displayNightTimeChange: (state, action) => { state.display.nightTime[action.payload.num] = action.payload.val },
        displayBrightMethodChange: (state, action) => { state.display.brightMethod[action.payload.num] = action.payload.val },
        displayAutoOffChange: (state, action) => { state.display.autoOff[action.payload.num] = action.payload.val },
        displayNightOffNeedChange: (state, action) => { state.display.nightOff.need[action.payload.num] = action.payload.val },
        displayNightOffFromChange: (state, action) => { state.display.nightOff.from[action.payload.num] = action.payload.val },
        displayNightOffToChange: (state, action) => { state.display.nightOff.to[action.payload.num] = action.payload.val },
        displayBrightDayChange: (state, action) => { state.display.brightness.day[action.payload.num] = action.payload.val },
        displayBrightNightChange: (state, action) => { state.display.brightness.night[action.payload.num] = action.payload.val },
        displayBrightMinChange: (state, action) => { state.display.brightness.min[action.payload.num] = action.payload.val },
        displayBrightMaxChange: (state, action) => { state.display.brightness.max[action.payload.num] = action.payload.val },
        displayLightSensorChange: (state, action) => { state.display.lightSensor[action.payload.num] = action.payload.val },
        displaySensitivityChange: (state, action) => { state.display.sensitivity[action.payload.num] = action.payload.val },
        displayAnimationTypeChange: (state, action) => { state.display.animation.type[action.payload.num] = action.payload.val },
        displayAnimationSpeedChange: (state, action) => { state.display.animation.speed[action.payload.num] = action.payload.val },
        displayAnimationPointsChange: (state, action) => { state.display.animation.points[action.payload.num] = action.payload.val },
        displaySourceTempOutSensChange: (state, action) => { state.display.source.tempOut.sens = action.payload },
        displaySourceTempOutWsensNumChange: (state, action) => { state.display.source.tempOut.wsensNum = action.payload },
        displaySourceTempOutTempChange: (state, action) => { state.display.source.tempOut.temp = action.payload },
        displaySourceTempOutThingChange: (state, action) => { state.display.source.tempOut.thing = action.payload },
        displaySourceHumOutSensChange: (state, action) => { state.display.source.humOut.sens = action.payload },
        displaySourceHumOutWsensNumChange: (state, action) => { state.display.source.humOut.wsensNum = action.payload },
        displaySourceHumOutThingChange: (state, action) => { state.display.source.humOut.thing = action.payload },
        displaySourcePresOutSensChange: (state, action) => { state.display.source.presOut.sens = action.payload },
        displaySourcePresOutWsensNumChange: (state, action) => { state.display.source.presOut.wsensNum = action.payload },
        displaySourcePresOutThingChange: (state, action) => { state.display.source.presOut.thing = action.payload },
        displaySourceTempInSensChange: (state, action) => { state.display.source.tempIn.sens = action.payload },
        displaySourceTempInWsensNumChange: (state, action) => { state.display.source.tempIn.wsensNum = action.payload },
        displaySourceTempInTempChange: (state, action) => { state.display.source.tempIn.temp = action.payload },
        displaySourceTempInThingChange: (state, action) => { state.display.source.tempIn.thing = action.payload },
        displaySourceHumInSensChange: (state, action) => { state.display.source.humIn.sens = action.payload },
        displaySourceHumInWsensNumChange: (state, action) => { state.display.source.humIn.wsensNum = action.payload },
        displaySourceHumInThingChange: (state, action) => { state.display.source.humIn.thing = action.payload },
        displaySourceVoltSensChange: (state, action) => { state.display.source.volt.sens = action.payload },
        displaySourceVoltWsensNumChange: (state, action) => { state.display.source.volt.wsensNum = action.payload },
        displaySourceVoltVoltChange: (state, action) => { state.display.source.volt.volt = action.payload },
        displaySourceVoltThingChange: (state, action) => { state.display.source.volt.thing = action.payload },
        displaySourceVoltThingTypeChange: (state, action) => { state.display.source.volt.thingType = action.payload },
        displaySourceBatSensChange: (state, action) => { state.display.source.bat.sens = action.payload },
        displaySourceBatWsensNumChange: (state, action) => { state.display.source.bat.wsensNum = action.payload },
        displaySourceBatThingChange: (state, action) => { state.display.source.bat.thing = action.payload },
        displaySourceDescrChange: (state, action) => { state.display.source.descr = action.payload },
        displaySourceSequenceNameChange: (state, action) => { state.display.source.sequence.name[action.payload.num] = action.payload.val },
        displaySourceSequenceTempChange: (state, action) => { state.display.source.sequence.temp[action.payload.num] = action.payload.val },
        displaySourceSequenceThngTempChange: (state, action) => { state.display.source.sequence.thngtemp[action.payload.num] = action.payload.val },
        displaySourceSequenceWsensTempChange: (state, action) => { state.display.source.sequence.wsenstemp[action.payload.num][action.payload.wsens] = action.payload.val },
        displaySourceSequenceHumChange: (state, action) => { state.display.source.sequence.hum[action.payload.num] = action.payload.val },
        displaySourceSequenceThngHumChange: (state, action) => { state.display.source.sequence.thnghum[action.payload.num] = action.payload.val },
        displaySourceSequenceWsensHumChange: (state, action) => { state.display.source.sequence.wsenshum[action.payload.num] = action.payload.val },
        displaySourceSequenceDurChange: (state, action) => { state.display.source.sequence.dur = action.payload },
        displayTimeslotPeriodChange: (state, action) => { state.display.timeSlot.period[action.payload.slot][action.payload.num] = action.payload.val },
        displayTimeslotSensorChange: (state, action) => { state.display.timeSlot.sensor[action.payload.slot][action.payload.num] = action.payload.val },
        displayTimeslotDataChange: (state, action) => { state.display.timeSlot.data[action.payload.slot][action.payload.num] = action.payload.val },
        displayTimeslotThingChange: (state, action) => { state.display.timeSlot.thing[action.payload.slot][action.payload.num] = action.payload.val },
        displayTimeslotWsensorNumChange: (state, action) => { state.display.timeSlot.wsensor.num[action.payload.slot][action.payload.num] = action.payload.val },
        displayTimeslotWsensorTypeChange: (state, action) => { state.display.timeSlot.wsensor.type[action.payload.slot][action.payload.num] = action.payload.val },
        displayTimeslotColorChange: (state, action) => { state.display.timeSlot.color[action.payload.slot][action.payload.num] = action.payload.val },

        soundVolChange: (state, action) => { state.sound.vol = action.payload },
        soundEqChange: (state, action) => { state.sound.eq = action.payload },
        soundHourlyChange: (state, action) => { state.sound.hourly = action.payload },
        soundHourFromChange: (state, action) => { state.sound.hour.from = action.payload },
        soundHourToChange: (state, action) => { state.sound.hour.to = action.payload },

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
        analogCorrChange: (state, action) => { state.sensors.analog.v = action.payload },

        wSensTempChange: (state, action) => { state.wsensor.temp.corr[action.payload.sens][action.payload.num] = action.payload.val },
        wSensHumChange: (state, action) => { state.wsensor.hum.corr[action.payload.num] = action.payload.val },
        wSensPresChange: (state, action) => { state.wsensor.pres.corr[action.payload.num] = action.payload.val },
        wSensLightChange: (state, action) => { state.wsensor.light.corr[action.payload.num] = action.payload.val },
        wSensCO2Change: (state, action) => { state.wsensor.co2.corr[action.payload.num] = action.payload.val },
        wSensHighVoltChange: (state, action) => { state.wsensor.volt.corr[action.payload.num] = action.payload.val },
        wSensCurrentChange: (state, action) => { state.wsensor.curr.corr[action.payload.num] = action.payload.val },
        wSensPowerChange: (state, action) => { state.wsensor.pow.corr[action.payload.num] = action.payload.val },
        wSensEnergyChange: (state, action) => { state.wsensor.enrg.corr[action.payload.num] = action.payload.val },
        wSensFreqChange: (state, action) => { state.wsensor.freq.corr[action.payload.num] = action.payload.val },
        wSensBatKChange: (state, action) => { state.wsensor.bat.k[action.payload.num] = action.payload.val },
        wSensBatTypeChange: (state, action) => { state.wsensor.bat.type[action.payload.num] = action.payload.val },
        wSensExpireChange: (state, action) => { state.wsensor.expire[action.payload.num] = Math.round(action.payload.val) },
        wSensChannelChange: (state, action) => { state.wsensor.channel = Math.round(action.payload) },

        thingspeakSendPeriodChange: (state, action) => { state.thingspeakSend.period = action.payload },
        thingspeakSendChannelIdChange: (state, action) => { state.thingspeakSend.channelID = action.payload },
        thingspeakSendWrkeyChange: (state, action) => { state.thingspeakSend.wrkey = action.payload },
        thingspeakSendRdkeyChange: (state, action) => { state.thingspeakSend.rdkey = action.payload },
        thingspeakSendFieldsChange: (state, action) => { state.thingspeakSend.fields[action.payload.num] = action.payload.val },
        thingspeakSendTypesChange: (state, action) => { state.thingspeakSend.types[action.payload.num] = action.payload.val },
        thingspeakSendWsensorsChange: (state, action) => { state.thingspeakSend.wsensors[action.payload.num] = action.payload.val },
        thingspeakSendWtypesChange: (state, action) => { state.thingspeakSend.wtypes[action.payload.num] = action.payload.val },

        thingspeakReceivePeriodChange: (state, action) => { state.thingspeakReceive.period = action.payload },
        thingspeakReceiveChannelIdChange: (state, action) => { state.thingspeakReceive.channelID = action.payload },
        thingspeakReceiveRdkeyChange: (state, action) => { state.thingspeakReceive.rdkey = action.payload },
        thingspeakReceiveExpireChange: (state, action) => { state.thingspeakReceive.expire = action.payload },

        narodmonSendPeriodChange: (state, action) => { state.narodmonSend.period = action.payload },
        narodmonSendLatChange: (state, action) => { state.narodmonSend.lat = action.payload },
        narodmonSendLonChange: (state, action) => { state.narodmonSend.lon = action.payload },
        narodmonSendNameChange: (state, action) => { state.narodmonSend.name = action.payload },
        narodmonSendSensorsChange: (state, action) => { state.narodmonSend.sensors[action.payload.num] = action.payload.val },
        narodmonSendTypesChange: (state, action) => { state.narodmonSend.types[action.payload.num] = action.payload.val },
        narodmonSendWsensorsChange: (state, action) => { state.narodmonSend.wsensors[action.payload.num] = action.payload.val },
        narodmonSendWtypesChange: (state, action) => { state.narodmonSend.wtypes[action.payload.num] = action.payload.val },
        narodmonSendMetricsChange: (state, action) => { state.narodmonSend.metrics[action.payload.num] = action.payload.val },

        mqttSendPeriodChange: (state, action) => { state.mqttSend.period = action.payload },
        mqttSendBrokerChange: (state, action) => { state.mqttSend.broker = action.payload },
        mqttSendPortChange: (state, action) => { state.mqttSend.port = action.payload },
        mqttSendUserChange: (state, action) => { state.mqttSend.user = action.payload },
        mqttSendPassChange: (state, action) => { state.mqttSend.pass = action.payload },
        mqttSendSensorsChange: (state, action) => { state.mqttSend.sensors[action.payload.num] = action.payload.val },
        mqttSendTypesChange: (state, action) => { state.mqttSend.types[action.payload.num] = action.payload.val },
        mqttSendWsensorsChange: (state, action) => { state.mqttSend.wsensors[action.payload.num] = action.payload.val },
        mqttSendWtypesChange: (state, action) => { state.mqttSend.wtypes[action.payload.num] = action.payload.val },
        mqttSendTopicsChange: (state, action) => { state.mqttSend.topics[action.payload.num] = action.payload.val },

        historyPriodChange: (state, action) => { state.history.period = action.payload },
        historyChannelIDChange: (state, action) => { state.history.channelID = action.payload },
        historyWrkeyChange: (state, action) => { state.history.wrkey = action.payload },
        historyRdkeyChange: (state, action) => { state.history.rdkey = action.payload },
        historyFieldsChange: (state, action) => { state.history.fields[action.payload.num] = action.payload.val },
        historyWsensorsChange: (state, action) => { state.history.wSensors[action.payload.num] = action.payload.val },
        historyWtypesChange: (state, action) => { state.history.wTypes[action.payload.num] = action.payload.val },
        historyTfieldsChange: (state, action) => { state.history.tFields[action.payload.num] = action.payload.val },

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
    ESP32TempCorrChange, MAX44009LightCorrChange, BH1750LightCorrChange, analogCorrChange,
    wSensTempChange, wSensHumChange, wSensPresChange, wSensLightChange, wSensCO2Change,
    wSensHighVoltChange, wSensCurrentChange, wSensPowerChange, wSensEnergyChange, wSensFreqChange,
    wSensBatKChange, wSensBatTypeChange, wSensExpireChange, wSensChannelChange,
    weatherAppIdChange, weatherCityChange, weatherCityIdChange, weatherLatChange, 
    weatherLonChange, weatherProwiderChange, weatherCitySearchChange, weatherParsingServerChange,
    clockFormatChange, clockNtpChange, clockUtcChange, clockDlstChange, clockNtpPeriodChange,
    displayTypeChange, displayModelChange, displayOrderChange, displayBrightMinChange, displayBrightMaxChange,
    displayBrightMethodChange, displayBrightDayChange, displayBrightNightChange, displayLightSensorChange, 
    displaySensitivityChange, displayDayTimeChange, displayNightTimeChange, displayAutoOffChange,
    displayNightOffNeedChange, displayNightOffFromChange, displayNightOffToChange, displayAnimationTypeChange, 
    displayAnimationSpeedChange, displayAnimationPointsChange, displayTimeslotPeriodChange, 
    displayTimeslotSensorChange, displayTimeslotDataChange, displayTimeslotThingChange, displayTimeslotWsensorNumChange, 
    displayTimeslotWsensorTypeChange, displayTimeslotColorChange, displaySourceTempOutSensChange, 
    displaySourceTempOutWsensNumChange, displaySourceTempOutTempChange, displaySourceTempOutThingChange, 
    displaySourceHumOutSensChange, displaySourceHumOutWsensNumChange, displaySourceHumOutThingChange, 
    displaySourcePresOutSensChange, displaySourcePresOutWsensNumChange, displaySourcePresOutThingChange,
    displaySourceTempInSensChange, displaySourceTempInWsensNumChange, displaySourceTempInTempChange, 
    displaySourceTempInThingChange, displaySourceHumInSensChange, displaySourceHumInWsensNumChange, 
    displaySourceHumInThingChange, displaySourceVoltSensChange, displaySourceVoltWsensNumChange, 
    displaySourceVoltVoltChange, displaySourceVoltThingChange, displaySourceBatSensChange, displaySourceBatWsensNumChange, 
    displaySourceBatThingChange, displaySourceDescrChange, displaySourceSequenceDurChange, displaySourceSequenceTempChange, 
    displaySourceSequenceWsensTempChange, displaySourceSequenceThngTempChange, displaySourceSequenceNameChange, 
    displaySourceSequenceHumChange, displaySourceSequenceThngHumChange, displaySourceSequenceWsensHumChange,
    displaySourceVoltThingTypeChange, 
    soundVolChange, soundEqChange, soundHourlyChange, soundHourFromChange, soundHourToChange,
    comfortTempSourceChange, comfortTempWsensNumChange, comfortTempSensChange, 
    comfortTempThingChange, comfortTempMinChange, comfortTempMaxChange, comfortTempSoundChange,
    comfortHumSourceChange, comfortHumWsensNumChange, comfortHumThingChange,
    comfortHumMinChange, comfortHumMaxChange, comfortHumSoundChange,
    comfortIaqSourceChange, comfortIaqSoundChange, 
    comfortCo2SourceChange, comfortCo2WsensNumChange, comfortCo2SoundChange,
    historyPriodChange, historyChannelIDChange, historyWrkeyChange, historyRdkeyChange,
    historyFieldsChange, historyWsensorsChange, historyWtypesChange, historyTfieldsChange,
    thingspeakReceivePeriodChange, thingspeakReceiveChannelIdChange, thingspeakReceiveRdkeyChange, thingspeakReceiveExpireChange,
    thingspeakSendPeriodChange, thingspeakSendChannelIdChange, thingspeakSendWrkeyChange, thingspeakSendRdkeyChange,
    thingspeakSendFieldsChange, thingspeakSendTypesChange, thingspeakSendWsensorsChange, thingspeakSendWtypesChange,
    narodmonSendPeriodChange, narodmonSendLatChange, narodmonSendLonChange, narodmonSendNameChange, narodmonSendSensorsChange,
    narodmonSendTypesChange, narodmonSendWsensorsChange, narodmonSendWtypesChange, narodmonSendMetricsChange,
    mqttSendPeriodChange, mqttSendBrokerChange, mqttSendPortChange, mqttSendUserChange, mqttSendPassChange,
    mqttSendSensorsChange, mqttSendTypesChange, mqttSendWsensorsChange, mqttSendWtypesChange, mqttSendTopicsChange
} = configSlice.actions;
  
export default configSlice.reducer;