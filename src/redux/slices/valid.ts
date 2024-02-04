import { createSlice } from '@reduxjs/toolkit';

export const validSlice = createSlice({
    name: 'valid',
    initialState: {
        connect: true,
        accesspoint: true,
        wsensors: true,
        clock: true,
        display1: true,
        display2: true,
        history: true,
        receive: true,
        sendThingspeak: true,
        sendNarodmon: true,
        account: true
    },
    reducers: {
        connectValidChange: (state, action) => { state.connect = action.payload },
        accesspointValidChange: (state, action) => { state.accesspoint = action.payload },
        wsensorsValidChange: (state, action) => { state.wsensors = action.payload },
        clockValidChange: (state, action) => { state.clock = action.payload },
        display1ValidChange: (state, action) => { state.display1 = action.payload },
        display2ValidChange: (state, action) => { state.display2 = action.payload },
        historyValidChange: (state, action) => { state.history = action.payload },
        receiveValidChange: (state, action) => { state.receive = action.payload },
        sendThingspeakValidChange: (state, action) => { state.sendThingspeak = action.payload },
        sendNarodmonValidChange: (state, action) => { state.sendNarodmon = action.payload },
        accountValidChange: (state, action) => { state.account = action.payload },
    }
});

export const { 
    connectValidChange,
    accesspointValidChange,
    wsensorsValidChange,
    clockValidChange,
    display1ValidChange,
    display2ValidChange,
    historyValidChange,
    receiveValidChange,
    sendThingspeakValidChange,
    sendNarodmonValidChange,
    accountValidChange
} = validSlice.actions;
  
export default validSlice.reducer;