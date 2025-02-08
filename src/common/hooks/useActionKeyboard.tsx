import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { keyboard_constant, keycodes } from "../constants/keyboard";
import { backspaceAction, resetPressKey, typing } from "../redux/slices/dataTyping";
import { AppDispatch } from "../redux/store";

const useActionKeyboard = () => {
	const dispatch = useDispatch<AppDispatch>();
	let timeout: NodeJS.Timeout | null = null;

	useEffect(() => {
		const handleKeyUp = (e: KeyboardEvent) => {
			e.preventDefault();

			if (e.key === "Backspace") {
				return dispatch(backspaceAction());
			}

			const check = keycodes.find((item: number) => item === e.keyCode);
			if (check) {
				const value = keyboard_constant.flat().find((item) => item.keycode == e.keyCode);
				let typed = e.shiftKey ? value?.shift : value?.key;
				dispatch(typing({ keycode: e.keyCode, typed: typed as string }));
			}

			if (timeout) clearTimeout(timeout);

			timeout = setTimeout(() => {
				dispatch(resetPressKey());
			}, 300);
		};

		document.addEventListener("keyup", handleKeyUp);
		return () => {
			document.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	return "";
};

export default useActionKeyboard;
