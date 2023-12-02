import { createSlice } from '@reduxjs/toolkit';

export const validSlice = createSlice({
    name: 'valid',
    initialState: {
        network: {
            connect: true,
            accesspoint: true
        },
        account: true
    },
    reducers: {
        connectValidChange: (state, action) => { state.network.connect = action.payload },
        accesspointValidChange: (state, action) => { state.network.accesspoint = action.payload },
        accountValidChange: (state, action) => { state.account = action.payload },
    }
});

export const { 
    connectValidChange,
    accesspointValidChange,
    accountValidChange
} = validSlice.actions;
  
export default validSlice.reducer;