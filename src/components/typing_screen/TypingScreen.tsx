import { generateDataTyping } from "@/common/redux/slices/typing";
import { AppDispatch } from "@/common/redux/store";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Counter from "./Counter";
import Keyboard from "./Keyboard";
import WordDisplay from "./WordDisplay";

const TypingScreen = () => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		dispatch(generateDataTyping());
	}, []);

	return (
		<motion.div
			style={{ perspective: 200 }}
			initial={{ opacity: 0, translateZ: -200 }}
			animate={{ opacity: 1, translateZ: 0 }}
			transition={{ duration: 0.5, ease: "easeIn" }}
			className={`max-lg:hidden h-full w-[1024px] flex flex-col justify-center`}
		>
			<Counter />
			<WordDisplay />
			<Keyboard />
		</motion.div>
	);
};

export default TypingScreen;
