import { saveResult } from "@/common/redux/slices/stats";
import { AppDispatch, RootState } from "@/common/redux/store";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatsAccuracy from "./StatsAccuracy";
import StatsControl from "./StatsControl";
import StatsDuration from "./StatsDuration";
import StatsTyped from "./StatsTyped";
import StatsWordsHistory from "./StatsWordsHistory";
import StatsWpm from "./StatsWpm";
import { StatsWpmChart } from "./StatsWpmChart";

const StatsScreen = () => {
	const dispatch = useDispatch<AppDispatch>();
	const session = useSelector((state: RootState) => state.auth.session);

	useEffect(() => {
		dispatch(saveResult());
	}, [session]);

	return (
		<motion.div
			style={{ perspective: 200 }}
			initial={{ opacity: 0, translateZ: 200 }}
			animate={{ opacity: 1, translateZ: 0 }}
			transition={{ duration: 0.6, ease: "easeIn" }}
			className="w-[1024px] h-screen flex flex-col justify-evenly"
		>
			<section className="flex flex-col gap-3">
				<StatsControl />
				<StatsWpmChart />
			</section>
			<section className="grid grid-cols-10 gap-8 items-start justify-between rounded-md text-foreground/50">
				<div className="flex flex-col gap-10 col-span-5">
					<div className="grid grid-cols-3 font-[800]">
						<StatsWpm />
						<StatsAccuracy />
						<StatsDuration />
					</div>
					<StatsTyped />
				</div>
				<StatsWordsHistory />
			</section>
		</motion.div>
	);
};

export default StatsScreen;
