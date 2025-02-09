import { getQuoteFromClient, getWordsFromClient } from "@/apis/data";
import { TypingMode } from "@/common/types/control__enums";
import { TypingState } from "@/common/types/redux_initialstate_types";
import { TypedCharacter, TypedWord, Word } from "@/common/types/typing__types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


const checkCurrentWord = (word: TypedWord[]): number => {
    const currentWord = word.findIndex((e) => !e.active);
    return currentWord
}

// Handle typing
const handleTypedWord = (word: TypedWord[], index: number): TypedWord[] => {
    const typedCharacter = word[index].character.filter((e) => e.active);

    const scrollIndex = typedCharacter.length == 1 ? index : -1;

    if (word[index].content.length !== typedCharacter.length) return word
    const res = word.map((e, ind: number) => {
        if (ind == index) return { ...e, active: true }
        if (ind == index + 1) return { ...e, character: e.character.map((char, indChar) => indChar == 0 ? { ...char, cursor: true } : char) }
        return e
    });
    return res;
}

const handleTypedCharacter = (characters: TypedCharacter[], typed: string): TypedCharacter[] => {
    const currentChar = characters.findIndex((e) => !e.active);
    const res = characters.map((e, index: number) => {
        if (currentChar == index) {
            return {
                ...e,
                cursor: false,
                active: true,
                typed,
                correct: typed === e.content
            }
        }
        if (index == currentChar + 1 && index < characters.length) {
            return { ...e, cursor: true }
        }
        return e
    })
    return res
}

// Handle backspace
const handleBackspace = (words: TypedWord[], indexCurrentWord: number): TypedWord[] => {
    const currentWord = words[indexCurrentWord];
    const typedCharacter = currentWord.character.filter((e) => e.active);
    if (typedCharacter.length == 0) return words

    const indexDeleteChar = typedCharacter.length - 1;
    const character = currentWord.character.map((char, index: number) => {
        if (index == indexDeleteChar) return { ...char, edited: true, cursor: true, active: false, typed: '', correct: false };
        if (index == indexDeleteChar + 1) return { ...char, cursor: false };
        return char
    })

    let res = words.map((e, index: number) => index == indexCurrentWord ? { ...e, character } : e);
    return res;
}

// Thunks
export const generateDataTyping = createAsyncThunk(
    'typing/generateDataTyping',
    async (_, { getState }) => {
        const { control } = getState() as RootState;
        const { mode } = control;
        if (mode === TypingMode.quote) {
            return await getQuoteFromClient(control);
        } else {
            return await getWordsFromClient(control);
        }
    }
);

export const backspaceAction = createAsyncThunk(
    'typing/backspaceAction',
    (_, { getState }) => {
        const { control } = getState() as RootState;
        const { backspace } = control;
        return backspace
    })

export const presskeyAction = createAsyncThunk(
    'typing/presskeyAction',
    (payload:
        { keycode: number, typed: string },
    ): { keycode: number, typed: string } => {
        return payload;
    })

// Slice
const initialDataTypingState: TypingState = {
    data: [],
    typed: [],
    pressedKey: 0,
    scrollToViewWordIndex: 0,
}

const typing = createSlice({
    name: 'typing',
    initialState: initialDataTypingState,
    reducers: {
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

            const initCharacter: Partial<TypedCharacter> = {
                correct: false,
                active: false,
                typed: '',
                edited: false,
            }

            const words: TypedWord[] = res.map((item: string, indWord: number) => {
                const character = item.split('').map((char: string, indChar: number) => ({
                    ...initCharacter, content: char, cursor: indWord == 0 && indChar == 0
                }));
                return {
                    active: false,
                    content: item,
                    character
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
        builder.addCase(presskeyAction.fulfilled, (state, action) => {
            const currentWordIndex = checkCurrentWord(state.typed);
            const currentWord = state.typed[currentWordIndex]
            if (!currentWord) return;
            state.typed[currentWordIndex].character = handleTypedCharacter(state.typed[currentWordIndex].character, action.payload.typed);
            if (currentWord.character.filter((char) => char.active).length == currentWord.content.length) {
                state.scrollToViewWordIndex = currentWordIndex + 1;
            }

            state.typed = handleTypedWord(state.typed, currentWordIndex);
            state.pressedKey = action.payload.keycode;

            // console.log(state.typed[currentWordIndex].character, action.payload);
        })
    }
})

export const { resetPressKey } = typing.actions;
export default typing.reducer;

