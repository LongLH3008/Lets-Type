import { SECOND_PER_MIN, STANDARD_CHARACTER_LENGTH } from "@/common/constants/stats";
import { StatsTypedWord } from "@/common/types/stats__types";
import { TypedWord } from "@/common/types/typing__types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StatsState } from "../../types/redux_initialstate_types";
import { RootState } from "../store";
import { backspaceAction, generateDataTyping, presskeyAction } from "./typing";

const initialStatsState: StatsState = {
    wpmRecords: [],
    correct: [],
    incorrect: [],
    edited: [],
    started: 0,
    ended: 0,
    backspace: 0,
}

// Calculation
const handleCalcWpm = (correct_characters: number, duration: number): number => {
    const netWpm = (correct_characters / STANDARD_CHARACTER_LENGTH)
        * (SECOND_PER_MIN / duration);
    return netWpm;
}

const statsTypedWord = (typedWord: TypedWord[]): StatsTypedWord => {
    const words = typedWord.filter((word) => word.active);
    let calcWord: StatsTypedWord = { correct: [], edited: [], incorrect: [] }
    for (const word of words) {
        const chars = word.character
        const edited = chars.find((char) => char.edited);
        const correct = chars.filter((char) => char.correct).length === chars.length
        if (edited) calcWord.edited.push(word);
        if (!correct) {
            calcWord.incorrect.push(word);
            continue;
        }
        calcWord.correct.push(word);
    }
    return calcWord
}

// Thunk
export const finish = createAsyncThunk('finish/stats', (_) => {
})

// Finish and statistics results
export const calcStats = createAsyncThunk('calcStats/stats', (_, { getState }): { typed: TypedWord[] } => {
    const { typing: { typed } } = getState() as RootState;
    return { typed };
})

// Follow each time presskey
export const calcWpm = createAsyncThunk(
    'stats/calcWpm', (_, { getState }) => {
        const { typing: { typed }, stats: { started } } = getState() as RootState;
        const correct_characters = typed.reduce((init: number, word) =>
            init + word.character.filter((char) => char.correct).length, 0)
        const duration = (Date.now() - started) / 1000
        const wpm = handleCalcWpm(correct_characters, duration);

        const chars = typed.reduce((init: number, word) => {
            const chars = word.character.filter((char) => char.active).length;
            return chars + init;
        }, 0)
        const raw = (chars / STANDARD_CHARACTER_LENGTH) * (SECOND_PER_MIN / duration);
        return { rawWpm: raw.toFixed(2), wpm: wpm.toFixed(2) }
    })

// Check finished
export const checkFinished = createAsyncThunk(
    'checkFinished/stats', (_, { getState }) => {
        const { typing: { typed } } = getState() as RootState;

        const lastTypedWordIndex = typed.findLastIndex((word) => word.active);
        if (lastTypedWordIndex !== typed.length - 1) return false;

        const theLastChars = typed[lastTypedWordIndex].character
        const checkLastWordIsCorrect = theLastChars.filter((char) => char.correct).length === theLastChars.length;
        if (checkLastWordIsCorrect) return true;

        const lastTypedCharIndex = theLastChars.filter((char) => char.active)
        const checkLastWordIsFinished = lastTypedCharIndex.length === theLastChars.length + 1
        return checkLastWordIsFinished;
    })

// Slice
const stats = createSlice({
    initialState: initialStatsState,
    name: 'stats',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(finish.fulfilled, (state) => {
            state.ended = Date.now()
        })
        builder.addCase(calcStats.fulfilled, (state, action) => {
            if (state.started == 0 || state.ended == 0) return;
            const stats = statsTypedWord(action.payload.typed);
            state.correct = stats.correct;
            state.incorrect = stats.incorrect;
            state.edited = stats.edited;
            console.log(JSON.parse(JSON.stringify(state.wpmRecords)))
        })
        builder.addCase(calcWpm.fulfilled, (state, action) => {
            const wpmRecords = [...state.wpmRecords, { wpm: action.payload.wpm, rawWpm: action.payload.rawWpm }]
            state.wpmRecords = wpmRecords
        })
        builder.addCase(presskeyAction.fulfilled, (state) => {
            if (state.started == 0 && state.ended == 0) state.started = Date.now();
        })
        builder.addCase(generateDataTyping.fulfilled, (state) => {
            Object.assign(state, initialStatsState)
        })
        builder.addCase(checkFinished.fulfilled, (state, action) => {
            if (action.payload) {
                state.ended = Date.now();
            }
        })
        builder.addCase(backspaceAction.fulfilled, (state, action) => {
            if (action.payload) state.backspace++;
        })

    }
})

export const { } = stats.actions
export default stats.reducer