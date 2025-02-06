import { Difficult, TypingMode } from "@/common/types/enums";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ControlState } from "../types";

const initialStateControl: ControlState = {
    keyboard: false,
    mode: TypingMode.word,
    timer: 30,
    totalWords: 30,
    difficult: Difficult.Easy
};

// Thunk

const control = createSlice({
    name: "control",
    initialState: initialStateControl,
    reducers: {
        changeMode: (state, action: PayloadAction<TypingMode>) => {
            Object.assign(state, { ...initialStateControl, keyboard: state.keyboard, mode: action.payload });
        },
        changeDifficult: (state, action: PayloadAction<Difficult>) => {
            state.difficult = action.payload
        },
        toggleKeyboard: (state) => {
            state.keyboard = !state.keyboard
        },
        setTime: (state, action: PayloadAction<number>) => {
            state.timer = action.payload
        },
        setTotalWord: (state, action: PayloadAction<number>) => {
            state.totalWords = action.payload
        },
    }
});

export const { changeMode, changeDifficult, setTime, setTotalWord, toggleKeyboard } = control.actions;
export default control.reducer;
