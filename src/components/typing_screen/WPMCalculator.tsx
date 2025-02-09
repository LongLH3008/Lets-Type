import { calcWpm } from "@/common/redux/slices/stats";
import { AppDispatch, RootState } from "@/common/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const WPMCalculator = () => {
	const dispatch = useDispatch<AppDispatch>();
	const wpm = useSelector((state: RootState) => state.stats.wpm);

	useEffect(() => {
		const intervalWPM = setInterval(() => {
			dispatch(calcWpm());
		}, 1000);

		return () => {
			clearInterval(intervalWPM);
		};
	}, []);

	return (
		<div className="relative text-orange-400 flex items-center">
			<span className="-top-2 absolute left-0 text-sm font-bold">WPM</span>
			{wpm}
		</div>
	);
};

export default WPMCalculator;
