import { Difficult, TypingMode } from "@/common/types/control__enums";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ControlState } from "../../types/redux_initialstate_types";
import { generateDataTyping, presskeyAction } from "./typing";

// ─── Giá trị mặc định khi khởi động hoặc khi đổi mode ────────────────────────
const initialStateControl: ControlState = {
    keyboard: true,
    mode: TypingMode.word,
    timer: 15,
    totalWords: 15,
    difficult: Difficult.Easy,
    backspace: true,
    typing: false,
};

// ─── Slice ────────────────────────────────────────────────────────────────────
// Các action reducers xử lý thay đổi cài đặt từ người dùng (mode, timer, độ khó...)
const control = createSlice({
    name: "control",
    initialState: initialStateControl,
    reducers: {
        changeMode: (state, action: PayloadAction<TypingMode>) => {
            Object.assign(state, {
                ...initialStateControl,
                keyboard: state.keyboard,
                mode: action.payload,
                backspace: state.backspace
            });
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
        setBackspace: (state) => {
            state.backspace = !state.backspace;
        },
        controlStart: (state, action: PayloadAction<boolean>) => {
            state.typing = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(generateDataTyping.fulfilled, (state) => {
            state.typing = false
        })
        builder.addCase(presskeyAction.fulfilled, (state) => {
            if (state.typing) return;
            state.typing = true;
        })
    }
});

export const { changeMode, changeDifficult, setTime, setTotalWord, toggleKeyboard, controlStart, setBackspace } = control.actions;
export default control.reducer;
