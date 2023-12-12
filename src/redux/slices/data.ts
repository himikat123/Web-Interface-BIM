import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        dataState: 'default',
        state: "",
        fw: "",
        esp32: {
            temp: 0
        },
        runtime: "",
        time: "",
        network: {
            ssid: "",
            ch: 0,
            sig: "",
            mac: "",
            ip: "",
            mask: "",
            gw: "",
            dns1: "",
            dns2: ""
        },    
        ssids: [],
        bme280: {
            temp: 4040,
            hum: 4040,
            pres: 4040
        },
        bmp180: {
            temp: 4040,
            pres: 4040
        },
        sht21: {
            temp: 4040,
            hum: 4040
        },
        dht22: {
            temp: 4040,
            hum: 4040
        },
        ds18b20: {
            temp: 4040
        },
        max44009: {
            light: -1
        },
        bh1750: {
            light: -1
        },
        analog: {
            volt: -1
        },
        wsensor: {
            time: [],
            temp: {
                data: [],
                name: []
            },
            hum: {
                data: [],
                name: []
            },
            pres: {
                data: [],
                name: []
            },
            light: {
                data: [],
                name: []
            },
            co2: {
                data: [],
                name: []
            },
            voltage: {
                data: [],
                name: []
            },
            current: {
                data: [],
                name: []
            },
            power: {
                data: [],
                name: []
            },
            energy: {
                data: [],
                name: []
            },
            freq: {
                data: [],
                name: []
            },
            bat: []
        },
        weather: {
            temp: 4040,
            hum: 4040,
            pres: 4040,
            wind: {
                speed: -1,
                dir: -1
            },
            descript: ""
        },
        fs: { 
            total: -1,
            free: -1,
            list: [
                {
                    name: "",
                    size: ""
                }
            ]
        }
    },
    reducers: {
        dataStateChange: (state, action) => { state.dataState = action.payload },
        setDataState: (state, action) => { Object.assign(state, action.payload) },
        // ?Change: (state, action) => { state.state: 'default', = action.payload },
        // ?Change: (state, action) => { state.logged: "", = action.payload },
        // ?Change: (state, action) => { state.fw: "", = action.payload },
        // ?Change: (state, action) => { state.esp32.temp: 0 = action.payload },
        // ?Change: (state, action) => { state.runtime: "", = action.payload },
        // ?Change: (state, action) => { state.time: "", = action.payload },
        // ?Change: (state, action) => { state.network.ssid: "", = action.payload },
        // ?Change: (state, action) => { state.network.ch: 0, = action.payload },
        // ?Change: (state, action) => { state.network.sig: "", = action.payload },
        // ?Change: (state, action) => { state.network.mac: "", = action.payload },
        // ?Change: (state, action) => { state.network.ip: "", = action.payload },
        // ?Change: (state, action) => { state.network.mask: "", = action.payload },
        // ?Change: (state, action) => { state.network.gw: "", = action.payload },
        // ?Change: (state, action) => { state.network.dns1: "", = action.payload },
        // ?Change: (state, action) => { state.network.dns2: "" = action.payload },
        // ?Change: (state, action) => { state.ssids: [], = action.payload },
        // ?Change: (state, action) => { state.bme280.temp: 4040, = action.payload },
        // ?Change: (state, action) => { state.bme280.hum: 4040, = action.payload },
        // ?Change: (state, action) => { state.bme280.pres: 4040 = action.payload },
        // ?Change: (state, action) => { state.bmp180.temp: 4040, = action.payload },
        // ?Change: (state, action) => { state.bmp180.pres: 4040 = action.payload },
        // ?Change: (state, action) => { state.sht21.temp: 4040, = action.payload },
        // ?Change: (state, action) => { state.sht21.hum: 4040 = action.payload },
        // ?Change: (state, action) => { state.dht22.temp: 4040, = action.payload },
        // ?Change: (state, action) => { state.dht22.hum: 4040 = action.payload },
        // ?Change: (state, action) => { state.ds18b20.temp: 4040 = action.payload },
        // ?Change: (state, action) => { state.max44009.light: -1 = action.payload },
        // ?Change: (state, action) => { state.bh1750.light: -1 = action.payload },
        // ?Change: (state, action) => { state.analog.volt: -1 = action.payload },
        // ?Change: (state, action) => { state.wsensor.time: [], = action.payload },
        // ?Change: (state, action) => { state.wsensor.temp.data: [], = action.payload },
        // ?Change: (state, action) => { state.wsensor.temp.name: [] = action.payload },
        // ?Change: (state, action) => { state.wsensor.hum.data: [], = action.payload },
        // ?Change: (state, action) => { state.wsensor.hum.name: [] = action.payload },
        // ?Change: (state, action) => { state.wsensor.pres.data: [], = action.payload },
        // ?Change: (state, action) => { state.wsensor.pres.name: [] = action.payload },
        // ?Change: (state, action) => { state.wsensor.light.data: [], = action.payload },
        // ?Change: (state, action) => { state.wsensor.light.name: [] = action.payload },
        // ?Change: (state, action) => { state.wsensor.voltage.data: [], = action.payload },
        // ?Change: (state, action) => { state.wsensor.voltage.name: [] = action.payload },
        // ?Change: (state, action) => { state.wsensor.current.data: [], = action.payload },
        // ?Change: (state, action) => { state.wsensor.current.name: [] = action.payload },
        // ?Change: (state, action) => { state.wsensor.power.data: [], = action.payload },
        // ?Change: (state, action) => { state.wsensor.power.name: [] = action.payload },
        // ?Change: (state, action) => { state.wsensor.energy.data: [], = action.payload },
        // ?Change: (state, action) => { state.wsensor.energy.name: [] = action.payload },
        // ?Change: (state, action) => { state.wsensor.freq.data: [], = action.payload },
        // ?Change: (state, action) => { state.wsensor.freq.name: [] = action.payload },
        // ?Change: (state, action) => { state.wsensor.bat: [] = action.payload },
        // ?Change: (state, action) => { state.weather.temp: 4040, = action.payload },
        // ?Change: (state, action) => { state.weather.hum: 4040, = action.payload },
        // ?Change: (state, action) => { state.weather.pres: 4040, = action.payload },
        // ?Change: (state, action) => { state.weather.wind.speed: -1, = action.payload },
        // ?Change: (state, action) => { state.weather.wind.dir: -1 = action.payload },
        // ?Change: (state, action) => { state.weather.descript: "" = action.payload },
        // ?Change: (state, action) => { state.fs.total: -1, = action.payload },
        // ?Change: (state, action) => { state.fs.free: -1, = action.payload },
        // ?Change: (state, action) => { state.fs.list: [ = action.payload },
        //        {
        //            name: "",
        //            size: ""
        //        }
        //    ]
    }
});

export const { 
    dataStateChange,
    setDataState
} = dataSlice.actions;
  
export default dataSlice.reducer;