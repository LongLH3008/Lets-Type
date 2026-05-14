export type KeyRow = IKey[];

export interface IKey {
    key: string;
    shift: string
    keycode: number
}

export interface IKeyboard {
    key: string,
    shift: string,
    keycode: number
}