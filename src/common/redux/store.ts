import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/auth';
import control from './slices/control';
import stats from './slices/stats';
import typing from './slices/typing';

export const store = configureStore({
    reducer: {
        control,
        typing,
        stats,
        auth
    },
});

// Đảm bảo kiểu RootState trả về đúng
export type RootState = ReturnType<typeof store.getState>;
// Đảm bảo kiểu AppDispatch trả về đúng
export type AppDispatch = typeof store.dispatch;

