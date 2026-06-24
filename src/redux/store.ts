import { configureStore } from '@reduxjs/toolkit';
import alarmReducer from './slices/alarm';
import configReducer from './slices/config';
import dataReducer from './slices/data';
import validReducer from './slices/valid';

export default configureStore({
    reducer: {
        alarm: alarmReducer,
        config: configReducer,
        data: dataReducer,
        valid: validReducer
    }
});