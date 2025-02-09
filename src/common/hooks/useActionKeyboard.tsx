import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keyboard_constant, keycodes } from "../constants/keyboard";
import { checkFinished } from "../redux/slices/stats";
import { backspaceAction, presskeyAction, resetPressKey } from "../redux/slices/typing";
import { AppDispatch, RootState } from "../redux/store";

const useActionKeyboard = () => {
	const dispatch = useDispatch<AppDispatch>();
	let timeout: NodeJS.Timeout | null = null;
	const ended = useSelector((state: RootState) => state.stats.ended);

	useEffect(() => {
		const handleKeyUp = (e: KeyboardEvent) => {
			if (timeout) clearTimeout(timeout);
			e.preventDefault();

			if (ended > 0) return;

			if (e.key === "Backspace") {
				return dispatch(backspaceAction());
			}

			const check = keycodes.find((item: number) => item === e.keyCode);
			if (check) {
				const value = keyboard_constant.flat().find((item) => item.keycode == e.keyCode);
				let typed = e.shiftKey ? value?.shift : value?.key;
				dispatch(presskeyAction({ keycode: e.keyCode, typed: typed as string }));
				dispatch(checkFinished());
			}

			timeout = setTimeout(() => {
				dispatch(resetPressKey());
			}, 50);
		};

		document.addEventListener("keyup", handleKeyUp);
		return () => {
			document.removeEventListener("keyup", handleKeyUp);
		};
	}, [ended]);

	return "";
};

export default useActionKeyboard;
