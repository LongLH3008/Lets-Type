# Redux Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Loại bỏ state dư thừa, sửa các bug trong Redux logic, thêm comment tiếng Việt ở đầu mỗi phần.

**Architecture:** Các thay đổi tập trung trong 3 Redux slice (`typing`, `stats`, `control`), 1 hook (`useTypingKeyAction`), và 2 component (`WPMCalculator`, `StatsScreen`). Không thay đổi API hay UI.

**Tech Stack:** Next.js 15, React 19, Redux Toolkit, TypeScript

---

## Bản đồ file thay đổi

| File | Lý do thay đổi |
|------|----------------|
| `src/common/types/redux_initialstate_types.ts` | Xóa `pressedKey`, `data` khỏi `TypingState`; đổi `backspace: number` → `backspaceCount` trong `StatsState` |
| `src/common/redux/slices/typing.ts` | Xóa `pressedKey`, `data`, dead `dispatch(finish())`; thêm comment |
| `src/common/redux/slices/stats.ts` | Chuyển `finish` sang sync action, guard `calcStats`, đổi tên `backspaceCount`; thêm comment |
| `src/common/redux/slices/control.ts` | Thêm comment |
| `src/common/hooks/useTypingKeyAction.tsx` | Chỉ dispatch `calcStats` khi `ended > 0` |
| `src/components/typing_screen/WPMCalculator.tsx` | Đổi `let intervalWPM` → `useRef` |
| `src/components/typing_screen/Timer.tsx` | Cập nhật call `finish()` (giờ là sync action) |
| `src/components/stats_screen/StatsScreen.tsx` | Fix double-dispatch `saveResult` |
| `src/page/Play.tsx` | Xóa `console.log` thừa |
| `src/components/stats_screen/StatsWpmChart.tsx` | Xóa `console.log` thừa |

---

## Task 1: Xóa `pressedKey` và `data` khỏi `TypingState`

> `pressedKey` được set nhưng không có component nào đọc (key highlight làm trực tiếp qua DOM).  
> `data: string[]` trùng lặp với `typed[i].content`.

**Files:**
- Modify: `src/common/types/redux_initialstate_types.ts`
- Modify: `src/common/redux/slices/typing.ts`

- [ ] **Bước 1: Cập nhật interface `TypingState`**

Trong `src/common/types/redux_initialstate_types.ts`, thay đổi:

```ts
export interface TypingState {
    typed: TypedWord[];
    scrollToViewWordIndex: number;
}
```

(Xóa `data: string[]` và `pressedKey: number`)

- [ ] **Bước 2: Cập nhật `initialDataTypingState` và xóa `resetPressKey`**

Trong `src/common/redux/slices/typing.ts`, thay `initialDataTypingState`:

```ts
const initialDataTypingState: TypingState = {
    typed: [],
    scrollToViewWordIndex: 0,
}
```

Trong `reducers`, xóa `resetPressKey`:

```ts
reducers: {},
```

- [ ] **Bước 3: Cập nhật `generateDataTyping.fulfilled` — xóa gán `state.data`**

```ts
builder.addCase(generateDataTyping.fulfilled, (state, action) => {
    let res: string[] = [];
    if (action.payload.length == 1) {
        const quote = action.payload[0].content
            .replaceAll('_3dots', '...')
            .replaceAll('_comma', ',')
            .split(' ');
        res = quote.map((item: string, index: number) =>
            index !== quote.length - 1 ? item + ' ' : item
        );
    } else {
        res = action.payload.map((item: Word, index: number) =>
            index !== action.payload.length - 1 ? item.content + ' ' : item.content
        );
    }

    const initCharacter: Partial<TypedCharacter> = {
        correct: false,
        active: false,
        typed: '',
        edited: false,
    };

    const words: TypedWord[] = res.map((item: string, indWord: number) => {
        const character = item.split('').map((char: string, indChar: number) => ({
            ...initCharacter, content: char, cursor: indWord == 0 && indChar == 0
        }));
        return { active: false, content: item, character };
    });

    state.scrollToViewWordIndex = 0;
    state.typed = words;
})
```

- [ ] **Bước 4: Cập nhật `presskeyAction.fulfilled` — xóa `state.pressedKey`**

