import { keyboard_constant } from "@/common/constants/keyboard";
import useTypingKeyAction from "@/common/hooks/useTypingKeyAction";
import { RootState } from "@/common/redux/store";
import { IKey, KeyRow } from "@/common/types/keyboard__types";
import { useRef } from "react";
import { useSelector } from "react-redux";
import Key from "./Key";

const Keyboard = () => {
	const keyboard = useSelector((state: RootState) => state.control.keyboard);
	const refsKey = useRef<(HTMLDivElement | null)[]>([]);

	const setKeyRef = (rowIndex: number, keyIndex: number) => (el: HTMLDivElement | null) => {
		const totalPreviousKeys = keyboard_constant.reduce(
			(init: number, row, index) => (index < rowIndex ? init + row.length : init),
			0
		);
		const index = keyIndex + totalPreviousKeys;
		refsKey.current[index] = el;
	};

	useTypingKeyAction({ keys: refsKey });

	return (
		<section
			className={`${keyboard ? "h-[40%]" : "h-[20%] opacity-0"} mt-8 duration-300 flex flex-col gap-[6px]`}
		>
			{keyboard_constant.map((keyrow: KeyRow, rowIndex: number) => (
				<div key={rowIndex} className={`flex justify-center items-center gap-x-[6px]`}>
					{keyrow.map((key: IKey, keyIndex: number) => (
						<Key
							ref={setKeyRef(rowIndex, keyIndex)}
							keyboard={keyboard}
							keyData={key}
							index={keyIndex}
							key={keyIndex}
						/>
					))}
				</div>
			))}
		</section>
	);
};

export default Keyboard;
