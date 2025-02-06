import { Difficult, TypingMode } from "../types/enums";

export interface ControlState {
    keyboard: boolean
    mode: TypingMode;
    timer: number,
    totalWords: number;
    difficult: Difficult
}

export interface DataTypingState {
    data: string[];
    corrects: string[];
    wrongs: string[];
    typed: string[];
    target: string[];
}