import { calcWpm } from "@/common/redux/slices/stats";
import { AppDispatch, RootState } from "@/common/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const WPMCalculator = () => {
	const dispatch = useDispatch<AppDispatch>();
	const wpmRecords = useSelector((state: RootState) => state.stats.wpmRecords);
	const ended = useSelector((state: RootState) => state.stats.ended);
	let intervalWPM: NodeJS.Timeout | string | number | undefined = undefined;

	useEffect(() => {
		if (ended > 0) {
			if (intervalWPM !== undefined) clearInterval(intervalWPM);
			return;
		}

		intervalWPM = setInterval(() => {
			dispatch(calcWpm());
		}, 1000);

		return () => {
			clearInterval(intervalWPM);
		};
	}, [ended]);

	return (
		<div className="relative text-orange-400 flex items-center">
			<span className="-top-2 absolute left-0 text-sm font-bold">WPM</span>
			{wpmRecords[wpmRecords.length - 1]?.wpm ?? "0.00"}
		</div>
	);
};

export default WPMCalculator;
