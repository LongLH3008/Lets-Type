import { checkIndexFinger, checkNormalKey, checkSpaceKey } from "@/common/functions/typing__keyboard";
import { IKey } from "@/common/types/keyboard__types";
import { motion } from "motion/react";
import { forwardRef } from "react";

const Key = forwardRef<HTMLDivElement, { keyData: IKey; keyboard: boolean; index: number }>(
	({ keyData, keyboard, index }, ref) => {
		const initital = {
			opacity: 0,
			translateZ: -200,
			translateY: 200,
			scale: 2,
			rotate: checkSpaceKey(keyData) ? 0 : -50,
		};

		const animate = {
			opacity: 1,
			translateZ: 0,
			translateY: 0,
			scale: 1,
			rotate: 0,
			transition: { duration: 0.05 * index, ease: "linear" },
		};

		return (
			<motion.div
				ref={ref} // Truyền ref vào đây
				initial={keyboard ? initital : animate}
				animate={!keyboard ? initital : animate}
				style={{ perspective: 200 }}
				id={`keycode-${keyData.keycode}`}
				className={`bg-foreground/10 rounded-md border-0 *:border-0 text-sm text-foreground/50 relative flex justify-center items-center size-9
        ${checkSpaceKey(keyData) ? "w-[300px]" : "w-9"}`}
			>
				{!checkNormalKey(keyData) && (
					<span className="absolute top-[1px] left-1 text-[10px] opacity-75">{keyData.shift}</span>
				)}
				{checkIndexFinger(keyData) && (
					<span className="absolute left-1/2 -translate-x-1/2 bottom-1 border-b h-1 w-1/3"></span>
				)}
				{checkNormalKey(keyData) ? keyData.shift : keyData.key}
				{checkSpaceKey(keyData) && <span className={`h-1 border-b-2 w-1/3 translate-y-2`}></span>}
			</motion.div>
		);
	}
);

export default Key;
