import { configureStore } from '@reduxjs/toolkit';
import configReducer from './slices/config';
import dataReducer from './slices/data';
import validReducer from './slices/valid';

export default configureStore({
    reducer: {
        config: configReducer,
        data: dataReducer,
        valid: validReducer
    }
});