```ts
builder.addCase(presskeyAction.fulfilled, (state, action) => {
    const currentWordIndex = checkCurrentWord(state.typed);
    const currentWord = state.typed[currentWordIndex];
    if (!currentWord) return;
    state.typed[currentWordIndex].character = handleTypedCharacter(
        state.typed[currentWordIndex].character,
        action.payload.typed
    );

    if (
        currentWordIndex < state.typed.length - 1 &&
        currentWord.character.filter((char) => char.active).length == currentWord.content.length
    ) {
        state.scrollToViewWordIndex = currentWordIndex + 1;
    }

    state.typed = handleTypedWord(state.typed, currentWordIndex);
    // Xóa dòng: state.pressedKey = action.payload.keycode;
})
```

- [ ] **Bước 5: Xóa export `resetPressKey` ở cuối file**

```ts
// Xóa dòng:
// export const { resetPressKey } = typing.actions;
export default typing.reducer;
```

- [ ] **Bước 6: Kiểm tra TypeScript không có lỗi**

```bash
cd p:/LetsType && npx tsc --noEmit
```

Expected: không có lỗi liên quan đến `pressedKey` hay `data`.

- [ ] **Bước 7: Commit**

```bash
git add src/common/types/redux_initialstate_types.ts src/common/redux/slices/typing.ts
git commit -m "refactor(redux): xóa dead state pressedKey và data khỏi TypingState"
```

---

## Task 2: Chuyển `finish` từ async thunk rỗng sang sync action

> `finish` là `createAsyncThunk` với body rỗng — chỉ tồn tại để trigger `.fulfilled`.  
> Đây là sai ngữ nghĩa và tạo thêm 2 action thừa (`pending` + `fulfilled`) mỗi lần gọi.

**Files:**
- Modify: `src/common/redux/slices/stats.ts`
- Modify: `src/components/typing_screen/Timer.tsx`

- [ ] **Bước 1: Chuyển `finish` sang sync reducer trong `stats.ts`**

Xóa dòng:
```ts
export const finish = createAsyncThunk('finish/stats', (_) => {})
```

Thêm vào `reducers` trong `createSlice`:
```ts
reducers: {
    finish: (state) => {
        state.ended = Date.now();
    }
},
```

Trong `extraReducers`, xóa:
```ts
// Xóa:
builder.addCase(finish.fulfilled, (state) => {
    state.ended = Date.now()
})
```

Cập nhật export ở cuối file:
```ts
export const { finish } = stats.actions;
export default stats.reducer;
```

- [ ] **Bước 2: Cập nhật `Timer.tsx` — `finish` giờ là sync, không cần `.then()`**

```ts
import { calcStats, finish } from "@/common/redux/slices/stats";
// ...

useEffect(() => {
    if (started == 0) return;
    const intervalTime = setInterval(() => {
        setTime((prevTime) => {
            if (prevTime <= 1) {
                dispatch(finish());
                dispatch(calcStats());
                clearInterval(intervalTime);
                return 0;
            }
            return prevTime - 1;
        });
    }, 1000);

    return () => clearInterval(intervalTime);
}, [started]);
```

- [ ] **Bước 3: Kiểm tra TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Bước 4: Commit**

```bash
git add src/common/redux/slices/stats.ts src/components/typing_screen/Timer.tsx
git commit -m "refactor(redux): chuyển finish từ async thunk rỗng sang sync action"
```

---

## Task 3: Xóa dead code `dispatch(finish())` trong `presskeyAction`

> Thunk body của `presskeyAction` chạy TRƯỚC khi `extraReducers` cập nhật state.  
> Kiểm tra `typed.filter((word) => word.active).length === typed.length` tại thời điểm này  
> luôn sai trong flow bình thường → dead code, không bao giờ trigger finish.

**Files:**
- Modify: `src/common/redux/slices/typing.ts`

- [ ] **Bước 1: Xóa `dispatch(finish())` và import `finish` trong `typing.ts`**

Xóa import:
```ts
// Xóa dòng:
// import { finish } from "./stats";
```

Thay `presskeyAction` thunk body:

```ts
export const presskeyAction = createAsyncThunk(
    'typing/presskeyAction',
    (payload: { keycode: number, typed: string }): { keycode: number, typed: string } => {
        return payload;
    }
)
```

(Xóa `{ getState, dispatch }` vì không còn dùng)

- [ ] **Bước 2: Kiểm tra TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Bước 3: Commit**

```bash
git add src/common/redux/slices/typing.ts
git commit -m "fix(redux): xóa dead code dispatch(finish) trong presskeyAction"
```

---

