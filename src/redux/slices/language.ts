import { createSlice } from '@reduxjs/toolkit';

export const languageSlice = createSlice({
    name: 'language',
    initialState: {
        lang: 'en',
    },
    reducers: {
        languageSwitch: (state, action) => {
            state.lang = action.payload;
        }
    }
});

export const { languageSwitch } = languageSlice.actions;
  
export default languageSlice.reducer;