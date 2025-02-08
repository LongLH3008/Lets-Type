import { checkIndexFinger, checkNormalKey, checkSpaceKey } from "@/common/functions/keyboard";
import { RootState } from "@/common/redux/store";
import { IKey } from "@/common/types/types";
import { motion } from "motion/react";
import { useSelector } from "react-redux";

const Key = ({ keyData, keyboard, index }: { keyData: IKey; keyboard: boolean; index: number }) => {
	const pressedKey = useSelector((state: RootState) => state.dataTyping.pressedKey);

	const initital = {
		opacity: 0,
		translateZ: -200,
		translateY: 200,
		scale: 2,
		rotate: checkSpaceKey(keyData) ? 0 : -50,
	};

	const animate = { opacity: 1, translateZ: 0, translateY: 0, scale: 1, rotate: 0 };

	return (
		<motion.div
			initial={keyboard ? initital : animate}
			animate={!keyboard ? initital : animate}
			transition={{ duration: 0.05 * index, ease: "linear" }}
			style={{ perspective: 200 }}
			data-index={index}
			className={`rounded-md text-sm border relative flex justify-center items-center size-[38px] overflow-hidden
			${checkSpaceKey(keyData) ? "w-[300px]" : "w-[38px]"} ${pressedKey == keyData.keycode ? "press_key" : ""}`}
		>
			<div></div>
			{!checkNormalKey(keyData) && (
				<span className="absolute top-[1px] left-1 text-[10px] opacity-75">{keyData.shift}</span>
			)}
			{checkIndexFinger(keyData) && (
				<span className="absolute left-1/2 -translate-x-1/2 bottom-1 border-b h-1 w-1/3"></span>
			)}
			{checkNormalKey(keyData) ? keyData.shift : keyData.key}
			{checkSpaceKey(keyData) && <span className="h-1 border-b w-1/3 translate-y-2"></span>}
		</motion.div>
	);
};

export default Key;