## Task 4: Chỉ dispatch `calcStats` khi game thực sự kết thúc

> Hiện tại `calcStats` được dispatch sau MỖI lần nhấn phím.  
> Reducer có guard `if (state.ended == 0) return` nhưng action vẫn đi qua toàn bộ middleware.  
> Lãng phí — chỉ cần dispatch khi `checkFinished` trả về `true`.

**Files:**
- Modify: `src/common/hooks/useTypingKeyAction.tsx`

- [ ] **Bước 1: Cập nhật dispatch chain trong `useTypingKeyAction`**

```ts
dispatch(presskeyAction({ keycode: e.keyCode, typed: typed as string })).then(() => {
    dispatch(checkFinished()).then((result) => {
        // Chỉ tính toán thống kê khi game vừa kết thúc
        if (result.payload === true) {
            dispatch(calcStats());
        }
    });
});
```

- [ ] **Bước 2: Kiểm tra flow — gõ xong một bài, stats screen phải hiện đúng**

Chạy dev server:
```bash
npm run dev
```
Gõ hết một bài (word mode), kiểm tra stats screen hiện với WPM và accuracy đúng.

- [ ] **Bước 3: Commit**

```bash
git add src/common/hooks/useTypingKeyAction.tsx
git commit -m "perf(redux): chỉ dispatch calcStats khi game kết thúc, không phải mỗi keystroke"
```

---

## Task 5: Fix `intervalWPM` dùng `useRef` thay vì `let`

> `let intervalWPM` được khai báo trong component body → recreated = `undefined` mỗi render.  
> Nhánh `if (intervalWPM !== undefined) clearInterval(...)` trong early return là dead code.  
> Dùng `useRef` để giữ reference ổn định qua các lần render.

**Files:**
- Modify: `src/components/typing_screen/WPMCalculator.tsx`

- [ ] **Bước 1: Refactor `WPMCalculator` dùng `useRef`**

```ts
import { calcWpm } from "@/common/redux/slices/stats";
import { AppDispatch, RootState } from "@/common/redux/store";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const WPMCalculator = () => {
    const dispatch = useDispatch<AppDispatch>();
    const wpmRecords = useSelector((state: RootState) => state.stats.wpmRecords);
    const typing = useSelector((state: RootState) => state.control.typing);
    const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        if (!typing) return;

        intervalRef.current = setInterval(() => {
            dispatch(calcWpm());
        }, 1000);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [typing]);

    return (
        <div className="relative text-orange-400 flex items-center">
            <span className="-top-2 absolute left-0 text-sm font-bold">WPM</span>
            {wpmRecords[wpmRecords.length - 1]?.wpm ?? "0.00"}
        </div>
    );
};

export default WPMCalculator;
```

- [ ] **Bước 2: Kiểm tra WPM counter cập nhật mỗi giây khi đang gõ**

Mở dev server, bắt đầu gõ, quan sát số WPM tăng mỗi giây.

- [ ] **Bước 3: Commit**

```bash
git add src/components/typing_screen/WPMCalculator.tsx
git commit -m "fix(component): đổi intervalWPM từ let sang useRef trong WPMCalculator"
```

---

## Task 6: Đổi tên `backspace` → `backspaceCount` trong `StatsState`

> `ControlState.backspace` là `boolean` (toggle bật/tắt).  
> `StatsState.backspace` là `number` (đếm số lần nhấn).  
> Cùng tên, khác type, dễ nhầm khi đọc code.

**Files:**
- Modify: `src/common/types/redux_initialstate_types.ts`
- Modify: `src/common/redux/slices/stats.ts`

- [ ] **Bước 1: Đổi tên trong `StatsState` interface**

Trong `src/common/types/redux_initialstate_types.ts`:

```ts
export interface StatsState extends StatsTypedWord {
    wpmRecords: {
        wpm: string;
        rawWpm: string;
    }[];
    started: number;
    ended: number;
    backspaceCount: number;  // Đổi từ backspace: number
}
```

- [ ] **Bước 2: Cập nhật `stats.ts` — initialState và extraReducers**

```ts
const initialStatsState: StatsState = {
    wpmRecords: [],
    correct: [],
    incorrect: [],
    edited: [],
    started: 0,
    ended: 0,
    backspaceCount: 0,  // Đổi từ backspace: 0
}
```

Trong `extraReducers`:
```ts
builder.addCase(backspaceAction.fulfilled, (state, action) => {
    if (action.payload) state.backspaceCount++;  // Đổi từ state.backspace++
})
```

