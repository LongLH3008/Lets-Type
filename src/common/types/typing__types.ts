import { UUID } from "crypto";
import { Active, Available, Difficult } from "./control__enums";

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

export type TypedCharacter = {
    cursor: boolean,
    content: string,
    active: boolean,
    correct: boolean,
    typed: string,
    edited: boolean,
}

export type TypedWord = {
    active: boolean,
    content: string,
    character: TypedCharacter[];
}