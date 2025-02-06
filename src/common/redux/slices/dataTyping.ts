import { getQuoteFromClient, getWordsFromClient } from "@/apis/data";
import { TypingMode } from "@/common/types/enums";
import { Word } from "@/common/types/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DataTypingState } from "../types";

// Thunks
export const generateDataTyping = createAsyncThunk(
    'dataTyping/generateDataTyping',
    async (_, { getState }) => {
        const { control: payload } = getState() as RootState;
        const { mode } = payload;
        if (mode === TypingMode.quote) {
            return await getQuoteFromClient(payload);
        } else {
            return await getWordsFromClient(payload);
        }
    }
);

// Slice
const initialDataTypingState: DataTypingState = {
    data: [''],
    target: [''],
    corrects: [''],
    typed: [''],
    wrongs: [''],
}

const dataTyping = createSlice({
    name: 'dataTyping',
    initialState: initialDataTypingState,
    reducers: {
        setDataText: (state, action: PayloadAction<string>) => {
            state.data = action.payload.split(' ')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(generateDataTyping.fulfilled, (state, action) => {
            if (action.payload.length == 1) {
                const res = action.payload[0].content.replaceAll('_3dots', '...').replaceAll('_comma', ',');
                state.data = res.split(' ');
            } else {
                state.data = action.payload.map((item: Word) => item.content)
            }
            console.log(state.data);
        })
        builder.addCase(generateDataTyping.rejected, (state, action) => {
            console.log(action.payload)
        })
    }
})

export const { setDataText } = dataTyping.actions;
export default dataTyping.reducer;

