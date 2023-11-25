import { createSlice } from '@reduxjs/toolkit';

export const configSlice = createSlice({
    name: 'config',
    initialState: {
        state: 'default',
        lang: "en"
    },
    reducers: {
        stateChange: (state, action) => {
            state.state = action.payload;
        },
        languageSwitch: (state, action) => {
            state.lang = action.payload;
        },
        setState: (state, action) => {
            Object.assign(state, action.payload);
        }
    }
});

export const { stateChange, languageSwitch, setState } = configSlice.actions;
  
export default configSlice.reducer;