import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './slices/language';

export default configureStore({
    reducer: {
        language: languageReducer
    }
});