import { createSlice } from '@reduxjs/toolkit';

export const historySlice = createSlice({
    name: 'history',
    initialState: {
        updated: 0,
        feeds: [{
            created_at: '',
            field1: '',
            field2: '',
            field3: '',
            field4: '',
            field5: '',
            field6: '',
            field7: '',
            field8: ''
        }]
    },
    reducers: {
        setHistoryState: (state, action) => { Object.assign(state, action.payload) },
        setHistoryUpdated: (state, action) => { state.updated = action.payload }
    }
});

export const { 
    setHistoryState,
    setHistoryUpdated
} = historySlice.actions;
  
export default historySlice.reducer;