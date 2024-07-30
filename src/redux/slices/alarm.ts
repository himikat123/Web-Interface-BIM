import { createSlice } from '@reduxjs/toolkit';

export const alarmSlice = createSlice({
    name: 'alarm',
    initialState: {
        alarmState: 'default',
        alarm: {
            time: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
            weekdays: [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ], 
            states: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            melodies: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    },
    reducers: {
        alarmsStateChange: (state, action) => { state.alarmState = action.payload },
        setAlarmState: (state, action) => { Object.assign(state, action.payload) },

        alarmTimeChange: (state, action) => { state.alarm.time[action.payload.num][action.payload.level] = action.payload.val },
        alarmWeekdayChange: (state, action) => { state.alarm.weekdays[action.payload.num][action.payload.weekday] = action.payload.val },
        alarmStateChange: (state, action) => { state.alarm.states[action.payload.num] = action.payload.val },
        alarmMelodieChange: (state, action) => { state.alarm.melodies[action.payload.num] = action.payload.val }
    }
});

export const { 
    alarmsStateChange, 
    setAlarmState, 
    alarmTimeChange, 
    alarmWeekdayChange, 
    alarmStateChange, 
    alarmMelodieChange
} = alarmSlice.actions;
  
export default alarmSlice.reducer;