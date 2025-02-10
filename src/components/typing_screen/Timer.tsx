import { formatTimer } from "@/common/functions/control";
import { calcStats, finish } from "@/common/redux/slices/stats";
import { AppDispatch, RootState } from "@/common/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Timer = () => {
	const timer = useSelector((state: RootState) => state.control.timer);
	const started = useSelector((state: RootState) => state.stats.started);
	const [time, setTime] = useState<number>(timer);

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		setTime(timer);
	}, [timer, started]);

	useEffect(() => {
		if (started == 0) return;
		const intervalTime = setInterval(() => {
			setTime((prevTime) => {
				if (prevTime <= 1) {
					dispatch(finish()).then(() => dispatch(calcStats()));
					clearInterval(intervalTime);
					return 0;
				}
				return prevTime - 1;
			});
		}, 1000);

		return () => clearInterval(intervalTime);
	}, [started]);

	return (
		<div className="justify-center tracking-tight relative">
			<span className="-top-2 absolute left-0 tracking-normal text-sm font-bold">TIME</span>
			{formatTimer(time)}
		</div>
	);
};

export default Timer;
