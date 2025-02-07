import { Difficult, TypingMode } from "../types/enums";
import { TypedWord } from "../types/types";

export interface ControlState {
    keyboard: boolean
    mode: TypingMode;
    timer: number,
    totalWords: number;
    difficult: Difficult
    typing: boolean
}

export interface DataTypingState {
    data: string[];
    typed: TypedWord[];
}