- [ ] **Bước 3: Kiểm tra TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Bước 4: Commit**

```bash
git add src/common/types/redux_initialstate_types.ts src/common/redux/slices/stats.ts
git commit -m "refactor(redux): đổi tên backspace → backspaceCount trong StatsState để tránh nhầm lẫn với control.backspace"
```

---

## Task 7: Fix `saveResult` dispatch 2 lần trong `StatsScreen`

> `useEffect([session])` fire khi `session = null` (lưu localStorage) VÀ khi session load (lưu DB).  
> Kết quả bị lưu 2 lần. Fix: dispatch một lần duy nhất khi component mount.

**Files:**
- Modify: `src/components/stats_screen/StatsScreen.tsx`

- [ ] **Bước 1: Cập nhật `StatsScreen`**

```ts
import { saveResult } from "@/common/redux/slices/stats";
import { AppDispatch } from "@/common/redux/store";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import StatsAccuracy from "./StatsAccuracy";
import StatsControl from "./StatsControl";
import StatsDuration from "./StatsDuration";
import StatsTyped from "./StatsTyped";
import StatsWordsHistory from "./StatsWordsHistory";
import StatsWpm from "./StatsWpm";
import { StatsWpmChart } from "./StatsWpmChart";

const StatsScreen = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // Lưu kết quả một lần duy nhất khi màn hình stats hiện.
        // saveResult tự xử lý: nếu đã đăng nhập → lưu DB, chưa đăng nhập → localStorage.
        dispatch(saveResult());
    }, []);

    return (
        <motion.div
            style={{ perspective: 200 }}
            initial={{ opacity: 0, translateZ: 200 }}
            animate={{ opacity: 1, translateZ: 0 }}
            transition={{ duration: 0.6, ease: "easeIn" }}
            className="w-[1024px] h-screen flex flex-col justify-evenly"
        >
            <section className="flex flex-col gap-3">
                <StatsControl />
                <StatsWpmChart />
            </section>
            <section className="grid grid-cols-10 gap-8 items-start justify-between rounded-md text-foreground/50">
                <div className="flex flex-col gap-10 col-span-5">
                    <div className="grid grid-cols-3 font-[800]">
                        <StatsWpm />
                        <StatsAccuracy />
                        <StatsDuration />
                    </div>
                    <StatsTyped />
                </div>
                <StatsWordsHistory />
            </section>
        </motion.div>
    );
};

export default StatsScreen;
```

- [ ] **Bước 2: Kiểm tra — gõ xong bài, vào stats screen, chỉ thấy 1 request trong Network tab**

Dev tools → Network → lọc "Games" hoặc Supabase calls → chỉ có 1 POST.

- [ ] **Bước 3: Commit**

```bash
git add src/components/stats_screen/StatsScreen.tsx
git commit -m "fix(stats): saveResult chỉ dispatch một lần, tránh lưu kép localStorage + DB"
```

---

## Task 8: Xóa `console.log` debug và thêm comment tiếng Việt vào Redux slices

**Files:**
- Modify: `src/common/redux/slices/typing.ts`
- Modify: `src/common/redux/slices/stats.ts`
- Modify: `src/common/redux/slices/control.ts`
- Modify: `src/page/Play.tsx`
- Modify: `src/components/stats_screen/StatsWpmChart.tsx`

- [ ] **Bước 1: Cập nhật `typing.ts` — thêm comment, xóa console.log**

Thêm comment vào đầu mỗi phần logic:

```ts
// ─── Kiểm tra từ hiện tại đang được gõ ───────────────────────────────────────
// Quy ước: TypedWord.active = true nghĩa là từ đó đã hoàn thành (gõ xong).
// Từ hiện tại là từ đầu tiên có active = false.
const checkCurrentWord = (word: TypedWord[]): number => { ... }

// ─── Xử lý chuyển từ (khi gõ xong toàn bộ ký tự của từ hiện tại) ─────────────
const handleTypedWord = (word: TypedWord[], index: number): TypedWord[] => { ... }

// ─── Xử lý gõ một ký tự ──────────────────────────────────────────────────────
const handleTypedCharacter = (characters: TypedCharacter[], typed: string): TypedCharacter[] => { ... }

// ─── Xử lý backspace ─────────────────────────────────────────────────────────
const handleBackspace = (words: TypedWord[], indexCurrentWord: number): TypedWord[] => { ... }

// ─── Async Thunks ─────────────────────────────────────────────────────────────

// ─── Slice ────────────────────────────────────────────────────────────────────
```

