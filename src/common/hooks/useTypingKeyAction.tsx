import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keyboard_constant, keycodes } from "../constants/keyboard";
import { calcStats, checkFinished } from "../redux/slices/stats";
import { backspaceAction, presskeyAction } from "../redux/slices/typing";
import { AppDispatch, RootState } from "../redux/store";

type Props = {
	keys: React.RefObject<(HTMLDivElement | null)[]>;
};

const useTypingKeyAction = (props: Props) => {
	const dispatch = useDispatch<AppDispatch>();
	const ended = useSelector((state: RootState) => state.stats.ended);
	const timeoutRefs = useRef<Map<number, NodeJS.Timeout>>(new Map());

	useEffect(() => {
		const handleKeyUp = (e: KeyboardEvent) => {
			e.preventDefault();

			if (ended > 0) return;

			if (e.key === "Backspace") {
				return dispatch(backspaceAction());
			}

			const check = keycodes.find((item: number) => item === e.keyCode);
			if (!check) return;

			const key = props.keys.current.find((key) => key?.id.split("-")[1] == `${e.keyCode}`);
			if (!key) return;

			if (timeoutRefs.current.has(e.keyCode)) {
				clearTimeout(timeoutRefs.current.get(e.keyCode));
			}

			key.classList.remove("bg-foreground/10");
			key.classList.add("press_key", "bg-orange-400");

			const value = keyboard_constant.flat().find((item) => item.keycode == e.keyCode);
			let typed = e.shiftKey ? value?.shift : value?.key;
			dispatch(presskeyAction({ keycode: e.keyCode, typed: typed as string })).then(() => {
				dispatch(checkFinished()).then((result) => {
					// Chỉ tính toán thống kê khi game vừa kết thúc
					if (result.payload === true) {
						dispatch(calcStats());
					}
				});
			});

			const timeout = setTimeout(() => {
				key?.classList.add("bg-foreground/10");
				key?.classList.remove("press_key", "bg-orange-400");
				timeoutRefs.current.delete(e.keyCode);
			}, 50);

			timeoutRefs.current.set(e.keyCode, timeout);
		};

		document.addEventListener("keyup", handleKeyUp);
		return () => {
			document.removeEventListener("keyup", handleKeyUp);
		};
	}, [ended]);

	return "";
};

export default useTypingKeyAction;
