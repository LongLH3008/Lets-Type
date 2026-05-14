import { motion } from "motion/react";
import Counter from "./Counter";
import Keyboard from "./Keyboard";
import WordDisplay from "./WordDisplay";

const TypingScreen = () => {
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
