import { checkIndexFinger, checkNormalKey, checkSpaceKey } from "@/common/functions/keyboard";
import { IKey } from "@/common/types/types";
import { motion } from "motion/react";

const Key = ({ keyData, index }: { keyData: IKey; index: number }) => {
	const initital = {
		opacity: 0,
		translateZ: -100,
		translateY: 200,
		scale: 2,
		rotate: checkSpaceKey(keyData) ? 0 : -50,
	};

	const animate = { opacity: 1, translateZ: 0, translateY: 0, scale: 1, rotate: 0 };
	const transition = { duration: 0.05 * index, ease: "easeOut" };

	const whileTap = {
		scale: 1.1,
		translateY: -5,
		translateZ: 10,
		borderWidth: 2,
		transition: { duration: 0.2 },
	};

	return (
		<motion.div
			style={{ perspective: 200 }}
			whileTap={whileTap}
			initial={initital}
			animate={animate}
			transition={transition}
			className={`rounded-md text-sm border relative flex justify-center items-center size-[38px] overflow-hidden
			${checkSpaceKey(keyData) && "w-[300px]"}`}
		>
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
