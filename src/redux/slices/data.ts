import { createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
    name: 'data',
    initialState: {
        dataState: 'default',
        updateData: false,
        dataFetching: false,

        state: "",
        fw: "",
        esp32: {
            temp: 0
        },
        runtime: "",
        time: 0,
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
                data: [[404, 404], [404, 404], [404, 404], [404, 404], [404, 404]],
                name: [['', ''], ['', ''], ['', ''], ['', ''], ['', '']]
            },
            hum: {
                data: [404, 404],
                name: ['', '']
            },
            pres: {
                data: [4040, 4040],
                name: ['', '']
            },
            light: {
                data: [-1, -1],
                name: ['', '']
            },
            co2: {
                data: [-1, -1],
                name: ['', '']
            },
            voltage: {
                data: [-1, -1],
                name: ['', '']
            },
            current: {
                data: [-1, -1],
                name: ['', '']
            },
            power: {
                data: [-1, -1],
                name: ['', '']
            },
            energy: {
                data: [-1, -1],
                name: ['', '']
            },
            freq: {
                data: [-1, -1],
                name: ['', '']
            },
            bat: [-1, -1]
        },
        weather: {
            temp: 4040,
            hum: 4040,
            pres: 4040,
            wind: {
                speed: -1,
                dir: -1
            },
            descript: "",
            icon: -1,
            isDay: 0,
            time: -1,
            daily: {
                tMax: [404, 404, 404, 404],
                tMin: [404, 404, 404, 404],
                wind: [-1, -1, -1, -1],
                icon: [-1, -1, -1, -1]
            }
        },
        thing: {
            time: 0,
            data: [-40400, -40400, -40400, -40400, -40400, -40400, -40400, -40400]
        },
        fs: { 
            total: -1,
            free: -1,
            list: ""
        }
    },
    reducers: {
        dataStateChange: (state, action) => { state.dataState = action.payload },
        setDataState: (state, action) => { Object.assign(state, action.payload) },
        updateDataChange: (state, action) => { state.updateData = action.payload },
        dataFetchingChange: (state, action) => { state.dataFetching = action.payload }
    }
});

export const { 
    dataStateChange,
    setDataState,
    updateDataChange,
    dataFetchingChange,
} = dataSlice.actions;
  
export default dataSlice.reducer;