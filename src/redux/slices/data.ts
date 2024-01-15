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
        bme680: {
            temp: 4040,
            hum: 4040,
            pres: 4040,
            iaq: 4040,
            iaqAccr: 4040
        },
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
        thing: {
            time: 0,
            data: []
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
        setDataState: (state, action) => { Object.assign(state, action.payload) }
    }
});

export const { 
    dataStateChange,
    setDataState
} = dataSlice.actions;
  
export default dataSlice.reducer;