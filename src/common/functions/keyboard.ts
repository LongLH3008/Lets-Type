import { IKey } from "../types/types";

export const checkNormalKey = (key: IKey): boolean => key.key.toLowerCase() === key.shift.toLowerCase();
export const checkSpaceKey = (key: IKey): boolean => key.shift === '' && key.key === ' ';
export const checkIndexFinger = (key: IKey): boolean => key.key === 'f' || key.key === 'j'