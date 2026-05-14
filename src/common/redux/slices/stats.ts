import { saveResultFromClient } from "@/apis/data";
import { SECOND_PER_MIN, STANDARD_CHARACTER_LENGTH } from "@/common/constants/stats";
import { TypingMode } from "@/common/types/control__enums";
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
    backspaceCount: 0,
}

// ─── Tính toán thống kê cuối game ────────────────────────────────────────────
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

// ─── Lưu kết quả lên Supabase hoặc localStorage (nếu chưa đăng nhập) ────────
export const saveResult = createAsyncThunk('stats/saveResult', async (_, { getState }) => {
    const { typing: { typed }, stats, control, auth } = getState() as RootState;
    if (stats.ended == 0) return;
    const wpm = stats.wpmRecords.slice(-1)[0];
    const payload = {
        started_at: new Date(stats.started).toISOString(),
        ended_at: new Date(stats.ended).toISOString(),
        duration: Math.floor((stats.ended - stats.started) / 1000),
        mode: control.mode,
        totalWords: typed.length,
        wpm: wpm?.wpm as string,
        rawWpm: wpm?.rawWpm as string,
        difficult: control.mode === TypingMode.timer ? null : control.difficult
    }

    if (auth.session == null) {
        return localStorage.setItem('last_typed', JSON.stringify(payload));
    }
    const user_id = auth.session.user.id;
    try {
        return await saveResultFromClient({ ...payload, user_id });
    } catch (error) {
        throw error;
    }
})

// ─── Tổng hợp thống kê sau khi game kết thúc ─────────────────────────────────
export const calcStats = createAsyncThunk('calcStats/stats', (_, { getState }): { typed: TypedWord[] } => {
    const { typing: { typed } } = getState() as RootState;
    return { typed };
})

// ─── Tính WPM theo thời gian thực (gọi mỗi giây khi đang gõ) ────────────────
// WPM    = (ký tự đúng / 5) * (60 / giây)
// Raw WPM = (ký tự đã gõ bao gồm cả đã xoá bằng backspace / 5) * (60 / giây)
//   - char.active=true              → đang hiện (đúng hoặc sai)
//   - char.edited=true, active=false → đã gõ rồi bị xoá bởi backspace
export const calcWpm = createAsyncThunk(
    'stats/calcWpm', (_, { getState }): { rawWpm: string, wpm: string } => {
        const { typing: { typed }, stats: { started } } = getState() as RootState;
        const correct_characters = typed.reduce((init: number, word) =>
            init + word.character.filter((char) => char.correct).length, 0)
        const duration = (Date.now() - started) / 1000
        const wpm = (correct_characters / STANDARD_CHARACTER_LENGTH)
            * (SECOND_PER_MIN / duration);

        const totalTypedChars = typed.reduce((init: number, word) => {
            const activeChars = word.character.filter((char) => char.active).length;
            const deletedChars = word.character.filter((char) => char.edited && !char.active).length;
            return activeChars + deletedChars + init;
        }, 0)
        const raw = (totalTypedChars / STANDARD_CHARACTER_LENGTH) * (SECOND_PER_MIN / duration);
        return { rawWpm: raw.toFixed(2).toString(), wpm: wpm.toFixed(2).toString() }
    })

// ─── Kiểm tra game đã kết thúc (word/quote mode) ─────────────────────────────
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

// ─── Slice ────────────────────────────────────────────────────────────────────
// finish là sync action: set state.ended = Date.now()
const stats = createSlice({
    initialState: initialStatsState,
    name: 'stats',
    reducers: {
        finish: (state) => {
            state.ended = Date.now();
        }
    },
    extraReducers: (builder) => {
        builder.addCase(calcStats.fulfilled, (state, action) => {
            if (state.started == 0 || state.ended == 0) return;
            const stats = statsTypedWord(action.payload.typed);
            state.correct = stats.correct;
            state.incorrect = stats.incorrect;
            state.edited = stats.edited;
        })
        builder.addCase(calcWpm.fulfilled, (state, action) => {
            state.wpmRecords.push({ wpm: (action.payload.wpm), rawWpm: (action.payload.rawWpm) })
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
            if (action.payload) state.backspaceCount++;
        })
    }
})

export const { finish } = stats.actions;
export default stats.reducer