import { createSlice } from '@reduxjs/toolkit';

export const hourlySlice = createSlice({
    name: 'hourly',
    initialState: {
        updated: 0,
        date: [],
        icon: [],
        temp: [],
        hum: [],
        pres: [],
        windSpeed: [],
        windDir: [],
        prec: []
    },
    reducers: {
        setHourlyState: (state, action) => { Object.assign(state, action.payload) },
        setHourlyUpdated: (state, action) => { state.updated = action.payload }
    }
});

export const { 
    setHourlyState,
    setHourlyUpdated
} = hourlySlice.actions;
  
export default hourlySlice.reducer;