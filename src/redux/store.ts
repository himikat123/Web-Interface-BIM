import { configureStore } from '@reduxjs/toolkit';
import configReducer from './slices/config';
import validReducer from './slices/valid';

export default configureStore({
    reducer: {
        config: configReducer,
        valid: validReducer
    }
});