import { configureStore } from '@reduxjs/toolkit';
import configReducer from './slices/config';

export default configureStore({
    reducer: {
        config: configReducer,
    }
});