import { getQuoteFromClient, getWordsFromClient } from "@/apis/data";
import { TypingMode } from "@/common/types/enums";
import { TypedLetter, TypedWord, Word } from "@/common/types/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { DataTypingState } from "../types";

// Thunks
export const generateDataTyping = createAsyncThunk(
    'dataTyping/generateDataTyping',
    async (_, { getState, dispatch }) => {
        const { control: payload } = getState() as RootState;
        const { mode } = payload;
        if (mode === TypingMode.quote) {
            return await getQuoteFromClient(payload);
        } else {
            return await getWordsFromClient(payload);
        }
    }
);

export const backspaceAction = createAsyncThunk(
    'dataTyping/backspaceAction',
    (_, { getState }) => {
        const { control } = getState() as RootState;
        const { backspace } = control;
        return backspace
    })

// Slice
const initialDataTypingState: DataTypingState = {
    data: [],
    typed: [],
    pressedKey: 0,
    scrollToViewWordIndex: 0,
}

const checkCurrentWord = (word: TypedWord[]): number => {
    const currentWord = word.findIndex((e) => !e.active);
    return currentWord
}

// Handle typing
const handleTypedWord = (word: TypedWord[], index: number): { word: TypedWord[], scrollIndex: number } => {
    const typedLetter = word[index].letter.filter((e) => e.active);

    // Guarantee that is 10th word then scroll
    const scrollIndex = typedLetter.length == 1 && index > 10 ? index : -1;

    if (word[index].content.length !== typedLetter.length) return { word, scrollIndex };
    const res = word.map((e, ind: number) => {
        if (ind == index) return { ...e, active: true }
        if (ind == index + 1) return { ...e, letter: e.letter.map((lett, indLett) => indLett == 0 ? { ...lett, cursor: true } : lett) }
        return e
    });
    return { word: res, scrollIndex };
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

// Handle backspace
const handleBackspace = (word: TypedWord[], indexCurrentWord: number): TypedWord[] => {
    const currentWord = word[indexCurrentWord];
    const typedLetter = currentWord.letter.filter((e) => e.active);
    if (typedLetter.length == 0) return word

    const indexDeleteLetter = typedLetter.length - 1;
    const letter = currentWord.letter.map((lett, index: number) => {
        if (index == indexDeleteLetter) return { ...lett, cursor: true, active: false, typed: '', correct: false };
        if (index == indexDeleteLetter + 1) return { ...lett, cursor: false };
        return lett
    })

    let res = word.map((e, index: number) => index == indexCurrentWord ? { ...e, letter } : e);
    return res;
}

const dataTyping = createSlice({
    name: 'dataTyping',
    initialState: initialDataTypingState,
    reducers: {
        typing: (state, action: PayloadAction<{ keycode: number, typed: string }>) => {
            const currentWord = checkCurrentWord(state.typed);
            state.typed[currentWord].letter = handleTypedLetter(state.typed[currentWord].letter, action.payload.typed);
            const { word, scrollIndex } = handleTypedWord(state.typed, currentWord);
            if (scrollIndex !== -1) {
                state.scrollToViewWordIndex = scrollIndex;
            }
            state.typed = word;
            state.pressedKey = action.payload.keycode;
        },
        resetPressKey: (state) => {
            state.pressedKey = 0;
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
            state.scrollToViewWordIndex = 0;

            const initLetter = {
                correct: false,
                active: false,
                typed: '',
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
        builder.addCase(backspaceAction.fulfilled, (state, action) => {
            if (action.payload) {
                const currentWord = checkCurrentWord(state.typed);
                state.typed = handleBackspace(state.typed, currentWord);
            }
        })
    }
})

export const { typing, resetPressKey } = dataTyping.actions;
export default dataTyping.reducer;

