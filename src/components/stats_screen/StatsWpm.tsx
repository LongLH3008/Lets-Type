import { RootState } from "@/common/redux/store";
import { useSelector } from "react-redux";

const StatsWpm = () => {
	const wpm = useSelector((state: RootState) => state.stats.wpm);

	return (
		<div className="relative font-[700] text-5xl text-orange-400 flex flex-col items-start gap-0">
			<span className="text-base font-bold uppercase">wpm</span>
			<span className="">{wpm}</span>
			<span className="text-base font-bold tracking-tight">words / min</span>
		</div>
	);
};

export default StatsWpm;
