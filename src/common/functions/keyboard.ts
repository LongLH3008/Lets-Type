import { totalData } from "../constants/countFromData";
import { Difficult, TypingMode } from "../types/enums";
import { Key } from "../types/types";

export const checkNormalKey = (key: Key): boolean => key.key.toLowerCase() === key.shift.toLowerCase();
export const checkSpaceKey = (key: Key): boolean => key.shift === '' && key.key === ' ';
export const checkIndexFinger = (key: Key): boolean => key.key === 'f' || key.key === 'j'

export const getRandomIndex = (mode: TypingMode, difficult: Difficult, take: number = 1): number[] => {
    let res = new Set<number>();
    let min: number = 0;
    let max: number = 0
    let total = totalData[mode][difficult]
    const totalKey = Array.from(Object.keys(totalData[mode]))
    const currentIndex = totalKey.findIndex((item: string) => item == difficult)
    if (currentIndex > 0) {
        for (let i = 0; i <= currentIndex; i++) {
            let total = totalData[mode][totalKey[i] as Difficult]
            max += total
        }
    } else {
        max = total;
    }
    min = currentIndex > 0 ? Number(process.env.NEXT_PUBLIC_LIMIT_WORDS) - max : 1;
    console.log('cc', Array.from(Object.keys(totalData[TypingMode.quote])))
    console.log('count', min, max);

    while (res.size < take) {
        const e = Math.floor(Math.random() * Number(total)) + 1;
        if (e >= min && e <= max) res.add(e);
    }
    return Array.from(res)
}