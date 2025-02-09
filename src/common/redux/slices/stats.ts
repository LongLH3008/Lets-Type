import { SECOND_PER_MIN, STANDARD_CHARACTER_LENGTH } from "@/common/constants/stats";
import { StatsTypedWord } from "@/common/types/stats__types";
import { TypedWord } from "@/common/types/typing__types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StatsState } from "../../types/redux_initialstate_types";
import { RootState } from "../store";
import { generateDataTyping, presskeyAction } from "./typing";

const initialStatsState: StatsState = {
    wpm: '0.00',
    correct: 0,
    incorrect: 0,
    edited: 0,
    started: 0,
    ended: 0,
    accuracy: 0,
    backspace: 0,
}

// Calculation
const handleCalcWpm = (correct_characters: number, duration: number): number => {
    const wpm = (correct_characters / STANDARD_CHARACTER_LENGTH)
        * (SECOND_PER_MIN / duration);
    return wpm;
}

const checkTypedWord = (
    check: Partial<keyof StatsTypedWord>,
    typedWord: TypedWord): boolean => {
    const characters = typedWord.character
    if (check === 'edited') {
        const checkChars = characters.filter((e) => e.edited).length;
        return checkChars > 1;
    }
    const checkChars = characters.filter((e) => e.correct).length;
    if (check === 'correct') return checkChars === characters.length;
    if (check === 'incorrect') return checkChars !== characters.length;
    return false;
}

// Thunk
// Follow each time scroll to view the word index
export const calcStatsTypedWord = createAsyncThunk(
    'stats/calcStatsTypedWord', (_, { getState }): boolean | TypedWord => {
        const { typing: { typed, scrollToViewWordIndex } } = getState() as RootState;
        if (scrollToViewWordIndex < 0) return false;
        const currentWord = typed[scrollToViewWordIndex - 1];
        console.log(currentWord, scrollToViewWordIndex)
        if (!currentWord) return false;
        return currentWord
    })

// Follow each time presskey
export const calcWpm = createAsyncThunk(
    'stats/calcWpm', (_, { getState }) => {
        const { typing: { typed }, stats: { started } } = getState() as RootState;
        const correct_characters = typed.reduce((init: number, word) =>
            init + word.character.filter((char) => char.correct).length, 0)
        const duration = (Date.now() - started) / 1000
        const wpm = handleCalcWpm(correct_characters, duration);
        return wpm.toFixed(2)
    })

// Check finished
export const checkFinished = createAsyncThunk(
    'checkFinished/stats', (_, { getState }) => {
        const { typing: { typed } } = getState() as RootState;
        const checkLastTypedWord = typed.findLastIndex((word) => word.active);
        if (checkLastTypedWord !== typed.length - 1) return false;
        const checkLastTypedCharacter = typed[checkLastTypedWord].character.findLastIndex((char) => char.active);
        return checkLastTypedCharacter == typed[checkLastTypedWord].character.length - 1
    })

// Slice
const stats = createSlice({
    initialState: initialStatsState,
    name: 'stats',
    reducers: {
        ended: (state) => {
            state.ended = Date.now();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(calcStatsTypedWord.fulfilled, (state, action) => {
            if (!action.payload) return;
            const typedWord = action.payload as TypedWord
            if (checkTypedWord('correct', typedWord)) state.correct++;
            if (checkTypedWord('edited', typedWord)) state.edited++;
            if (checkTypedWord('incorrect', typedWord)) state.incorrect++;
            console.log(state.correct, state.edited, state.incorrect)
        })
        builder.addCase(calcWpm.fulfilled, (state, action) => {
            state.wpm = action.payload
        })
        builder.addCase(presskeyAction.fulfilled, (state) => {
            if (state.started == 0) state.started = Date.now();
        })
        builder.addCase(generateDataTyping.fulfilled, (state) => {
            Object.assign(state, initialStatsState)
        })
        builder.addCase(checkFinished.fulfilled, (state, action) => {
            if (action.payload) {
                state.ended = Date.now();
            }
        })
    }
})

export const { } = stats.actions
export default stats.reducer