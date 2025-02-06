import { Difficult, TypingMode } from "../types/enums";

export const totalData = {
    [TypingMode.word]: {
        [Difficult.Easy]: Number(process.env.NEXT_PUBLIC_EASY_WORDS),
        [Difficult.Medium]: Number(process.env.NEXT_PUBLIC_MEDIUM_WORDS),
        [Difficult.Hard]: Number(process.env.NEXT_PUBLIC_HARD_WORDS),
        [Difficult.SuperHard]: Number(process.env.NEXT_PUBLIC_SUPER_HARD_WORDS),
    },
    [TypingMode.quote]: {
        [Difficult.Easy]: Number(process.env.NEXT_PUBLIC_EASY_QUOTES),
        [Difficult.Medium]: Number(process.env.NEXT_PUBLIC_MEDIUM_QUOTES),
        [Difficult.Hard]: Number(process.env.NEXT_PUBLIC_HARD_QUOTES),
        [Difficult.SuperHard]: Number(process.env.NEXT_PUBLIC_SUPER_HARD_QUOTES),
    },
    [TypingMode.timer]: {
        [Difficult.Easy]: Number(process.env.NEXT_PUBLIC_EASY_WORDS),
        [Difficult.Medium]: Number(process.env.NEXT_PUBLIC_MEDIUM_WORDS),
        [Difficult.Hard]: Number(process.env.NEXT_PUBLIC_HARD_WORDS),
        [Difficult.SuperHard]: Number(process.env.NEXT_PUBLIC_SUPER_HARD_WORDS),
    },
};


export const maxRange = {
    [TypingMode.word]: {
        [Difficult.Easy]: Number(process.env.NEXT_PUBLIC_MEDIUM_WORDS),
        [Difficult.Medium]: Number(process.env.NEXT_PUBLIC_HARD_WORDS),
        [Difficult.Hard]: Number(process.env.NEXT_PUBLIC_SUPER_HARD_WORDS),
        [Difficult.SuperHard]: Number(process.env.NEXT_PUBLIC_LIMIT_WORDS),
    },
    [TypingMode.quote]: {
        [Difficult.Easy]: Number(process.env.NEXT_PUBLIC_EASY_QUOTES),
        [Difficult.Medium]: Number(process.env.NEXT_PUBLIC_MEDIUM_QUOTES),
        [Difficult.Hard]: Number(process.env.NEXT_PUBLIC_HARD_QUOTES),
        [Difficult.SuperHard]: Number(process.env.NEXT_PUBLIC_LIMIT_QUOTES),
    },
    [TypingMode.timer]: {
        [Difficult.Easy]: Number(process.env.NEXT_PUBLIC_EASY_WORDS),
        [Difficult.Medium]: Number(process.env.NEXT_PUBLIC_MEDIUM_WORDS),
        [Difficult.Hard]: Number(process.env.NEXT_PUBLIC_HARD_WORDS),
        [Difficult.SuperHard]: Number(process.env.NEXT_PUBLIC_LIMIT_WORDS),
    },
}

export const minRange = {
    [TypingMode.word]: {
        [Difficult.Easy]: 1,
        [Difficult.Medium]: Number(process.env.NEXT_PUBLIC_EASY_WORDS),
        [Difficult.Hard]: Number(process.env.NEXT_PUBLIC_MEDIUM_WORDS),
        [Difficult.SuperHard]: Number(process.env.NEXT_PUBLIC_HARD_WORDS),
    },
    [TypingMode.quote]: {
        [Difficult.Easy]: 1,
        [Difficult.Medium]: Number(process.env.NEXT_PUBLIC_EASY_QUOTES),
        [Difficult.Hard]: Number(process.env.NEXT_PUBLIC_MEDIUM_QUOTES),
        [Difficult.SuperHard]: Number(process.env.NEXT_PUBLIC_HARD_QUOTES),
    },
    [TypingMode.timer]: {
        [Difficult.Easy]: 1,
        [Difficult.Medium]: Number(process.env.NEXT_PUBLIC_EASY_WORDS),
        [Difficult.Hard]: Number(process.env.NEXT_PUBLIC_MEDIUM_WORDS),
        [Difficult.SuperHard]: Number(process.env.NEXT_PUBLIC_HARD_WORDS),
    },
}