Xóa trong `generateDataTyping.rejected`:
```ts
// Xóa: console.log(action.payload)
```

- [ ] **Bước 2: Cập nhật `stats.ts` — thêm comment, xóa console.log**

```ts
// ─── Tính toán thống kê cuối game ────────────────────────────────────────────
const statsTypedWord = (typedWord: TypedWord[]): StatsTypedWord => { ... }

// ─── Async Thunks ─────────────────────────────────────────────────────────────

// ─── Tính WPM (gọi mỗi giây khi đang gõ) ────────────────────────────────────
// Công thức: (số ký tự đúng / 5) * (60 / giây đã trôi qua)
export const calcWpm = ...

// ─── Kiểm tra game đã kết thúc (word/quote mode) ────────────────────────────
export const checkFinished = ...

// ─── Lưu kết quả lên Supabase hoặc localStorage (nếu chưa đăng nhập) ────────
export const saveResult = ...

// ─── Slice ────────────────────────────────────────────────────────────────────
```

Xóa các `console.log` trong extraReducers:
```ts
// Xóa trong calcStats.fulfilled:
// console.log(JSON.stringify(state.wpmRecords))

// Xóa trong saveResult.fulfilled / pending / rejected:
// console.log(action.payload)
// console.log(action)
```

Xóa các case handler rỗng (chỉ có console.log):
```ts
// Xóa hoàn toàn 3 case này vì chúng không làm gì có giá trị:
// builder.addCase(saveResult.fulfilled, ...)
// builder.addCase(saveResult.pending, ...)
// builder.addCase(saveResult.rejected, ...)
```

- [ ] **Bước 3: Cập nhật `control.ts` — thêm comment**

```ts
// ─── Giá trị mặc định khi khởi động hoặc khi đổi mode ────────────────────────
const initialStateControl: ControlState = { ... }

// ─── Slice ────────────────────────────────────────────────────────────────────
// Các action reducers xử lý thay đổi cài đặt từ người dùng (mode, timer, độ khó...)
```

- [ ] **Bước 4: Xóa `console.log` trong `Play.tsx`**

```ts
const Play = () => {
    const ended = useSelector((state: RootState) => state.stats.ended);
    // Xóa: const router = usePathname();
    // Xóa: console.log(router);

    return <>{ended > 0 ? <StatsScreen /> : <TypingScreen />}</>;
};
```

Nếu `usePathname` không còn dùng, xóa import đó luôn.

- [ ] **Bước 5: Xóa `console.log` trong `StatsWpmChart.tsx`**

```ts
const calcHighestWpm = () => {
    const raw = wpmRecords.map((rec) => rec.rawWpm).sort((a, b) => Number(a) - Number(b)).pop();
    const wpm = wpmRecords.map((rec) => rec.wpm).sort((a, b) => Number(a) - Number(b)).pop();
    // Xóa: console.log(wpm, raw);
    const res = Number(wpm) > Number(raw) ? raw : wpm;
    return Math.ceil(Number(res));
};
```

- [ ] **Bước 6: Kiểm tra TypeScript lần cuối**

```bash
npx tsc --noEmit
```

Expected: 0 lỗi.

- [ ] **Bước 7: Commit**

```bash
git add src/common/redux/slices/typing.ts src/common/redux/slices/stats.ts src/common/redux/slices/control.ts src/page/Play.tsx src/components/stats_screen/StatsWpmChart.tsx
git commit -m "chore(redux): thêm comment tiếng Việt, xóa console.log debug"
```

---

## Self-Review

**Spec coverage:**
- [x] Xóa `pressedKey` dead state → Task 1
- [x] Xóa `data` duplicate → Task 1
- [x] `finish` sync action → Task 2
- [x] Dead `dispatch(finish())` trong presskeyAction → Task 3
- [x] `calcStats` mỗi keystroke → Task 4
- [x] `intervalWPM` ref bug → Task 5
- [x] Naming collision `backspace` → Task 6
- [x] `saveResult` double-dispatch → Task 7
- [x] Comments tiếng Việt + xóa console.log → Task 8

**Thứ tự thực hiện:** Tasks 1–3 là independent. Task 4 nên sau Task 3. Tasks 5–8 là independent với nhau và với 1–4.
