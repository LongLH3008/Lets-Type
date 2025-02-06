import { UUID } from "crypto";
import { Active, Available, Difficult } from "./enums";

export type KeyRow = Key[];

export interface Key {
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

