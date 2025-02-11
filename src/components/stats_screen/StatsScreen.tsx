import { motion } from "motion/react";
import StatsAccuracy from "./StatsAccuracy";
import StatsDuration from "./StatsDuration";
import StatsTyped from "./StatsTyped";
import StatsWpm from "./StatsWpm";

const StatsScreen = () => {
	return (
		<motion.div
			style={{ perspective: 200 }}
			initial={{ opacity: 0, translateZ: 200 }}
			animate={{ opacity: 1, translateZ: 0 }}
			transition={{ duration: 0.6, ease: "easeIn" }}
			className="w-[1024px] h-screen grid grid-cols-5 items-start justify-between rounded-md text-foreground/50"
		>
			<StatsWpm />
			<StatsAccuracy />
			<StatsDuration />
			<StatsTyped />
		</motion.div>
	);
};

export default StatsScreen;
