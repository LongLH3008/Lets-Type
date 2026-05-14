import { Difficult, TypingMode } from "./control__enums";
import { TypedWord } from "./typing__types";

export interface StatsTypedWord {
    correct: TypedWord[];
    incorrect: TypedWord[];
    edited: TypedWord[]
}

export interface ISaveResult {
    started_at: string,
    ended_at: string,
    duration: number,
    mode: TypingMode,
    totalWords: number,
    wpm: string,
    rawWpm: string,
    difficult: Difficult | null
    user_id: string
}