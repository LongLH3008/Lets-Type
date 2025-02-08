import { Difficult } from "../types/enums"

export const TotalWordsMode: { label: string, value: number }[] = [
    { label: '120 words', value: 120 },
    { label: '90 words', value: 90 },
    { label: '60 words', value: 60 },
    { label: '30 words', value: 30 },
]

export const TimerConstant: { label: string, value: number }[] = [
    { label: '120 seconds', value: 120 },
    { label: '60 seconds', value: 60 },
    { label: '30 seconds', value: 30 },
]

export const QuotesDifficultConstant: { label: string, desc: string, value: Difficult }[] = [
    { label: 'Super Hard', desc: 'Over 120 words, includes special characters & numbs', value: Difficult.SuperHard },
    { label: 'Hard', desc: 'Over 120 words, includes numbs', value: Difficult.Hard },
    { label: 'Medium', desc: 'Over 90 words, includes numbs', value: Difficult.Medium },
    { label: 'Easy', desc: 'Over 60 words, includes numbs', value: Difficult.Easy },
]

export const WordsDifficultConstant: { label: string, desc: string, value: Difficult }[] = [
    { label: 'Super Hard', desc: 'Over 12 letters, includes duplicate letter, special characters & numbs', value: Difficult.SuperHard },
    { label: 'Hard', desc: 'Over 9 letters, includes special characters & numbs', value: Difficult.Hard },
    { label: 'Medium', desc: 'Over 5 letters', value: Difficult.Medium },
    { label: 'Easy', desc: 'Over 3 letters', value: Difficult.Easy },
]