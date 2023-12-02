import { createSlice } from '@reduxjs/toolkit';

export const validSlice = createSlice({
    name: 'valid',
    initialState: {
        network: {
            connect: true,
            accesspoint: true
        }
    },
    reducers: {
        connectValidChange: (state, action) => { state.network.connect = action.payload },
        accesspointValidChange: (state, action) => { state.network.accesspoint = action.payload },
    }
});

export const { 
    connectValidChange,
    accesspointValidChange
} = validSlice.actions;
  
export default validSlice.reducer;