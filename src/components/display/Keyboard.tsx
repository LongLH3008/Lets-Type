"use client";

import { keyboard_constant, keycodes } from "@/common/constants/keyboard";
import { typing } from "@/common/redux/slices/dataTyping";
import { AppDispatch, RootState } from "@/common/redux/store";
import { IKey, KeyRow } from "@/common/types/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Key from "./Key";

const Keyboard = () => {
	const { keyboard } = useSelector((state: RootState) => state.control);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const handleKeyUp = (e: KeyboardEvent) => {
			const check = keycodes.find((item: number) => item === e.keyCode);
			if (check) {
				const value = keyboard_constant.flat().find((item) => item.keycode == e.keyCode);
				let typed = e.shiftKey ? value?.shift : value?.key;
				dispatch(typing(typed as string));
			}
		};

		window.addEventListener("keyup", handleKeyUp);

		// Cleanup event listener khi component unmount
		return () => {
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	return (
		<>
			{keyboard && (
				<section className={`row-span-2 grid grid-rows-${keyboard_constant.length} gap-2`}>
					{keyboard_constant.map((keyrow: KeyRow, index: number) => (
						<div key={index} className={`flex justify-center items-center gap-2`}>
							{keyrow.map((key: IKey, ind: number) => (
								<Key keyData={key} index={ind} key={ind} />
							))}
						</div>
					))}
				</section>
			)}
		</>
	);
};

export default Keyboard;
