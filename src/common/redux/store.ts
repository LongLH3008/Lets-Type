import { configureStore } from '@reduxjs/toolkit';
import control from './slices/control';
import dataTyping from './slices/dataTyping';

export const store = configureStore({
    reducer: {
        control,
        dataTyping
    },
});

// Đảm bảo kiểu RootState trả về đúng
export type RootState = ReturnType<typeof store.getState>;
// Đảm bảo kiểu AppDispatch trả về đúng
export type AppDispatch = typeof store.dispatch;

