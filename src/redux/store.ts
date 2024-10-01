import { configureStore } from '@reduxjs/toolkit';
import alarmReducer from './slices/alarm';
import configReducer from './slices/config';
import dataReducer from './slices/data';
import validReducer from './slices/valid';
import historyReducer from './slices/history';
import hourlyReducer from './slices/hourly';

export default configureStore({
    reducer: {
        alarm: alarmReducer,
        config: configReducer,
        data: dataReducer,
        valid: validReducer,
        history: historyReducer,
        hourly: hourlyReducer
    }
});