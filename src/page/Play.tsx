"use client";

import { RootState } from "@/common/redux/store";
import StatsScreen from "@/components/stats_screen/StatsScreen";
import TypingScreen from "@/components/typing_screen/TypingScreen";
import { useSelector } from "react-redux";

const Play = () => {
	const ended = useSelector((state: RootState) => state.stats.ended);

	return <>{ended > 0 ? <StatsScreen /> : <TypingScreen />}</>;
	// return <>{<StatsScreen />}</>;
};

export default Play;
