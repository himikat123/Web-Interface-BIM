import { createSlice } from '@reduxjs/toolkit';

export const validSlice = createSlice({
    name: 'valid',
    initialState: {
        connect: true,
        accesspoint: true,
        wsensors: true,
        display1: true,
        
        account: true
    },
    reducers: {
        connectValidChange: (state, action) => { state.connect = action.payload },
        accesspointValidChange: (state, action) => { state.accesspoint = action.payload },
        wsensorsValidChange: (state, action) => { state.wsensors = action.payload },
        display1ValidChange: (state, action) => { state.display1 = action.payload },
        accountValidChange: (state, action) => { state.account = action.payload },
    }
});

export const { 
    connectValidChange,
    accesspointValidChange,
    wsensorsValidChange,
    display1ValidChange,
    accountValidChange
} = validSlice.actions;
  
export default validSlice.reducer;