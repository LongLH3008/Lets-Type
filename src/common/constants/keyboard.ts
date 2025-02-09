import { IKeyboard } from "../types/typing__types";


export const keycodes: number[] = [
    192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187,
    81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220,
    65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222,
    90, 88, 67, 86, 66, 78, 77, 188, 190, 191,
    32
]


export const keyboard_constant: IKeyboard[][] = [
    [
        { key: "`", shift: "~", keycode: 192 },
        { key: "1", shift: "!", keycode: 49 },
        { key: "2", shift: "@", keycode: 50 },
        { key: "3", shift: "#", keycode: 51 },
        { key: "4", shift: "$", keycode: 52 },
        { key: "5", shift: "%", keycode: 53 },
        { key: "6", shift: "^", keycode: 54 },
        { key: "7", shift: "&", keycode: 55 },
        { key: "8", shift: "*", keycode: 56 },
        { key: "9", shift: "(", keycode: 57 },
        { key: "0", shift: ")", keycode: 48 },
        { key: "-", shift: "_", keycode: 189 },
        { key: "=", shift: "+", keycode: 187 }
    ],
    [
        { key: "q", shift: "Q", keycode: 81 },
        { key: "w", shift: "W", keycode: 87 },
        { key: "e", shift: "E", keycode: 69 },
        { key: "r", shift: "R", keycode: 82 },
        { key: "t", shift: "T", keycode: 84 },
        { key: "y", shift: "Y", keycode: 89 },
        { key: "u", shift: "U", keycode: 85 },
        { key: "i", shift: "I", keycode: 73 },
        { key: "o", shift: "O", keycode: 79 },
        { key: "p", shift: "P", keycode: 80 },
        { key: "[", shift: "{", keycode: 219 },
        { key: "]", shift: "}", keycode: 221 },
        { key: "\\", shift: "|", keycode: 220 },
    ],
    [
        { key: "a", shift: "A", keycode: 65 },
        { key: "s", shift: "S", keycode: 83 },
        { key: "d", shift: "D", keycode: 68 },
        { key: "f", shift: "F", keycode: 70 },
        { key: "g", shift: "G", keycode: 71 },
        { key: "h", shift: "H", keycode: 72 },
        { key: "j", shift: "J", keycode: 74 },
        { key: "k", shift: "K", keycode: 75 },
        { key: "l", shift: "L", keycode: 76 },
        { key: ";", shift: ":", keycode: 186 },
        { key: "'", shift: '"', keycode: 222 },
    ],
    [
        { key: "z", shift: "Z", keycode: 90 },
        { key: "x", shift: "X", keycode: 88 },
        { key: "c", shift: "C", keycode: 67 },
        { key: "v", shift: "V", keycode: 86 },
        { key: "b", shift: "B", keycode: 66 },
        { key: "n", shift: "N", keycode: 78 },
        { key: "m", shift: "M", keycode: 77 },
        { key: ",", shift: "<", keycode: 188 },
        { key: ".", shift: ">", keycode: 190 },
        { key: "/", shift: "?", keycode: 191 },
    ],
    [
        // space
        { key: " ", shift: "", keycode: 32 },
    ]
]