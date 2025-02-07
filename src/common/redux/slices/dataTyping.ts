import { getQuoteFromClient, getWordsFromClient } from "@/apis/data";
import { TypingMode } from "@/common/types/enums";
import { TypedLetter, TypedWord, Word } from "@/common/types/types";
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
    data: [],
    typed: [],
}

const checkTypedWord = (word: TypedWord[]): number => {
    const currentWord = word.findIndex((e) => !e.active);
    return currentWord
}

const handleTypedWord = (word: TypedWord[], index: number): TypedWord[] => {
    const typedLetter = word[index].letter.filter((e) => e.active).length;
    if (word[index].content.length !== typedLetter) return word;
    const res = word.map((e, ind: number) => {
        if (ind == index) return { ...e, active: true }
        if (ind == index + 1) return { ...e, letter: e.letter.map((lett, indLett) => indLett == 0 ? { ...lett, cursor: true } : lett) }
        return e
    });
    return res;
}

const handleTypedLetter = (letter: TypedLetter[], typed: string): TypedLetter[] => {
    const currentLetter = letter.findIndex((e) => !e.active);
    const res = letter.map((e, index: number) => {
        if (currentLetter == index) {
            return {
                ...e,
                cursor: false,
                active: true,
                typed,
                correct: typed === e.content
            }
        }
        if (index == currentLetter + 1 && index < letter.length) {
            return { ...e, cursor: true }
        }
        return e
    })
    return res
}

const dataTyping = createSlice({
    name: 'dataTyping',
    initialState: initialDataTypingState,
    reducers: {
        typing: (state, action: PayloadAction<string>) => {
            const currentWord = checkTypedWord(state.typed);
            state.typed[currentWord].letter = handleTypedLetter(state.typed[currentWord].letter, action.payload);
            state.typed = handleTypedWord(state.typed, currentWord);

            console.log(state.typed[currentWord].content, action.payload);
            console.log(state.typed[currentWord].letter)
        }

    },
    extraReducers: (builder) => {
        builder.addCase(generateDataTyping.fulfilled, (state, action) => {
            let res = [];
            if (action.payload.length == 1) {
                const quote = action.payload[0].content.replaceAll('_3dots', '...').replaceAll('_comma', ',').split(' ');
                res = quote.map((item: string, index: number) => index !== quote.length - 1 ? item + ' ' : item)
            } else {
                res = action.payload.map((item: Word, index: number) => index !== action.payload.length - 1 ? item.content + ' ' : item.content);
            }
            state.data = res;

            const initLetter = {
                correct: false,
                active: false,
                typed: '',
                keycode: 0
            }

            const words: TypedWord[] = res.map((item: string, indWord: number) => {
                const letter = item.split('').map((lett: string, indLetter: number) => ({
                    ...initLetter, content: lett, cursor: indWord == 0 && indLetter == 0
                }));
                return {
                    active: false,
                    content: item,
                    letter
                }
            })

            state.typed = words
        })
        builder.addCase(generateDataTyping.rejected, (state, action) => {
            console.log(action.payload)
        })
    }
})

export const { typing } = dataTyping.actions;
export default dataTyping.reducer;

