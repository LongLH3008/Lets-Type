import { Difficult, TypingMode } from "./control__enums";
import { StatsTypedWord } from "./stats__types";
import { TypedWord } from "./typing__types";

export interface ControlState {
    keyboard: boolean
    mode: TypingMode;
    timer: number,
    totalWords: number;
    difficult: Difficult
    typing: boolean
    backspace: boolean
}

export interface TypingState {
    data: string[];
    typed: TypedWord[];
    pressedKey: number;
    scrollToViewWordIndex: number
}

export interface StatsState extends StatsTypedWord {

    wpmRecords: {
        wpm: string;
        rawWpm: string;
    }[]
    started: number;
    ended: number;
    backspace: number
}