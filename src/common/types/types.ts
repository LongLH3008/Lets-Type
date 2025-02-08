import { UUID } from "crypto";
import { Active, Available, Difficult } from "./enums";

export type KeyRow = IKey[];

export interface IKey {
    key: string;
    shift: string
    keycode: number
}

export interface Word {
    id: number;
    created_at: string;
    updated_at: string;
    used: number;
    content: string;
    difficult: Difficult
    available: Available
    active: Active
    author: UUID
}

export type TypedLetter = {
    cursor: boolean,
    content: string,
    active: boolean,
    correct: boolean,
    typed: string,
}

export type TypedWord = {
    active: boolean,
    content: string,
    letter: TypedLetter[];
}

export interface IKeyboard {
    key: string,
    shift: string,
    keycode: number
}